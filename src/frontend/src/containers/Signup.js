import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {Button, Container, CssBaseline, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import {signup} from "../actions/auth";

const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: '',
    });
    const {name, email, password, re_password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password){
            signup(name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    // Is user authenticated?
    // Redirect them to home page
    if (isAuthenticated) {
        return <Redirect to='/'/>
    }
    if (accountCreated) {
        return <Redirect to='/login'/>
    }

    return (
        <Container maxWidth='xs'>
            <CssBaseline />
            <div className='form-wrapper'>
                <Typography component='h1' variant='h1'>
                    Sign Up
                </Typography>
                <p>Create your Account</p>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <FormControl component="fieldset">
                        <TextField
                            required
                            fullWidth
                            variant='outlined'
                            margin='normal'
                            label="Name"
                            id="name"
                            placeholder="Name"
                            type='text'
                            name='name'
                            value={name}
                            onChange={e => onChange(e)}/>
                    </FormControl>
                    <FormControl component="fieldset">
                        <TextField
                            required
                            fullWidth
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
                    <FormControl component="fieldset">
                        <TextField
                            required
                            fullWidth
                            variant='outlined'
                            id='re_password'
                            margin='normal'
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type='password'
                            name='re_password'
                            autoComplete='current-password'
                            minLength='6'
                            value={re_password}
                            onChange={e => onChange(e)}/>
                    </FormControl>
                    <Button color="primary" variant="contained" type='submit'>Register</Button>
                </form>

                <Grid container>
                    <Grid item xs>
                        <Link to={'/login'} variant='body2'>Already have an account?</Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,

})

export default connect(mapStateToProps, { signup })(Signup);
