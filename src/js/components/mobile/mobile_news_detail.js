import React from 'react'
import {BackTop} from 'antd'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import CommonComments from '../common/common_comments'
export default class MobileNewsDetail extends React.Component{
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
                <MobileHeader></MobileHeader>
                <div className='mobile-detail-container'>
                    <div className='article-container' dangerouslySetInnerHTML={this.createMarkup()}></div>
                    <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                </div>
                <MobileFooter></MobileFooter>
                <BackTop/>
            </div>
        )
    }
}