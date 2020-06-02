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

    const [goal, setGoal] = useState('b');
    const [gender, setGender] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [activity, setActivity] = useState('a');

    const [validGender, setValidGender] = useState(true);
    const [validFeet, setValidFeet] = useState(true);
    const [validInches, setValidInches] = useState(true);
    const [validAge, setValidAge] = useState(true);
    const [validWeight, setValidWeight] = useState(true);

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
                <div className='calorieCalcFieldText' >I want to</div>
                <Radio.Group className='calorieCalcRadioSmall' size='large' buttonStyle="solid" defaultValue='b'
                    onChange={(e) => setGoal(e.target.value)}>
                    <Radio.Button value="a">Lose Weight</Radio.Button>
                    <Radio.Button value="b">Maintain</Radio.Button>
                    <Radio.Button value="c">Build Muscle</Radio.Button>
                </Radio.Group>
            </div>
            <div className={['calorieCalcRow', 'calorieCalcGender'].join(' ')}>
                <div className='calorieCalcFieldText'>Gender</div>
                <Radio.Group className={['calorieCalcRadioSmall', validGender ? '' : 'inputInvalid'].join(' ')}
                    size='large' buttonStyle="solid"
                    onChange={(e) => setGender(e.target.value)}>
                    <Radio.Button value="a">Male</Radio.Button>
                    <Radio.Button value="b">Female</Radio.Button>
                </Radio.Group>
            </div>
            <div className='calorieCalcRow'>
                <div className='calorieCalcFieldText'>Height</div>
                <div className='calorieCalcHeight' >
                    <Input type='number' className={['calorieCalcFieldHeight', validFeet ? '' : 'inputInvalid'].join(' ')}
                        addonAfter="ft" size='large'
                        onChange={(e) => setFeet(e.target.value)} />
                    <div style={{ width: '24px' }} />
                    <Input type='number' className={['calorieCalcFieldHeight', validInches ? '' : 'inputInvalid'].join(' ')}
                        addonAfter="in" size='large'
                        onChange={(e) => setInches(e.target.value)} />
                </div>
            </div>
            <div className='calorieCalcRow'>
                <div className='calorieCalcFieldText'>Age</div>
                <Input type='number' className={['calorieCalcField', validAge ? '' : 'inputInvalid'].join(' ')}
                    addonAfter="years" size='large'
                    onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className='calorieCalcRow'>
                <div className='calorieCalcFieldText'>Weight</div>
                <Input type='number' className={['calorieCalcField', validWeight ? '' : 'inputInvalid'].join(' ')}
                    addonAfter="lbs" size='large'
                    onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className='calorieCalcRow'>
                <div className='calorieCalcFieldText'>Activity level</div>
                <Select className='calorieCalcField'
                    defaultValue='a' size='large'
                    onChange={(val) => setActivity(val)}
                >
                    <Option className='camphorFont' value="a">Sedentary</Option>
                    <Option className='camphorFont' value="b">Lightly Active</Option>
                    <Option className='camphorFont' value="c">Moderately Active</Option>
                    <Option className='camphorFont' value="d">Very Active</Option>
                    <Option className='camphorFont' value="e">Extremely Active</Option>
                </Select>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0 0 0' }}>
                <a className='genButton' onClick={() => {
                    if (!gender)
                        setValidGender(false);
                    else
                        setValidGender(true);

                    if (!feet || feet < 1 || feet > 8)
                        setValidFeet(false);
                    else
                        setValidFeet(true);

                    if (!inches || inches < 0 || inches > 12)
                        setValidInches(false);
                    else
                        setValidInches(true);

                    if (!age || age < 1 || age > 122)
                        setValidAge(false);
                    else
                        setValidAge(true);

                    if (!weight || weight < 1 || weight > 1000)
                        setValidWeight(false);
                    else
                        setValidWeight(true);

                }} style={{ color: 'white' }}>
                    <CalculatorFilled />&nbsp;
                    CALCULATE
                </a>
            </div>

        </Modal >
    );
}

export default CalorieCalcModal;