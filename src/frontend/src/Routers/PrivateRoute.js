import React, {useEffect} from "react";
import {connect} from 'react-redux'
import {Route, Redirect} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";

// const PrivateRoute = ({isAuthenticated, component: Component, ...rest }) => {
//     useEffect(() => {
//         if (isAuthenticated === true){
//             return <Route {...rest} component={Component}/>
//         }
//         if (isAuthenticated === false) {
//             return <Redirect to={'/login'}/>
//         }
//     }, [isAuthenticated]);
//     const showSpinner = (
//         <CircularProgress/>
//     )
//     return showSpinner
// }

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            // check auth.isAuthenticated === null because this route receives first the initial state, where isAuthenticated is null
            if (auth.isLoading || auth.isAuthenticated === null) {
                return <CircularProgress />
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
