import React from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css'
import { Button } from 'antd'

export default class Root extends React.Component{
    render () {
        return (
            <div>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
            </div>
        )
    }
}
ReactDom.render(<Root/>, document.getElementById('mainContainer'))