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
                console.log(json)
                this.setState({comments: json})
            })
    }
    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=1&uniquekey='
                    + this.props.uniquekey + '&comments=' + values.remark, myFetchOptions)
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
        const {comments} = this.state.comments
        const commentsList = comments.length ?
            comments.map((comment, index) => (
                <Card key={index} title={comment.UserName} extra={<a href='#'>发表于 {comment.dateTime}</a>}>
                    <p>{comment.comments}</p>
                </Card>
            ))
            :
            '没有加载到任何评论'
        return (
            <div className='comment'>
                {commentsList}
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem {...formItemLayout} label="Password">
                        {getFieldDecorator('remark',{})(<TextArea rows={4} placeholder='您的评论'/>)}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                </Form>
            </div>
        )
    }
}
export default CommonComments = Form.create()(CommonComments)