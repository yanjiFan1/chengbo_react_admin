import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AllComponents from './components';
import { routes } from './routes';
import Util from '@/utils/index';
const { Index } = AllComponents
class CRouter extends Component {
    requireAuth = (Com, path) => {
        // const { user, location } = this.props;
        // const { menusList= [] } = user
        // if(menusList.length === 0) {
        //   return <Redirect to="/404" />  // 如果没有菜单 跳转到 404 页面
        // }
        // let authMenu = Util.getAuthMenu(menusList, path || location.pathname) // 如果没有权限跳转到 403 页面
        // if(authMenu.length === 0) {
        //    return <Redirect to="/403" />
        // }
        return <Com {...this.props} />;
    };
    render() {
        return (
            <Switch>
                {
                    routes.map(r => {
                        const route = r => {
                            const Component = AllComponents[r.component];
                            return (
                                <Route
                                    key={r.link || r.key}
                                    exact
                                    path={r.link || r.key}
                                    render={() => this.requireAuth(Component, r.path)}
                                />
                            )
                        }
                        return r.component ? route(r) : r.sub.map(r => route(r));
					})
                }
                <Route exact path="/app/index" component={Index} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}
export default CRouter;
