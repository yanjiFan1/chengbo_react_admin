/**
 * 缩写
 * @author yanji
 * date: 2019/10/17
*/
import React, { Component } from 'react'
import { Popover, Icon } from 'antd';

export default class Abbr extends Component {
    state ={
        placement :'bottom',
        visible: false
    }

    hide = () => {
        this.setState({visible: false});
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    render() {
        const { content, className } = this.props;
        return (
        <div>
            <Popover
                {...this.state}
                content={<div onClick={this.hide}>{content}</div>}
                onVisibleChange={this.handleVisibleChange}
            >
                <Icon type="ellipsis" style={{ fontSize: 18, fontWeight: 700, cursor:'pointer' }} className={className} />
            </Popover>
        </div>
        )
    }
}
