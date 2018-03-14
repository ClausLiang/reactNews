import React from 'react'
import {Row, Col} from 'antd'
import {Tabs, Carousel} from 'antd'
const TabPane = Tabs.TabPane
import PCNewsBlock from './pc_child/pc_news_block'

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
                            <div className='carousel'>
                                <Carousel {...carouselSetting}>
                                    <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                                </Carousel>
                            </div>
                            <Tabs class="tabs_news">
                                <TabPane tab='头条新闻' key='1'>
                                    <PCNewsBlock count={10} type='top' width='100%' bordered='false'/>
                                </TabPane>
                                <TabPane tab='国际新闻' key='2'>
                                    <PCNewsBlock count={10} type='guoji' width='100%' bordered='false'/>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}