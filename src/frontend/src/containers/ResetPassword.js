import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {Button, Container, CssBaseline, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import {reset_password} from "../actions/auth";

const ResetPassword = (props) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });
    const {email} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        props.reset_password(email)
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/'/>
    }

    return (
        <Container maxWidth='xs'>
            <CssBaseline />
            <div className='form-wrapper'>
                <Typography component='h3' variant='h3'>
                    Reset password
                </Typography>
                <p>Type in your email to reset your password</p>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <FormControl component="fieldset">
                        <TextField
                            required
                            fullWidth
                            autoFocus
                            autoComplete='email'
                            variant='outlined'
                            margin='normal'
                            label="Email"
                            id="email"
                            placeholder="Email"
                            type='email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}/>
                    </FormControl>
                    <Button color="primary" variant="contained" type='submit'>Reset Password</Button>
                </form>
            </div>
        </Container>
    )
}

export default connect(null, { reset_password })(ResetPassword);
