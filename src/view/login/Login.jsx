/**
 * Created by yanji on 2019/10/17.
 */
import React from 'react';
import { Button, Layout, Form, Input, Checkbox, message, Icon } from 'antd';
import './login.less';
const { Content, Footer } = Layout;

class Login extends React.Component {

    login = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            if (values.password === '123456' && values.username === 'admin') {
                this.props.history.push('/index')
            } else {
                message.error('请输入正确的账号和密码')
            }
          }
        });
       
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className="g-login">
                <Content className="g-login-content">
                    <Form
                      name="basic"
                      className="g-login-content-form"
                      initialValues={{ remember: true }}
                      onSubmit={this.login}
                    >
                      <div class="g-login-content-title mb-20">react后台管理系统</div>
                      <Form.Item>
                        {getFieldDecorator('username', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                          />,
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                          <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                          />,
                        )}
                      </Form.Item>

                      <Form.Item>
                        {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <div class="g-login-confirm">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                              登陆
                            </Button>
                        </div>
                      </Form.Item>
                    </Form>
                </Content>
                <Footer className="login-footer">
                © 1997-{new Date().getFullYear()} react后台管理系统
                </Footer>
            </Layout>
        );
    }
}

export default Form.create()(Login);