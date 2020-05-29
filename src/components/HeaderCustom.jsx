import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
// const { getUserInfo } = actions

class HeaderCustom extends Component {
    state = {
        visible: false,
    };
    componentDidMount() {
        // this.props.getUserInfo();
    }
    
    menuClick = e => {
        e.key === 'logout' && this.logout();
    };
    /**
     * 退出操作
     */
    logout = () => {
        this.props.history.push('/')
        window.location.href ='/api/ats/login/logout'

    };

    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    
    goUpload = () => {
        this.props.history.push("/app/uploading")
    }
    render() {
        const { menusList, userName } = this.props;
        return (
            <Header className="primary">
                <div className="logo">
                    <span className="sys-title">react后台管理系统</span>
                </div>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '50px', float: 'right',position:'relative',marginRight:'6px'}}
                    onClick={this.menuClick}
                >
                    <SubMenu title={<span className="avatar">欢迎您，{userName||'--'}</span>}>
                        <Menu.Item key="logout"><span onClick={this.logout}><Icon type="logout" />退出登录</span></Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.user
    }
};

const mapDispatchToProps = dispatch => ({
    // getUserInfo: bindActionCreators(getUserInfo, dispatch),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderCustom));
