import React from 'react'
export default class MobileHeader extends React.Component{
    render () {
        return (
            <div id="mobileheader">
                <header>
                    <img src="./src/images/newspaper.png" alt="logo"/>
                    <span>ReactNews</span>
                </header>
            </div>
        )
    }
}