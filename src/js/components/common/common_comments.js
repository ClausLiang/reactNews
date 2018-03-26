import React from 'react'
import {Form, Button, Input, Card, notification} from 'antd'
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
                fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=' + localStorage.userid + '&uniquekey='
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
    addUserCollection () {
        var myFetchOption = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=' + localStorage.userid + '&uniquekey='
            + this.props.uniquekey,myFetchOption)
            .then(response => {
                response.json()
            })
            .then(json => {
                notification['success']({message: 'reactNews提醒', description: '收藏此文章成功'})
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
                    <Button type='primary' htmlType='submit'>提交评论</Button>&nbsp;&nbsp;
                    <Button type='primary' htmlType='button' onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                </Form>
            </div>
        )
    }
}
export default CommonComments = Form.create()(CommonComments)