import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {Button, FormControl, TextField} from "@material-ui/core";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        // login(email, password)
    };

    // Is user authenticated?
    // Redirect them to home page

    return (
        <div className='container'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <FormControl>
                    <TextField
                        required
                        id="standard-basic"
                        label="Email"
                        type='email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}/>
                </FormControl>
                <FormControl>
                    <TextField
                        required
                        id="standard-basic"
                        label="Password"
                        type='password'
                        name='password'
                        minLength='6'
                        value={password}
                        onChange={e => onChange(e)}/>
                </FormControl>
                <Button
                    color="primary"
                    variant="contained"
                    type='submit'
                  >
                    Login
                  </Button>
            </form>
            <p>
                Don't have an account? <Link to='/signup'>Signup</Link>
            </p>
        </div>
    )
}

export default connect()(Login);
