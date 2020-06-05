import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import MealModal from './MealModal';
import FoodEntry from './FoodEntry';

import groceries from '../FoodIcons/groceries.svg';


// const emptyMeal = {
//     name: '', calories: 0, carbs: 0,
//     protein: 0, fat: 0, ingredients: [],
//     instructions: [], servings: 0, makes: 0,
//     prepTime: 0, cookTime: 0
// }


const IconText = ({ icon, text }) => (
    <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
    </span>
);

const Foods = (props) => {

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    // console.log(page);
                },
                pageSize: 6,
            }}
            dataSource={props.data}

            renderItem={item => {
                let parsed = JSON.parse(item.meal);
                return (
                    <FoodEntry meal={parsed} item={item}
                        isAuthenticated={props.isAuthenticated} />
                    // <>
                    //     <MealModal visible={showModal} meal={parsed} closeModal={closeModal}
                    //         regen={null} pin={null} pinned={null}
                    //         loading={null} isAuthenticated={props.isAuthenticated} />
                    //     <List.Item key={item.title} style={{ cursor: 'pointer' }}
                    //         onClick={() => setShowModal(true)}>
                    //         <List.Item.Meta
                    //             avatar={<Avatar src={groceries} />}
                    //             title={parsed.name}
                    //             description={parsed.calories + ' calories'}
                    //         />
                    //     </List.Item>
                    // </>
                )
            }}
        />
    )
}

export default Foods;