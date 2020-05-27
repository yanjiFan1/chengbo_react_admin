import React, {Component} from 'react'
import {Button} from 'antd';
import Exception from 'ant-design-pro/lib/Exception';
import './index.less'

export default class E403 extends Component {
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
            actions={actions}/>)
    }
}
