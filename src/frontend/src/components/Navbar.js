import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {logout} from '../actions/auth'

const Navbar = ({logout, isAuthenticated}) => {
    const guestLinks = () => (
        <Fragment>
            <ul className='navbar-nav'>
                <li className="nav-item">
                <Link className="nav-item nav-link" to="/login">Login</Link>
            </li>
                <li className="nav-item">
                <Link className="nav-item nav-link" to="/signup">Signup</Link>
            </li>
            </ul>
        </Fragment>
    );
    const authLinks = () => (
        <ul className='navbar-nav'>
            <li className="nav-item">
                <Link className="nav-item nav-link" to='/' onClick={logout}>Logout</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">SuperChat</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item" >
                    <Link className="nav-item nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
            </ul>
            <ul className="navbar-nav">
                {isAuthenticated ? authLinks() : guestLinks()}
            </ul>
        </div>
    </nav>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Navbar);
