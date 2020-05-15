import React, { useState } from 'react';
import {
    Modal, Steps
} from 'antd';
import {
    SyncOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

const { Step } = Steps;

const MealModal = (props) => {

    function handleOk() {
        props.closeModal();
    }

    function handleCancel() {
        props.closeModal();
    }

    return (
        <Modal
            className='mealModal'
            title={props.meal.name}
            visible={props.visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width='800px'
            bodyStyle={{ height: '700px' }}
        >
            <b style={{ fontSize: '16px', fontWeight: 400 }}>Ingredients:</b>
            <div className='space4' />
            <ul>
                {props.meal.ingredients.map((elem) =>
                    <li>{elem}</li>
                )}
            </ul>
            <br />
            <b style={{ fontSize: '16px', fontWeight: 400 }}>Instructions:</b>
            <div className='space8' />
            <Steps direction='vertical' size='small' current={-1} >
                {props.meal.instructions.map((elem, idx) =>
                    <Step description={elem} />
                )}
            </Steps>
        </Modal>
    );
}

export default MealModal;