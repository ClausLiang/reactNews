import React from 'react'
import {Row, Col, Tabs, Upload, Icon, Modal,Card} from 'antd'
const TabPane = Tabs.TabPane
import PCHeader from './pc_header'
import PCFooter from './pc_footer'
export default class PCUserCenter extends React.Component{
    constructor () {
        super()
        this.state = {
            usercollection: '',
            usercomments: '',
            previewImage: '',
            previewVisible: false,
            fileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                }
            ],
        }
    }
    componentDidMount () {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    usercollection: json
                })
            })
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    usercomments: json
                })
            })
    }
    handlePreview(file){
        this.setState({
            previewImage: file.url,
            previewVisible: true
        })
    }
    handleChange(fileList){
        this.setState({
            fileList: fileList
        })
    }
    handleCancel(){
        this.setState({
            previewVisible: false
        })
    }
    render () {
        const {usercollection, usercomments} = this.state
        const usercollectionList = usercollection.length ?
            usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey} extra={<a href={`/#/detail/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有收藏任何新闻'
        const usercommentsList = usercomments.length ?
            usercomments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a href={`/#/detail/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表任何评论'
        return (
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab='我的收藏列表' key='1'>
                                <div className=''>
                                    {usercollectionList}
                                </div>
                            </TabPane>
                            <TabPane tab='我的评论列表' key='2'>
                                {usercommentsList}
                            </TabPane>
                            <TabPane tab='头像设置' key='3'>
                                <Upload action='//jsonplaceholder.typicode.com/posts/'
                                        listType='picture-card'
                                        fileList={this.state.fileList}
                                        onPreview={this.handlePreview.bind(this)}
                                        onChange={this.handleChange.bind(this)}>
                                    <Icon type='plus'/>
                                    <div className='ant-upload-text'>上传照片</div>
                                </Upload>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                    <img src={this.state.previewImage} alt="" style={{ width: '100%' }}/>
                                </Modal>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter></PCFooter>
            </div>
        )
    }
}