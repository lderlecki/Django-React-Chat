import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {Button, Container, CssBaseline, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import {login} from "../actions/auth";

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        login(email, password)
    };

    // Is user authenticated?
    // Redirect them to home page
    if (isAuthenticated) {
        return <Redirect to='/'/>
    }

    return (
        <Container maxWidth='xs'>
            <CssBaseline />
            <div className='form-wrapper'>
                <Typography component='h1' variant='h1'>
                    Sign in
                </Typography>
                <p>Sign into your Account</p>
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
                    <FormControl component="fieldset">
                        <TextField
                            required
                            fullWidth
                            variant='outlined'
                            id='password'
                            margin='normal'
                            label="Password"
                            placeholder="Password"
                            type='password'
                            name='password'
                            autoComplete='current-password'
                            minLength='6'
                            value={password}
                            onChange={e => onChange(e)}/>
                    </FormControl>
                    <Button color="primary" variant="contained" type='submit'>Login</Button>
                </form>

                <Grid container>
                    <Grid item xs>
                        <Link to={'/reset-password'} variant='body2'>Forgot password?</Link>
                    </Grid>
                    <Grid item xs align='right'>
                        <Link to={'/signup'} variant='body2'>Don't have an account?</Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,

})

export default connect(mapStateToProps, { login })(Login);
