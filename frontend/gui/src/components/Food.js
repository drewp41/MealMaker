import React, { useState } from 'react';
import { List } from 'antd';

import MealModal from './MealModal';
import FoodEntry from './FoodEntry';

import groceries from '../FoodIcons/groceries.svg';


// const emptyMeal = {
//     name: '', calories: 0, carbs: 0,
//     protein: 0, fat: 0, ingredients: [],
//     instructions: [], servings: 0, makes: 0,
//     prepTime: 0, cookTime: 0
// }

const Foods = (props) => {

    return (
        <List
            size="large"
            pagination={{
                onChange: page => {
                    // console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={props.data}
            style={{ height: '1000px' }}
            renderItem={item => {
                return (
                    <FoodEntry id={item[0]} meal={item[1]} date={item[2]}
                        isAuthenticated={props.isAuthenticated} />
                );
            }}
        />
    )
}

export default Foods;