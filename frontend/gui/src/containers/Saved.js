import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Input } from 'antd';

import Header from './Header';
import Footer from './Footer';
import Foods from '../components/Food';
import CustomForm from '../components/Form';

const { Search } = Input;


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
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '600px' }}>
                    <br />
                    <div style={{ display: 'flex', fontSize: '24px', padding: '0 24px', alignItems: 'center' }}>
                        <div style={{ width: '500px' }}>
                            Saved meals
                        </div>
                        <Search className='savedMealsSearchBar' placeholder="Search meals" onSearch={value => console.log(value)} />
                    </div>
                    <div className='space8' />
                    <Foods data={foods} />
                    {/*<CustomForm
                        requestType="post"
                        foodID={null}
                        btnText="Create" /> */}
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Saved;