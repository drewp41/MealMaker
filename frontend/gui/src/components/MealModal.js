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
                    <div style={{ display: 'flex', color: '#383838' }}>
                        <div style={{ flex: 1, textAlign: 'left', margin: 'auto 0' }}>
                            <img src={groceries} alt={props.meal.name + 'image'}
                                style={{ width: 100, height: 100 }} />
                        </div>
                        <div style={{ flex: 2, textAlign: 'left', padding: '0 0 0 25px' }}>
                            <div className='space8' />
                            <div style={{ padding: '0 90px 0 0' }}>
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
                        <div style={{ flex: 2, textAlign: 'center' }}>
                            <div style={{ display: 'inline-block', margin: '3px 0 -3px 0' }}>
                                <Pie
                                    width={110}
                                    height={110}
                                    borderWidth={5}
                                    data={{
                                        labels: ['Carbs', 'Protein', 'Fat'],
                                        datasets:
                                            [{
                                                ...pieColors,
                                                data: [props.meal.carbs, props.meal.protein, props.meal.fat]
                                            }]
                                    }}
                                    options={pieOptions}
                                />
                            </div>
                        </div>
                        <div style={{ flex: 2, textAlign: 'left', fontSize: '16px' }}>
                            <div style={{ padding: '0 80px 0 0' }}>
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
                    </div>
                </>
            }
            visible={props.visible}
            onCancel={handleCancel}
            footer={null}
            width='750px'
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