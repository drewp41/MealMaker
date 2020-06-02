import React, { useState } from 'react';
import {
    Modal, Form, Input
} from 'antd';
import {
    SyncOutlined, HeartOutlined, HeartFilled,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';


const CalorieCalcModal = (props) => {

    function handleCancel() {
        props.closeModal();
    }

    return (
        <Modal
            className='calorieCalcModal'
            title={'Calorie Estimator'}
            visible={props.visible}
            onCancel={handleCancel}
            footer={null}
            width='600px'
            bodyStyle={{}}
        >
            <p>
                This calculates your TDEE (Total Daily Energy Expenditure),
                or the number of calories you need to burn each day in order to maintain your current weight.
            </p>
            {/* <div style={{height:'15px'}} /> */}
            <p>
                Although this is an estimate, it is a good starting point for your meal plan.
            </p>
            {/* <Form>
                <Form.Item label='Gender'>
                    <Input />
                </Form.Item>
            </Form> */}

        </Modal >
    );
}

export default CalorieCalcModal;