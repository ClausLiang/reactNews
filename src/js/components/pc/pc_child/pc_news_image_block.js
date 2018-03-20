import React from 'react'
import {Card} from 'antd'
import {Link} from 'react-router-dom'

export default class PCNewsImageBlock extends React.Component{
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
        const styleImage = {
            display: 'block',
            width: this.props.imageWidth,
            height: '90px'
        }
        const styleH3 = {
            width: this.props.imageWidth,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
        const newsList = news.length ? news.map((newItem, index) => (
            <div key={index} className='imageblock'>
                <Link to={`detail/${newItem.uniquekey}`} target="_blank">
                    <div className='custom-image'>
                        <img src={newItem.thumbnail_pic_s} alt="" style={styleImage}/>
                    </div>
                    <div className='custom-card'>
                        <h3 style={styleH3}>{newItem.title}</h3>
                        <p>{newItem.author_name}</p>
                    </div>
                </Link>
            </div>
        ))  : '没有加载到任何新闻'
        return (
            <div className='topNewsList'>
                <Card title={this.props.cardTitle} style={{witdh: this.props.width}}>
                    {newsList}
                </Card>
            </div>
        )
    }
}