import React, { useState } from 'react';
import {
    Modal, Steps
} from 'antd';
import {
    SyncOutlined, HeartOutlined, HeartFilled,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

import groceries from '../FoodIcons/groceries.svg';

import { Pie, defaults } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

defaults.global.legend.display = false;

const pieOptions = {
    plugins: {
        datalabels: {
            formatter: (value, context) => {
                return (value === 0) ? '' : ['C', 'P', 'F'][context.dataIndex];
            },
            color: 'white',
            font: {
                family: 'Camphor',
                size: 14
            }
        }
    },
    elements: {
        arc: {
            borderWidth: 1
        }
    },
    tooltips: {
        callbacks: {
            label: (tooltipItem, data) => {
                return data['labels'][tooltipItem['index']] + ': ' +
                    data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
        }
    },
    maintainAspectRatio: false,
    responsive: false,

}

const pieColors = {
    backgroundColor: [
        '#5B8FF9',
        '#E8684A',
        '#47B57A',
        // '#5D7092',
    ],
    hoverBackgroundColor: [
        '#4972D8',
        '#C7533B',
        '#399662',
        // '#4A5A7B'
    ],
}

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
                    <b style={{ fontWeight: 400, fontSize: '18px' }}>{props.meal.name}</b>
                    <br />
                    <br />
                    <div className='rowMM'>
                        <div className='colMMIcon'>
                            <div style={{ width: '100px' }}>
                                <img src={groceries} alt={props.meal.name + 'image'}
                                    style={{ width: 100, height: 100 }} />
                            </div>
                            <div style={{ width: '120px', textAlign: 'left', margin: '0 0 0 20px' }}>
                                <p> {'Prep: '}
                                    <span style={{ float: 'right' }}>{typeof props.meal.prepTime === 'undefined' ? 'n/a'
                                        : props.meal.prepTime + ' mins'}</span>
                                </p>
                                <p> {'Cook: '}
                                    <span style={{ float: 'right' }}>{typeof props.meal.cookTime === 'undefined' ? 'n/a'
                                        : props.meal.cookTime + ' mins'}</span>
                                </p>
                                <span style={{ fontSize: '18px' }}>
                                    <SyncOutlined />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <PushpinOutlined />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <HeartOutlined />
                                </span>
                            </div>
                        </div>
                        <div className='colMMFiller' />
                        <div className='colMMPie'>
                            <div style={{ width: '110px' }}>
                                <Pie
                                    width={110}
                                    height={110}
                                    borderWidth={5}
                                    data={{
                                        labels: ['Carbs', 'Protein', 'Fat'],
                                        datasets:
                                            [{
                                                ...pieColors,
                                                data:
                                                    [Math.floor(props.meal.carbs * 100 / (props.meal.carbs + props.meal.protein + props.meal.fat * (9 / 4))),
                                                    Math.floor(props.meal.protein * 100 / (props.meal.carbs + props.meal.protein + props.meal.fat * (9 / 4))),
                                                    Math.floor((props.meal.fat * (9 / 4) * 100) / (props.meal.carbs + props.meal.protein + props.meal.fat * (9 / 4)))]
                                            }]
                                    }}
                                    options={pieOptions}
                                />
                            </div>
                            <div style={{ width: '145px', textAlign: 'left', margin: '0 0 0 35px' }}>
                                <span>{'Calories: '}
                                    <span style={{ float: 'right' }}>{props.meal.calories}</span>
                                </span>
                                <div className='space6' />
                                <div style={{ width: '25px', borderBottom: '2px solid #a0a0a0' }} />
                                <div className='space8' />
                                <span> {'Carbs: '}
                                    <span style={{ float: 'right' }}>{props.meal.carbs}{'g'}</span>
                                </span>
                                <div className='space6' />
                                <span> {'Protein: '}
                                    <span style={{ float: 'right' }}>{props.meal.protein}{'g'}</span>
                                </span>
                                <div className='space6' />
                                <span> {'Fat: '}
                                    <span style={{ float: 'right' }}>{props.meal.fat}{'g'}</span>
                                </span>
                            </div>
                        </div>
                        <div className='colMMFiller' />
                    </div>
                </>
            }
            visible={props.visible}
            onCancel={handleCancel}
            footer={null}
            width='700px'
            bodyStyle={{}}
        >
            <b style={{ fontSize: '16px', fontWeight: 400 }}>Ingredients:</b>
            <div className='space4' />
            {/* need to add keys to help React identify changes */}
            <ul>
                {props.meal.ingredients.map((elem, idx) =>
                    <li style={{ fontSize: '15px' }} key={idx}>{elem}</li>
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
        </Modal >
    );
}

export default MealModal;