import React from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css'
import MediaQuery from 'react-responsive'
import PCIndex from './components/pc_index'
import MobileIndex from './components/mobile_index'
import {HashRouter, Switch, Route} from 'react-router-dom'
import PCNewsDetail from './components/pc/pc_child/pc_news_detail'
import MobileNewsDetail from './components/mobile/mobile_news_detail'
import PCUserCenter from './components/pc/pc_usercenter'
import MobileCenter from './components/mobile/mobile_usercenter'

export default class Root extends React.Component{
    render () {
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <HashRouter>
                        <Switch>
                            <Route component={PCIndex} path="/" exact></Route>
                            <Route component={PCNewsDetail} path="/detail/:uniquekey"></Route>
                            <Route component={PCUserCenter} path="/usercenter"></Route>
                        </Switch>
                    </HashRouter>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <HashRouter>
                        <Switch>
                            <Route component={MobileIndex} path="/" exact></Route>
                            <Route component={MobileNewsDetail} path="/detail/:uniquekey"></Route>
                            <Route component={MobileCenter} path="/usercenter"></Route>
                        </Switch>
                    </HashRouter>
                </MediaQuery>
            </div>
        )
    }
}
ReactDom.render(<Root/>, document.getElementById('mainContainer'))