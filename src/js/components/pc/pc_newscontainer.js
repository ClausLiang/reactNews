import React from 'react'
import {Row, Col} from 'antd'

export default class PCNewsContainer extends React.Component{
    render () {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='container'>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}