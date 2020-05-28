
/**
 * Created by yanji by 2019/10/17.
 */

import React, { Component } from 'react';
import { Layout} from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { menus } from '../constants/menus';
import SiderMenu from './SiderMenu';

const { Sider } = Layout;

class SiderCustom extends Component {

    constructor(props){
        super(props);
    }
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: ['/app/candidate'],
        selectedKey: '',
        firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };

    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }
    setMenuOpen = props => {
        const { pathname } = props.location;
        const openKey =pathname.substr(0, pathname.lastIndexOf('/'))
        this.setState(prevState=>({
            openKey:prevState.openKey.includes(openKey)?prevState.openKey:[...prevState.openKey, openKey],
            selectedKey: pathname
        }))
    };
    
    onCollapse = (collapsed) => {
        if(collapsed===undefined) return;
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };

    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        this.setState({
            openKey: v,
            firstHide: false,
        })
    };

    render() {
        const { collapsed } = this.state;
        const { user={} } = this.props;
        return (
            <Sider
                width={168}
                collapsible
                breakpoint="lg"
                collapsed={collapsed}
                onCollapse={this.onCollapse}
                style={{ overflowY: 'auto' }}
            >
                <SiderMenu
                    menus={ user.menusList || menus}
                    onClick={this.menuClick}
                    theme="light"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.openKey}
                    onOpenChange={this.openMenu}
                />
            </Sider>
        )
    }
}

const mapStateToProps = state => {
    return {
        user:state.user
    }
};

export default withRouter(connect(mapStateToProps)(SiderCustom));