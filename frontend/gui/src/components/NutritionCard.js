import React from 'react';

import { Collapse } from 'antd';
import { Pie, defaults } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const pieOptions = {
    plugins: {
        datalabels: {
            formatter: (value, context) => {
                return (value === 0) ? '' : ['C', 'P', 'F'][context.dataIndex];
            },
            color: 'white',
            font: {
                family: 'Camphor',
                size: 16
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

defaults.global.legend.display = false;

const { Panel } = Collapse;
const mainTextColor = '#32323c';

const NutritionCard = (props) => {
    return (
        <div className={['nutritionCard', 'nutritionShadow'].join(' ')}>
            <Collapse expandIconPosition='right' onChange={() => console.log('open nutrition')}>
                <Panel header={'Calories: ' + props.calories} key="1">
                    <div className='nutritionCardBody'>
                        <div className='nutritionPieBody'>
                            <Pie
                                width={150}
                                height={150}
                                data={{
                                    labels: ['Carbs', 'Protein', 'Fat'],
                                    datasets:
                                        [{
                                            ...pieColors,
                                            // data: [Math.round(props.carbs * 100 / (props.carbs + props.protein + props.fat * (9 / 4))),
                                            // Math.round(props.protein * 100 / (props.carbs + props.protein + props.fat * (9 / 4))),
                                            // Math.round((props.fat * (9 / 4) * 100) / (props.carbs + props.protein + props.fat * (9 / 4)))]
                                            data: [33, 33, 33]
                                        }]
                                }}
                                options={pieOptions}
                            />
                        </div>
                        <div className='nutritionFacts'>
                            <span>{'Calories: '}
                                <span style={{ float: 'right' }}>{props.calories}</span>
                            </span>
                            <div className='space6' />
                            <div style={{ width: '25px', borderBottom: '2px solid #a0a0a0' }} />
                            <div className='space8' />
                            <span> {'Carbs: '}
                                <span style={{ float: 'right' }}>{props.carbs}{'g'}</span>
                            </span>
                            <div className='space6' />
                            <span> {'Protein: '}
                                <span style={{ float: 'right' }}>{props.protein}{'g'}</span>
                            </span>
                            <div className='space6' />
                            <span> {'Fat: '}
                                <span style={{ float: 'right' }}>{props.fat}{'g'}</span>
                            </span>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div >

    )
}

export default NutritionCard;

{/* <div className='pieDiv' style={{ width: '240px', height: '300px', textAlign: 'center' }}>
                        <b style={{ fontSize: '22px', fontFamily: 'Camphor', fontWeight: '300', color: mainTextColor }}>
                            Macro Breakdown
                        </b>
                        <p />
                        <Pie
                            width={240}
                            height={240}
                            data={{
                                labels: ['Carbs', 'Protein', 'Fat'],
                                datasets:
                                    [{
                                        ...pieColors,
                                        data: enableMacros ?
                                            [Math.round(macros.carbs * 100 / (macros.carbs + macros.protein + macros.fat * (9 / 4))),
                                            Math.round(macros.protein * 100 / (macros.carbs + macros.protein + macros.fat * (9 / 4))),
                                            Math.round((macros.fat * (9 / 4) * 100) / (macros.carbs + macros.protein + macros.fat * (9 / 4)))]
                                            : [33, 33, 33]
                                    }]
                            }}
                            options={pieOptions}
                        />
                    </div> */}