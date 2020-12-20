import React, {useEffect} from "react";
import {connect} from 'react-redux'
import {Route, Redirect} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            // check auth.isAuthenticated === null to prevent it will work even if the auth state is in it's initial state
            if (auth.isLoading || auth.isAuthenticated === null) {
                return <CircularProgress/>
            } else if (auth.isAuthenticated === false) {
                return <Redirect to={'/login'}/>
            } else {
                return <Component {...props}/>
            }
        }}
    />
)

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
