import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {logout} from '../actions/auth'

const Navbar = ({logout, isAuthenticated}) => {
    const guestLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-item nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-item nav-link" to="/signup">Signup</Link>
            </li>
        </Fragment>
    );
    const authLinks = () => (
            <li className="nav-item">
                <a className="nav-item nav-link" href='/' onClick={logout}>Logout</a>
            </li>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">SuperChat</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-item nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                {isAuthenticated ? authLinks() : guestLinks()}
            </div>
        </div>
    </nav>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Navbar);
