import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';
import Foods from '../components/Food';
import CustomForm from '../components/Form';


function Saved(props) {

    const [foods, setFoods] = useState([]);

    const history = useHistory();

    // Redirect the user back to the home page if they aren't logged in
    useEffect(() => {
        if (!props.isAuthenticated)
            history.push('/');

        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                setFoods(res.data);
                console.log(res.data);
            })
    }, [])

    return (
        <>
            <Header {...props} />
            <p style={{ fontSize: '30px' }}>Saved meals</p>
            <Foods data={foods} />
            <br />
            <h2>Create a meal plan</h2>
            <CustomForm
                requestType="post"
                foodID={null}
                btnText="Create" />
            <div style={{ height: '500px' }} />
            <Footer />
        </>
    )
}


export default Saved;