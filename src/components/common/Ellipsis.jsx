/*
*author yanji 2018/10/7
*当文本溢出，hover文本显示toolTip提示
*可用api:className、style以及antd 中 toolTip组件所支持的所有api
*/

/*
*示例：
*<Ellipsis className="" placement="topCenter" style={{width: "200px"}}>{text}</Ellipsis>
*/

import React, { Component } from 'react';
import { Tooltip } from 'antd';

export default class Ellipsis extends Component {
	state = {
		showTip: false,// 是否显示tip
		maxWidth: 200, // 提示框最小宽度
	}

	componentDidMount() {
		if(this.boxEle.clientWidth < this.boxEle.scrollWidth) {
			this.setState({ showTip: true, maxWidth: this.boxEle.clientWidth });
		}
	}

	render() {
		const { className = '', style, children, ...rest } = this.props;
		return (
			<div className={`${className} f-toe`} style={style} ref={dom => this.boxEle = dom}>
			    {
					this.state.showTip ?
					<Tooltip placement="topLeft" {...rest} title={children} overlayStyle={{maxWidth: this.state.maxWidth}}>
						{children}
					</Tooltip> : children
				}
			</div>
		)
	}
}
