import React from 'react'
import { Icon, Tabs, Form, Input, Button, Modal, message } from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
class MobileHeader extends React.Component{
    constructor () {
        super()
        this.state = {
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        }
    }
    // 生命周期之加载前
    componentWillMount () {
        if (localStorage.userid) {
            this.setState({hasLogined: true})
            this.setState({userNickName: localStorage.userNickName, userid: localStorage.userid})
        }
    }
    setModalVisible (value) {
        this.setState({modalVisible: value})
    }
    // 登陆或注册提交
    handleSubmit (e) {
        e.preventDefault()
        var myFetchOptions = {
            method: 'GET'
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
                    + "&username="+values.username+"&password="+values.password
                    +"&r_userName=" + values.r_username + "&r_password=" + values.r_password + "&r_confirmPassword=" + values.r_confirmPassword, myFetchOptions)
                    .then(response => response.json())
                    .then(json => {
                        this.setState({userNickName: json.NickUserName, userid: json.UserId});
                        localStorage.userid= json.UserId;
                        localStorage.userNickName = json.NickUserName;
                    })
            }
        })
        if (this.state.action == 'login') {
            this.setState({hasLogined: true})
        }
        this.setModalVisible(false)
        message.success('请求成功')
    }
    // 登陆-展示登陆窗口
    loginHandle () {
        this.setModalVisible(true)
    }
    tabChange (key) {
        if (key == 1) {
            this.setState({action: 'login'})
        } else if (key == 2) {
            this.setState({action: 'register'})
        }
    }
    render () {
        let {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        }
        const userShow = this.state.hasLogined ?
            <Icon type="inbox"/>
            :
            <Icon type='setting' onClick={this.loginHandle.bind(this)}/>
        return (
            <div id="mobileheader">
                <header>
                    <img src="./src/images/newspaper.png" alt="logo"/>
                    <span>ReactNews</span>
                    {userShow}
                    <Modal
                        title="用户中心"
                        visible={this.state.modalVisible}
                        onOk={() => {this.setModalVisible(false)}}
                        onCancel={() => {this.setModalVisible(false)}}>
                        <Tabs onChange={this.tabChange.bind(this)}>
                            <TabPane tab="登陆" key="1">
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem {...formItemLayout} label="账户">
                                        {getFieldDecorator('username',{})(
                                            <Input placeholder="请输入您的账户"/>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="密码">
                                        {getFieldDecorator('password',{})(
                                            <Input type="password" placeholder="请输入您的密码"/>
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">登陆</Button>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="2">
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem {...formItemLayout} label="账户">
                                        {getFieldDecorator('r_username',{})(
                                            <Input placeholder="请输入您的账户"/>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="密码">
                                        {getFieldDecorator('r_password',{})(
                                            <Input type="password" placeholder="请输入您的密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="确认密码">
                                        {getFieldDecorator('r_confirmPassword',{})(
                                            <Input type="password" placeholder="请再次输入您的账号"/>
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">注册</Button>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>
                </header>
            </div>
        )
    }
}
export default MobileHeader = Form.create()(MobileHeader)