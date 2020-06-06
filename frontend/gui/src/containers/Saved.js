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
            <div className='savedMeals' style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', maxWidth: '1000px' }}>
                    <br />
                    <p style={{ fontSize: '24px', padding: '0 16px' }}>Saved meals</p>
                    <Foods data={foods} />
                    {/* <br />
                    <h2>Create a meal plan</h2>
                    <CustomForm
                        requestType="post"
                        foodID={null}
                        btnText="Create" /> */}
                    <div style={{ height: '200px' }} />
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Saved;