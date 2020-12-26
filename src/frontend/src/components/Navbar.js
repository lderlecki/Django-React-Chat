import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {logout} from '../actions/auth'
import {AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {AccountCircle} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    userSection: {
        marginLeft: "auto",
    },
    title: {

    },
}));

const Navbar = ({logout, isAuthenticated}) => {
    const classes = useStyles();
    return (

        <AppBar>
            <Toolbar>
                <Typography component={Link} to={'/'} variant="h6" className={classes.title}>
                    SuperChat
                </Typography>

                {isAuthenticated ? (
                    <div className={classes.userSection}>
                        <Button color='inherit' component={Link} to='/workspaces'>Workspaces</Button>
                        <Button color='inherit' component={Link} to='/' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div className={classes.userSection}>
                        <Button color='inherit' component={Link} to='/login'>Login</Button>
                        <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
        ;
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Navbar);
