import React from 'react'
import {Row, Col, BackTop} from 'antd'
import PCHeader from '../pc_header'
import PCFooter from '../pc_footer'
import PCNewsImageBlock from "./pc_news_image_block";
import CommonComments from '../../common/common_comments'
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
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='
            + this.props.match.params.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json})
                document.title = this.state.newsItem.title + ' - React news'
            })
    }
    createMarkup () {
        return {__html: this.state.newsItem.pagecontent}
    }
    render () {
        return (
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className=''>
                        <div className='article-container' dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={40} type='top' cardTitle="相关新闻" imageWidth='150px'/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter></PCFooter>
                <BackTop/>
            </div>
        )
    }
}