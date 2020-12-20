import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

const Home = () => (
    <div className='container'>
        <div className="jumbotron mt-5">
            <h1 className="display-4">Welcome to the Chat!</h1>
            <p className="lead">This is an incredible chat app, that one day will be better than Slack.</p>
            <hr className="my-4" />
            <p>Click the login button.</p>
            <Button size="large" variant="contained" color="primary" component={Link} to='/login'>Login</Button>
        </div>
    </div>
);

export default Home;
