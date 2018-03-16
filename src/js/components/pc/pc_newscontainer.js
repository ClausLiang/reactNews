import React from 'react'
import {Row, Col} from 'antd'
import {Tabs, Carousel} from 'antd'
const TabPane = Tabs.TabPane
import PCNewsBlock from './pc_child/pc_news_block'
import PCNewsImageBlock from './pc_child/pc_news_image_block'

export default class PCNewsContainer extends React.Component{
    render () {
        const carouselSetting = {
            dots: true,
            autoplay: true
        }
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='container'>
                        <div className='leftContainer'>
                            <div class="carousel">
                                <Carousel {...carouselSetting}>
                                    <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type='guoji' width='400px' cardTitle='国际头条' imageWidth='112px'/>
                        </div>
                        <div className="tabs_news">
                            <Tabs>
                                <TabPane tab='头条新闻' key='1'>
                                    <PCNewsBlock count={22} type='top'/>
                                </TabPane>
                                <TabPane tab='国际新闻' key='2'>
                                    <PCNewsBlock count={22} type='guoji'/>
                                </TabPane>
                            </Tabs>
                        </div>
                        <div className='clearfix'>
                            <PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
                            <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}