import Layout from "../hocs/Layout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from "../containers/Login";
import Signup from "../containers/Signup";
import ResetPassword from "../containers/ResetPassword";
import ResetPasswordConfirm from "../containers/ResetPasswordConfirm";
import Activate from "../containers/Activate";
import WorkspacesMain from "../containers/workspace/WorkspacesMain";
import WorkspaceCreate from "../containers/workspace/WorkspaceCreate";
import Workspace from "../containers/workspace/Workspace";
import Home from "../containers/Home";
import React from "react";
import PrivateRoute from "./PrivateRoute";


const AppRouter = () => (
    <Router>
        <Layout>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/reset-password' component={ResetPassword}/>
                <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm}/>
                <Route exact path='/activate/:uid/:token' component={Activate}/>

                <PrivateRoute exact path='/workspaces' component={WorkspacesMain}/>
                <PrivateRoute exact path='/workspaces/create' component={WorkspaceCreate}/>
                <PrivateRoute exact path='/:workspace/:room' component={Workspace}/>

                <Route exact path='/*' component={Home}/>
            </Switch>
        </Layout>
    </Router>
)

export default AppRouter;

