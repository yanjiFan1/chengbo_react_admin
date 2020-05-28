/*
*author: yanji 2019-10-17
*参数：
*showIcon: boolean, 是否展示全屏icon，默认为true
*isFullScreen: boolean, 父组件控制“全屏”或“取消全屏”操作
*loading: boolean, 全屏模块的加载动画
*className: string, 类名
*icon：string/reactDom, 全屏展开收缩的图标
*hasFullElement：function, (boolean) => ···· 可以通过这个方法在父组件里处理“全屏”或“取消全屏”后的事件
*/

import React, { Component } from 'react';
import { Icon, Spin } from 'antd';
import { launchFullscreen, exitFullscreen, hasFullElement as hasFullEle } from '../../utils/index';

export default class FullScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFullScreen: props.isFullScreen || false,// 是否全屏展示简历信息
        }
    }

    componentDidMount() {
        const { hasFullElement } = this.props;
       
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isFullScreen !== undefined && this.state.isFullScreen !== nextProps.isFullScreen){
            this.fullScreen(this.state.isFullScreen);
        }
    }

    // 全屏、取消全屏
    fullScreen = (isFullScreen) => {
        const { hasFullElement } = this.props;
        const targetElement = this.refs.resume;
        isFullScreen ? exitFullscreen() : launchFullscreen(targetElement);
        hasFullElement && hasFullElement(!isFullScreen); // 钩子函数
        this.setState({isFullScreen: !isFullScreen});
    }

    render(){
        const { isFullScreen } = this.state;
        const { loading, children, className, icon, showIcon = true } = this.props;
        return (
            <Spin spinning={loading} delay={500}>
                <div className={`u-fullScreen ${isFullScreen ? 'u-fullScreen-full' : 'u-fullScreen-less'} ${className || ''}`} ref='resume'>
                    {showIcon ?
                    <div className="icon-expansion" onClick={()=>this.fullScreen(isFullScreen)}>
                        { icon ? icon : <Icon type={`${isFullScreen ? 'shrink' : 'arrows-alt'}`} />}
                    </div> : null}
                    {children}
                </div>
            </Spin>
        )
    }
}
