import React from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css'
import PCIndex from './components/pc_index'

export default class Root extends React.Component{
    render () {
        return (
            <div>
                <PCIndex/>
            </div>
        )
    }
}
ReactDom.render(<Root/>, document.getElementById('mainContainer'))