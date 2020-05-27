import React, {Component} from 'react';
import { Button } from 'antd';
import Exception from 'ant-design-pro/lib/Exception';
import Result from 'ant-design-pro/lib/Result';
import './index.less'

export default class EmptyException extends Component {
    loginOut = () => {
        window.location.href = '/api/ats/login/logout'
    }
    render() {
        const actions = (
            <div>
                <Button type="primary" onClick={this.loginOut}>返回</Button>
            </div>
        );
        return (
        <Exception title="数据异常" desc="当前页面数据异常，请确认链接正确！" actions={actions} />
        )
    }
}