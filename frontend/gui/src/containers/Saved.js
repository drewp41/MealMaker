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
        if (!props.isAuthenticated) {
            history.push('/');
            return;
        }
        axios.get('http://127.0.0.1:8000/api/', {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        })
            .then(res => {
                setFoods(res.data);
                console.log(res.data);
            })
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header {...props} />
            <div className='savedMeals' style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', minWidth: '320px' }}>
                    <br />
                    <p style={{ fontSize: '24px', padding: '0 16px' }}>Saved meals</p>
                    <Foods data={foods} />
                    {/*<CustomForm
                        requestType="post"
                        foodID={null}
                        btnText="Create" /> */}
                </div>
            </div>
            {/* <div style={{ minHeight: '50vh' }} /> */}

            <Footer />
        </div>
    )
}


export default Saved;