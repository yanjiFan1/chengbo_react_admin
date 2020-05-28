import React, {Component} from 'react'
import {Button} from 'antd';
import Exception from 'ant-design-pro/lib/Exception';
import './index.less'

export default class E405 extends Component {
    loginOut = () => {
        window.location.href = '/api/ats/login/logout'
    }
    render() {
        const actions = (
            <div>
                <Button type="primary" onClick={this.loginOut}>返回</Button>
            </div>
        );
        return (<Exception
            type="403"
            desc='您目前是小白用户，暂没有访问系统的权限，请赶快去告诉管理员，你想换角色吧，期待您的加入哦~~'
            actions={actions}/>)
    }
}
