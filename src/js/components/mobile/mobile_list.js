import React from 'react'
import {Row, Col} from 'antd'
import {Link} from 'react-router-dom'

export default class MobileList extends React.Component{
    constructor () {
        super()
        this.state = {
            news: ''
        }
    }
    componentWillMount () {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='
            + this.props.type + '&count=' + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json}))
    }
    render () {
        const {news} = this.state
        const newsList = news.length ? news.map((newItem, index) => (
            <section key={index} className='m_article'>
                <Link to={`detail/${newItem.uniquekey}`}>
                    <div className='m_article_img'>
                        <img src={newItem.thumbnail_pic_s} alt=""/>
                    </div>
                    <div className='m_article_info'>
                        <div className='m_article_title'>
                            <span>{newItem.title}</span>
                        </div>
                        <div className='m_article_desc'>
                            <div className='m_article_desc_l'>
                                <span className='m_article_channel'>{newItem.realtype}</span>
                                <span className='m_article_time'>{newItem.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>
        ))  : '没有加载到任何新闻'
        return (
            <div>
                <Row>
                    <Col span={24}>{newsList}</Col>
                </Row>
            </div>
        )
    }
}