import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {logout} from '../actions/auth'
import {AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {AccountCircle} from "@material-ui/icons";

// const Navbar = ({logout, isAuthenticated}) => {
//     const guestLinks = () => (
//         <Fragment>
//             <ul className='navbar-nav'>
//                 <li className="nav-item">
//                 <Link className="nav-item nav-link" to="/login">Login</Link>
//             </li>
//                 <li className="nav-item">
//                 <Link className="nav-item nav-link" to="/signup">Signup</Link>
//             </li>
//             </ul>
//         </Fragment>
//     );
//     const authLinks = () => (
//         <ul className='navbar-nav'>
//             <li className="nav-item">
//                 <Link className="nav-item nav-link" to='/workspaces'>Workspaces</Link>
//             </li>
//             <li className="nav-item">
//                 <Link className="nav-item nav-link" to='/' onClick={logout}>Logout</Link>
//             </li>
//         </ul>
//     );
//
//     return (
//         <header className="navbar navbar-expand-lg navbar-light">
//             <Link className="navbar-brand" to="/">SuperChat</Link>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
//                     aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                 <ul className="navbar-nav mr-auto">
//                     <li className="nav-item" >
//                         <Link className="nav-item nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
//                     </li>
//                 </ul>
//                 <ul className="navbar-nav">
//                     {isAuthenticated ? authLinks() : guestLinks()}
//                 </ul>
//             </div>
//         </header>
//     );
// };

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
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
                    <div>
                        <Button color='inherit' component={Link} to='/workspaces'>Workspaces</Button>
                        <Button color='inherit' component={Link} to='/' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
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
