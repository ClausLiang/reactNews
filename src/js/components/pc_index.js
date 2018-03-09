import React from 'react'
import PCHeader from './pc/pc_header'
import PCFooter from './pc/pc_footer'
import PCNewsContainer from './pc/pc_newscontainer'
export default class PCIndex extends React.Component{
    render () {
        return (
            <div>
                <PCHeader/>
                <PCNewsContainer/>
                <PCFooter/>
            </div>
        )
    }
}