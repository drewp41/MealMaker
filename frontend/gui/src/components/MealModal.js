import React, { useState } from 'react';
import {
    Modal, Steps
} from 'antd';
import {
    SyncOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

import groceries from '../FoodIcons/groceries.svg';

import { Pie, defaults } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

defaults.global.legend.display = false;

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
                        <div style={{ flex: 1, textAlign: 'left' }}>
                            <img src={groceries} alt={props.meal.name + 'image'}
                                style={{ width: 100, height: 100 }} />
                        </div>
                        <div style={{ flex: 2, textAlign: 'left' }}>
                            <p> {'Prep: '}
                                {typeof props.meal.prepTime === 'undefined' ? 'n/a'
                                    : props.meal.prepTime + ' mins'}</p>
                            <p> {'Cook: '}
                                {typeof props.meal.cookTime === 'undefined' ? 'n/a'
                                    : props.meal.cookTime + ' mins'}</p>
                        </div>
                        <div style={{ flex: 2, textAlign: 'left' }}>
                            <Pie data={{
                                labels: ['Carbs', 'Protein', 'Fat'],
                                datasets:
                                    [
                                        {
                                            backgroundColor: [
                                                '#43B02A',
                                                '#3DA5D9',
                                                '#FF8200',
                                            ],
                                            hoverBackgroundColor: [
                                                '#369222',
                                                '#3187B8',
                                                '#DA6800',
                                            ],
                                            data: [props.meal.carbs, props.meal.protein, props.meal.fat]
                                        }
                                    ]
                            }}
                                options={{
                                    plugins: {
                                        datalabels: {
                                            formatter: (value, context) => {
                                                return ['C', 'P', 'F'][context.dataIndex];
                                            },
                                            color: 'white',
                                            font: {
                                                family: 'Camphor',
                                                size: 14
                                            }
                                        }
                                    },
                                }}
                            />
                        </div>
                        <div style={{ flex: 2, textAlign: 'left', color: '#383838', fontSize: '16px' }}>
                            <p>{'Calories: '}
                                {props.meal.calories}</p>
                            <p>{'Carbs: '}
                                {props.meal.carbs + ' g'}</p>
                            <p>{'Protein: '}
                                {props.meal.protein + ' g'}</p>
                            <p>{'Fat: '}
                                {props.meal.fat + ' g'}</p>
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
        </Modal>
    );
}

export default MealModal;