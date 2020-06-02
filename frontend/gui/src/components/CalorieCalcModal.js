import React, { useState } from 'react';
import {
    Modal, Form, Input, Radio, Select
} from 'antd';
import {
    CalculatorFilled
} from '@ant-design/icons';

import NumberFormat from 'react-number-format';

const { Option } = Select;


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
            <p>
                Although this is an estimate, it is a good starting point for your meal plan.
            </p>
            <div style={{ width: '100%', borderBottom: '1px solid #eeeeee' }} />
            <div className='space24' />

            <div className={['calorieCalcRow', 'calorieCalcGoal'].join(' ')}>
                <div className='calorieCalcFieldText' onClick={() => { }}>I want to</div>
                <Radio.Group size='large' buttonStyle="solid" defaultValue='b'>
                    <Radio.Button value="a">Lose Weight</Radio.Button>
                    <Radio.Button value="b">Maintain</Radio.Button>
                    <Radio.Button value="c">Build Muscle</Radio.Button>
                </Radio.Group>
            </div>
            <div className={['calorieCalcRow', 'calorieCalcGender'].join(' ')}>
                <div className='calorieCalcFieldText' onClick={() => { }}>Gender</div>
                <Radio.Group size='large' buttonStyle="solid">
                    <Radio.Button value="a">Male</Radio.Button>
                    <Radio.Button value="b">Female</Radio.Button>
                </Radio.Group>
            </div>
            <div className='calorieCalcRow'>
                <div className='calorieCalcFieldText' onClick={() => { }}>Height</div>
                <Input className='calorieCalcField' addonAfter="ft" size='large' />
                <div style={{ width: '16px' }} />
                <Input className='calorieCalcField' addonAfter="in" size='large' />
            </div>
            <div className='calorieCalcRow'>
                <div className='calorieCalcFieldText' onClick={() => { }}>Age</div>
                <Input className='calorieCalcField' addonAfter="years" size='large' />
            </div>
            <div className='calorieCalcRow'>
                <div className='calorieCalcFieldText' onClick={() => { }}>Weight</div>
                <Input className='calorieCalcField' addonAfter="lbs" size='large' />
            </div>
            <div className='calorieCalcRow'>
                <div className='calorieCalcFieldText' onClick={() => { }}>Activity level</div>
                <Select className='calorieCalcField'
                    defaultValue='a' size='large'
                >
                    <Option className='camphorFont' value="a">Sedentary</Option>
                    <Option className='camphorFont' value="b">Lightly Active</Option>
                    <Option className='camphorFont' value="c">Moderately Active</Option>
                    <Option className='camphorFont' value="d">Very Active</Option>
                    <Option className='camphorFont' value="e">Extremely Active</Option>
                </Select>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0 0 0' }}>
                <a className='genButton' onClick={() => { }} style={{ color: 'white' }}>
                    <CalculatorFilled />&nbsp;
                    CALCULATE
                </a>
            </div>

        </Modal >
    );
}

export default CalorieCalcModal;