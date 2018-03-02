import React from 'react'
import { Row, Col } from 'antd'
import { Menu, Icon, Tabs, Form, Input, Button, Modal } from 'antd'
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
    setModalVisible (value) {
        this.setState({modalVisible: value})
    }
    handleClick (e) {
        if (e.key === 'register') {
            this.setState({current: 'register'})
            this.setModalVisible(true)
        } else {
            this.setState({current: e.key})
        }
    }
    handleSubmit (e) {
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
                <Button type="primary" htmlType='button'>{this.state.userNickName}</Button>&nbsp;&nbsp;
                <Link target="_black">
                    <Button type='dashed' htmlType='button'>个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type='ghost' htmlType='button'>退出</Button>
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
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
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
                                <Tabs>
                                    <TabPane tab="注册" key="1">
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
                                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
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