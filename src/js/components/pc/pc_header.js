import React from 'react'
import { Row, Col } from 'antd'
import { Menu, Icon, Tabs, Form, Input, Button, Modal, message } from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
class PCHeader extends React.Component{
    constructor () {
        super()
        this.state = {
            current: 'top',
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
    menuClick (e) {
        if (e.key === 'register') {
            this.setState({current: 'register'})
            this.setModalVisible(true)
        } else {
            this.setState({current: e.key})
        }
    }
    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                this.setState({userNickName: values.r_userName})
                localStorage.userid = '1'
                localStorage.userNickName = values.r_userName
            }
        })
        if (this.state.action == 'login') {
            this.setState({hasLogined: true})
        }
        this.setModalVisible(false)
        message.success('请求成功')
    }
    tabChange (key) {
        if (key == 1) {
            this.setState({action: 'login'})
        } else if (key == 2) {
            this.setState({action: 'register'})
        }
    }
    logout () {
        localStorage.userid = ''
        localStorage.userNickName = ''
        this.setState({hasLogined: false})
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
            <Menu.Item key="logout" class="register">
                <Button type="primary" htmlType='button'>{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Button type='dashed' htmlType='button'>个人中心</Button>
                &nbsp;&nbsp;
                <Button type='ghost' htmlType='button' onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" class="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="./src/images/newspaper.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" onClick={this.menuClick.bind(this)} selectedKeys={[this.state.current]}>
                            <Menu.Item key="top">
                                <Icon type="appstore" />头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore" />社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore" />国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore" />国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore" />娱乐
                            </Menu.Item>
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
                                                {getFieldDecorator('r_userName',{})(
                                                    <Input placeholder="请输入您的账户"/>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="密码">
                                                {getFieldDecorator('r_password',{})(
                                                    <Input type="password" placeholder="请输入您的密码"/>
                                                )}
                                            </FormItem>
                                            <Button type="primary" htmlType="submit">登陆</Button>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="2">
                                        <Form onSubmit={this.handleSubmit.bind(this)}>
                                            <FormItem {...formItemLayout} label="账户">
                                                {getFieldDecorator('r_userName',{})(
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
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}
export default PCHeader = Form.create()(PCHeader)