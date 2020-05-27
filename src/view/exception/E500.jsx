import React, {Component} from 'react'
import { Button } from 'antd';
import Exception from 'ant-design-pro/lib/Exception';
import './index.less'

export default class E500 extends Component {
    loginOut = () => {
        window.location.href = '/api/ats/login/logout'
    }
    render() {
        const actions = (
            <div>
                <Button type="primary" onClick={this.loginOut}>返回</Button>
            </div>
        );
        return (<Exception type="500" desc='系统正在维护中，请稍后访问或联系管理员！' actions={actions}/>)
    }
}
