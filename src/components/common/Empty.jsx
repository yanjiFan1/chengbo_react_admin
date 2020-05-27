import React, { Component } from 'react'
import '../../style/empty.less'

export default class Empty extends Component {

    render(){
        const {title = "暂无数据", tip ,icon, height = "45vh",action} = this.props
        return (
           <div className="g-empty center" style={{height}}>
               <div className="text-content">
                    <div className="f-tac"><i className={`icon iconfont ${icon ? icon : 'icon-zanwujilu'}`} /></div>
                    <div className="title text-18 f-fwb">{title}</div>
                    <div className="tip text-12">{tip}</div>
                    <div className="f-tac action"> {action}</div>
               </div>
           </div>
        )
    }
}
