import React, { useState } from 'react';
import {
    Modal, Steps
} from 'antd';
import {
    SyncOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

import groceries from '../FoodIcons/groceries.svg';

const { Step } = Steps;

const MealModal = (props) => {

    function handleCancel() {
        props.closeModal();
    }

    return (
        <Modal
            className='mealModal'
            title={
                <>
                    <b style={{ fontWeight: 400 }}>{props.meal.name}</b>
                </>
            }
            visible={props.visible}
            onCancel={handleCancel}
            footer={null}
            width='800px'
            bodyStyle={{}}
        >
            <b style={{ fontSize: '16px', fontWeight: 400 }}>Ingredients:</b>
            <div className='space4' />
            {/* need to add keys to help React identify changes */}
            <ul>
                {props.meal.ingredients.map((elem, idx) =>
                    <li key={idx}>{elem}</li>
                )}
            </ul>
            <br />
            <b style={{ fontSize: '16px', fontWeight: 400 }}>Instructions:</b>
            <div className='space8' />
            <Steps direction='vertical' size='small' current={-1} >
                {props.meal.instructions.map((elem, idx) =>
                    <Step description={elem} key={idx} />
                )}
            </Steps>
        </Modal>
    );
}

export default MealModal;