import React, { useState } from 'react';
import {
    Modal
} from 'antd';
import {
    SyncOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

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
            width='600px'
            bodyStyle={{ height: '500px' }}
        >
            Ingredients:
            <ul>
                {props.meal.ingredients.map((elem) =>
                    <li>{elem}</li>
                )}
            </ul>
            <br />
            Instructions:
            <ul style={{ listStyleType: 'none' }}>
                {props.meal.instructions.map((elem, idx) =>
                    <li>{idx + 1}) {elem}</li>
                )}
            </ul>

        </Modal>
    );
}

export default MealModal;