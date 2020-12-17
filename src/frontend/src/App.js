import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './containers/Home';
import Activate from './containers/Activate';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Signup from './containers/Signup';
import Layout from "./hocs/Layout";

import Workspace from "./containers/workspace/Workspace";
import WorkspacesMain from "./containers/workspace/WorkspacesMain";
import WorkspaceCreate from "./containers/workspace/WorkspaceCreate";

import {Provider} from 'react-redux';
import store from "./store";

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/reset-password' component={ResetPassword}/>
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm}/>
                    <Route exact path='/activate/:uid/:token' component={Activate}/>

                    <Route exact path='/workspaces' component={WorkspacesMain}/>
                    <Route exact path='/workspaces/create' component={WorkspaceCreate}/>
                    <Route exact path='/:workspace/:room' component={Workspace}/>

                    <Route exact path='/*' component={Home}/>
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;
