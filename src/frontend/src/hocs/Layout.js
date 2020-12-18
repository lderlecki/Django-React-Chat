import React, {useEffect} from "react";
import { Redirect} from 'react-router-dom';
import Navbar from '../components/Navbar'
import {connect} from 'react-redux';
import { load_user} from '../actions/auth'

const Layout = (props) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                await props.load_user();
            } catch (err) {
                console.log('layout error: ', err)
                return(<Redirect to='/login' />)
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    );
};

export default connect(null,{  load_user })(Layout);
