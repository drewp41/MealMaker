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
            title={props.meal.name}
            visible={props.visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width='800px'
            bodyStyle={{ height: '700px' }}
        >
            Ingredients:
            <ul>
                {props.meal.ingredients.map((elem) =>
                    <li>{elem}</li>
                )}
            </ul>
            <br />
            Instructions:
            <div className='space8' />
            <Steps direction='vertical' size='small' current={0} style={{ color: 'black !important' }}>
                {props.meal.instructions.map((elem, idx) =>
                    <Step description={elem} />
                )}
            </Steps>
        </Modal>
    );
}

export default MealModal;