import React from 'react'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane
import MobileHeader from './mobile/mobile_header'
import MobileFooter from './mobile/mobile_footer'
export default class MobileIndex extends React.Component{
    render () {
        return (
            <div>
                <MobileHeader/>
                <Tabs>
                    <TabPane tab='头条' key='1'></TabPane>
                    <TabPane tab='社会' key='2'></TabPane>
                    <TabPane tab='国内' key='3'></TabPane>
                    <TabPane tab='国际' key='4'></TabPane>
                    <TabPane tab='娱乐' key='5'></TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        )
    }
}