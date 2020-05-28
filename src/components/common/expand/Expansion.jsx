/**
 * 列表展开、收缩开关
 * @author yanji
 * date: 2019/10/17
 * !!1. onChange: 展开、收缩触发父组件方法，返回布尔值，1 为展开，0 为收起；
 * !!2. value: 用于设置当前选中的值
*/

/*
*示例：
*<Expansion onChange={(expanded) => 父组件方法} />
*/
import React, { Component } from 'react';
import './Expansion.less';
import { Tooltip, Icon } from 'antd';

export default class Expansion extends Component {
	constructor(props){
		super(props)
		this.state = {
			checked: props.value ? 1 : 0, // 默认收起状态
		}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.value !== nextProps.value){
			this.setState({ checked: nextProps.value });
		}
	}

	onClick = () => {
		this.setState({ checked: !this.state.checked });
        this.props.onChange(!this.state.checked);
	}

	render() {
		const { checked } = this.state;
		return (
			<Tooltip title={checked ? "列表" : "详情"}>
				<Icon
					className="u-expansion"
					type={checked ? "bars" : "appstore"}
					onClick={this.onClick}
				/>
			</Tooltip>

		)
	}
}

