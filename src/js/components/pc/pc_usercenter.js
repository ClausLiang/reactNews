import React from 'react'
import {Row, Col, Tabs, Upload, Icon, Modal} from 'antd'
const TabPane = Tabs.TabPane
import PCHeader from './pc_header'
import PCFooter from './pc_footer'
export default class PCUserCenter extends React.Component{
    constructor () {
        super()
        this.state = {
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
        return (
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab='我的收藏列表' key='1'></TabPane>
                            <TabPane tab='我的评论列表' key='2'></TabPane>
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