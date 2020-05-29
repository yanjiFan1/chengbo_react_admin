import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import E403 from "bundle-loader?lazy&name=exception!./view/exception/E403";
import E404 from "bundle-loader?lazy&name=exception!./view/exception/E404";
import E405 from "bundle-loader?lazy&name=exception!./view/exception/E405";
import E500 from "bundle-loader?lazy&name=exception!./view/exception/E500";
import Login from "bundle-loader?lazy&name=login!./view/login/Login";
import EmptyException from "bundle-loader?lazy&name=exception!./view/exception/EmptyException"
import LazyLoad from "@/components/common/LazyLoad";
import App from "./App";

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/index" push />} />
                <Route path="/" component={App} />
                <Route path="/404" name ="404" component={LazyLoad(E404)} />
                <Route path="/405" name ="405" component={LazyLoad(E405)} />
                <Route path="/403" name ="403" component={LazyLoad(E403)} />
                <Route path="/500" name ="500" component={LazyLoad(E500)} />
                <Route path="/login" name ="login" component={LazyLoad(Login)} />
                <Route path="/emptyException" name ="emptyException" component={LazyLoad(EmptyException)} />
                <Route component={E404} />
            </Switch>
        </Router>
    )}

