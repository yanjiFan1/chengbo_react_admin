/**
 * Created by yanji on 2019/10/17.
 */
import React from 'react';
import { Button, Layout } from 'antd';
import './login.less';
const { Content, Footer } = Layout;
class Login extends React.Component {

    login = (e) => {
        window.location.href ='/api/ats/login'
    };
    render() {
        return (
            <Layout className="login" >
                <Content className="login-content">
                    <div className="login-form" >
                        <Button type="danger" onClick ={this.login}>登录</Button>
                    </div>
                </Content>
                <Footer className="login-footer">
                © 1997-{new Date().getFullYear()} fivezerofive管理后台
                </Footer>
            </Layout>
        );
    }
}

export default Login;