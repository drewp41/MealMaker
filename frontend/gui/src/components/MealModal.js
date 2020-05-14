import React, { useState } from 'react';
import {
    Modal
} from 'antd';
import {
    SyncOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

function MealModal(props) {

    function handleOk() {
        console.log('ok');
        props.closeModal();
    }

    function handleCancel() {
        console.log('cancel');
        props.closeModal();
    }

    return (
        <Modal
            title={props.meal.name}
            visible={props.visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <p>Yummy food</p>
        </Modal>
    );
}

export default MealModal;