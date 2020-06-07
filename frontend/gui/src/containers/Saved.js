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

    // all the saved meals from the user
    const [allFoods, setAllFoods] = useState([]);
    // the current meals from the search box
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
                console.log(res.data);
                const parsedFoods = res.data.map(elem => {
                    return JSON.parse(elem.meal);
                })
                setAllFoods(parsedFoods);
                setFoods(parsedFoods);
            })
    }, [])

    function onChangeSearch(e) {
        const query = e.target.value;
        // true to keep element, false to remove it
        const newFoods = allFoods.filter(elem => {
            if (!query)
                return true;
            else
                return (elem.name.toLowerCase().includes(query.toLowerCase()));
        })
        setFoods(newFoods);
    }

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
                        <Search className='savedMealsSearchBar' placeholder="Search meals"
                            onSearch={value => console.log('searched ' + value)}
                            onChange={onChangeSearch} />
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