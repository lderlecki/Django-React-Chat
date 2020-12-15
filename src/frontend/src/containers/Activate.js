import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {Button, Container, CssBaseline, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import {verify} from "../actions/auth";

const Activate = ({match, verify}) => {
    const [verified, setVerified] = useState(false);

    useEffect(
        // component mount
        () => {
            const uid = match.params.uid;
            const token = match.params.token;
            verify(uid, token);
            setVerified(true)
        }
    )




    return (
        <Container>
            <CssBaseline />
            <div className='container'>
                <div className="jumbotron mt-5">
                    <h1 className="display-4">Account activated!</h1>
                    <p className="lead">You will be now redirected to the login page.</p>
                    <hr className="my-4" />
                    <Link to={'/login'}>Click here to login.</Link>
                </div>
            </div>
        </Container>
    )
}

export default connect(null, { verify })(Activate);
