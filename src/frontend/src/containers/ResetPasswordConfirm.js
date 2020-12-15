import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {Button, Container, CssBaseline, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import {reset_password_confirm} from "../actions/auth";

const ResetPasswordConfirm = ({match, reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });
    const {new_password, re_new_password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/'/>
    }

    return (
        <Container maxWidth='xs'>
            <CssBaseline/>
            <div className='form-wrapper'>
                <Typography component='h3' variant='h3'>
                    Change your password
                </Typography>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <FormControl component="fieldset">
                        <TextField
                            required
                            fullWidth
                            variant='outlined'
                            id='new_password'
                            margin='normal'
                            label="Password"
                            placeholder="Password"
                            type='password'
                            name='new_password'
                            autoComplete='current-password'
                            minLength='6'
                            value={new_password}
                            onChange={e => onChange(e)}/>
                    </FormControl>
                    <FormControl component="fieldset">
                        <TextField
                            required
                            fullWidth
                            variant='outlined'
                            id='re_new_password'
                            margin='normal'
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type='password'
                            name='re_new_password'
                            autoComplete='current-password'
                            minLength='6'
                            value={re_new_password}
                            onChange={e => onChange(e)}/>
                    </FormControl>
                    <Button color="primary" variant="contained" type='submit'>Reset Password</Button>
                </form>
            </div>
        </Container>
    )
}

export default connect(null, {reset_password_confirm})(ResetPasswordConfirm);
