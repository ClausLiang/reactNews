import React from 'react'
import {Form, Button, Input, Card} from 'antd'
const {TextArea} = Input
const FormItem = Form.Item
class CommonComments extends React.Component{
    constructor () {
        super()
        this.state = {
            comments: ''
        }
    }
    componentDidMount () {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey='
            + this.props.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({comments: json})
            })
    }
    handleSubmit (e) {
        e.preventDefault()
        var myFetchOptions = {
            method: 'GET'
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=1&uniquekey='
                    + this.props.uniquekey + '&comment=' + values.remark, myFetchOptions)
                    .then(response => {
                        response.json()
                    })
                    .then(json => {
                        this.componentDidMount()
                    })
            }
        })
    }
    render () {
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            LabelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        }
        const commentsList = this.state.comments.length ?
            this.state.comments.map((comment, index) => (
                <Card key={index} title={comment.UserName} extra={<a href='#'>发表于 {comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '没有加载到任何评论'
        return (
            <div className='comment'>
                {commentsList}
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem {...formItemLayout}>
                        {getFieldDecorator('remark',{})(<TextArea rows={4} placeholder='您的评论'/>)}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                </Form>
            </div>
        )
    }
}
export default CommonComments = Form.create()(CommonComments)