import Layout from "../hocs/Layout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from "../containers/Login";
import Signup from "../containers/Signup";
import ResetPassword from "../containers/ResetPassword";
import ResetPasswordConfirm from "../containers/ResetPasswordConfirm";
import Activate from "../containers/Activate";
import WorkspacesIndex from "../containers/workspace/WorkspacesIndex";
import WorkspaceCreate from "../containers/workspace/WorkspaceCreate";
import ChatPage from "../containers/chat/ChatPage";
import RoomCreate from "../containers/workspace/RoomCreate";
import Home from "../containers/Home";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import WorkspaceVerify from "../containers/workspace/WorkspaceVerify";


const AppRouter = () => (
    <Router>
        <Layout>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/reset-password' component={ResetPassword}/>
                <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm}/>
                <Route exact path='/activate/:uid/:token' component={Activate}/>

                <PrivateRoute exact path='/workspaces' component={WorkspacesIndex}/>
                <PrivateRoute exact path='/workspaces/create' component={WorkspaceCreate}/>

                <PrivateRoute exact path='/:workspace' component={WorkspaceVerify}/>
                <PrivateRoute exact path='/:workspace/create' component={RoomCreate}/>
                <PrivateRoute exact path='/:workspace/:room' component={ChatPage}/>

                <Route exact path='/*' component={Home}/>
            </Switch>
        </Layout>
    </Router>
)

export default AppRouter;

