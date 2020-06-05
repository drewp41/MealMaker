import React, { useState } from 'react';
import { List, Avatar } from 'antd';

import MealModal from './MealModal';

import groceries from '../FoodIcons/groceries.svg';

function FoodEntry(props) {

    const [showModal, setShowModal] = useState(false);

    function closeModal() {
        setShowModal(false);
    }

    return (
        <>
            <MealModal visible={showModal} meal={props.meal} closeModal={closeModal}
                regen={null} pin={null} pinned={null}
                loading={null} isAuthenticated={props.isAuthenticated} />
            <List.Item key={props.item.title} style={{ cursor: 'pointer' }}
                onClick={() => setShowModal(true)}>
                <List.Item.Meta
                    avatar={<Avatar src={groceries} />}
                    title={props.meal.name}
                    description={props.meal.calories + ' calories'}
                />
            </List.Item>
        </>
    )
}


export default FoodEntry;