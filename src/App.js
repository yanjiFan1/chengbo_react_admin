import React, { Component } from 'react';
import { Layout, ConfigProvider, BackTop } from 'antd';
import '@/style/index.less';
import SiderCustom from '@/components/SiderCustom';
import HeaderCustom from '@/components/HeaderCustom';
import { receiveData } from '@/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from '@/routes';

// 全局组件“中文”配置
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Content, Footer } = Layout;

class App extends Component {
    render() {
		const { user } = this.props;
        return (
            <Layout>
                <HeaderCustom />
                <Layout>
                    <SiderCustom />
					<BackTop target={() => this.contentDom || window} />
                    <Layout style={{flexDirection: 'column'}} ref={(dom) => this.contentDom = dom}>
						{
                            // user.roleId &&
							<Content style={{ overflow: 'initial', minHeight: 'auto' }}>
								<ConfigProvider locale={zhCN}>
									<Routes {...this.props} />
								</ConfigProvider>
							</Content>
						}
                        <Footer style={{ textAlign: 'center' }}>
                        © 1997-{new Date().getFullYear()} fivezerofive后台管理系统
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const { user = {}, } = state;
    return { user};
};

const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
