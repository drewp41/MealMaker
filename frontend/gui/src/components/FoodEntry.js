import React, { useState } from 'react';
import { List, Avatar, Popconfirm, Button } from 'antd';
import axios from 'axios';

import MealModal from './MealModal';

import { MessageOutlined, LikeOutlined, StarOutlined, CloseCircleOutlined } from '@ant-design/icons';
import groceries from '../FoodIcons/groceries.svg';

const IconText = ({ icon, text }) => (
    <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
    </span>
);

const FoodEntry = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [showEntry, setShowEntry] = useState(true);

    function closeModal() {
        setShowModal(false);
    }

    function removeEntry() {
        axios.delete(`http://127.0.0.1:8000/api/${props.id}/`, {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        })
            .then(res => {
                console.log('success');
            })
            .catch(error => {
                console.log(error);
            })
        setShowEntry(false);
    }

    return (
        <>
            <MealModal visible={showModal} meal={props.meal}
                closeModal={closeModal} useIcons={false} />
            {showEntry &&

                <List.Item style={{ display: 'flex' }}>
                    <List.Item.Meta
                        avatar={<Avatar src={groceries} />}
                        title={props.meal.name}
                        description={props.meal.calories + ' calories'}
                        style={{ cursor: 'pointer', paddingRight: '10px', width: '500px' }}
                        onClick={() => {
                            setShowModal(true);
                            console.log(showModal);
                        }}
                    />
                    <div style={{ paddingLeft: '16px', textAlign: 'right' }}>
                        <h4 className="ant-list-item-meta-title" style={{ fontWeight: 400, color: 'rgba(0, 0, 0, 0.45)' }}>
                            6/3/2020
                        </h4>
                        <div className="ant-list-item-meta-description">
                            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={removeEntry}>
                                <a className='profileRemoveMeal'>
                                    <CloseCircleOutlined style={{ marginRight: '8px' }} />
                                    Remove
                                </a>
                            </Popconfirm>
                        </div>

                    </div>
                </List.Item>
            }
        </>
    )
}


export default FoodEntry;