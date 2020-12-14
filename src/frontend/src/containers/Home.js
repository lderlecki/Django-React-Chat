import React from "react";
import {Link} from "react-router-dom";

const Home = () => (
    <div className='container'>
        <div className="jumbotron mt-5">
            <h1 className="display-4">Welcome to the Chat!</h1>
            <p className="lead">This is an incredible chat app, that one day will be better than Slack.</p>
            <hr className="my-4" />
            <p>Click the login button.</p>
            <Link className="btn btn-primary btn-lg" to="/login" role="button">Login</Link>
        </div>
    </div>
);

export default Home;
