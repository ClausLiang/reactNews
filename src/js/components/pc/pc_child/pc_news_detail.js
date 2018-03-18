import React from 'react'
import {Row, Col} from 'antd'
export default class PCNewsDetail extends React.Component{
    constructor () {
        super()
        this.state = {
            newsItem: ''
        }
    }
    componentDidMount () {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/handler.aspx?action=getnewsitem&unique='
            + this.props.params.uniquekey, myFetchOptions)
            .then(response => response.json)
            .then(json => {
                this.setState({newsItem: json})
                document.title = this.state.newItem.title + ' - React news'
            })
    }
    createMarkup () {
        return {__html: this.state.newsItem.pagecontent}
    }
    render () {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className=''>
                        <div className=article-container dangerouslySetInnerHTML={this.createMarkup()}></div>
                    </Col>
                    <Col span={6}></Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}