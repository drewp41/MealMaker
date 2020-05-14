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
            <p>Yummy food</p>
        </Modal>
    );
}

export default MealModal;