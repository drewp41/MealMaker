import React from 'react';
import {
    Card, Skeleton
} from 'antd';
import {
    SyncOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

const mainTextColor = '#32323c';


function MealCardTitle(props) {
    return <>
        Breakfast &nbsp;&nbsp;
        <span style={{ color: '#606060' }}>
            <SyncOutlined className='regenIcon' />
            &nbsp;&nbsp;&nbsp;
            <PushpinOutlined className='pinIcon' />
        </span>
    </>;
}

function MealCard(props) {

    const regenMeal = () => {
        props.regenMeal(props.mealNum);
    }

    const pinMeal = () => {
        props.pinMeal(props.mealNum);
    }

    return (
        <>
            {props.numMeals >= props.mealNum &&
                <>
                    {props.mealNum != 1 && <br />}
                    <Card className='cardShadow2'
                        title={
                            props.mealNum === 1 ? (
                                props.numMeals === 1 ? 'Feast'
                                    : (props.numMeals === 2 ? 'Brunch'
                                        : 'Breakfast'))
                                : props.mealNum === 2 ? (
                                    props.numMeals === 2 ? 'Dinner'
                                        : 'Lunch')
                                    : props.mealNum === 3 ? 'Dinner'
                                        : 'Snack'
                        }
                        extra={props.mealObj.meal.calories + props.mealObj.side.calories + ' calories'}
                        style={{ width: 350, height: 200 }} bordered={false}
                        headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                        <Skeleton avatar={false} loading={!props.displayMeals && !props.mealObj.pinned} title={false}
                            active={props.loadingMeals}
                            paragraph={{ rows: 3, width: [250] }} >
                            <div className='mealCard' style={{ margin: '-10px 0 0 0' }}>
                                <div style={{ float: 'right', fontSize: '18px', color: '#606060' }}>
                                    {props.mealObj.loading ?
                                        <SyncOutlined spin className='regenIcon' onClick={() => regenMeal(1)} /> :
                                        <SyncOutlined className='regenIcon' onClick={() => regenMeal(1)} />}
                                    &nbsp;&nbsp;&nbsp;
                                    {props.mealObj.pinned ?
                                        <PushpinFilled className='pinIcon' onClick={() => pinMeal(1)} /> :
                                        <PushpinOutlined className='pinIcon' onClick={() => pinMeal(1)} />}
                                </div>
                                <div className='ant-card-meta-title' style={{ margin: '0 0 5px 0' }}>
                                    {props.mealObj.meal.name}
                                </div>
                                <p className='ant-card-meta-description'>
                                    C: {props.mealObj.meal.carbs}
                                    , P: {props.mealObj.meal.protein}
                                    , F: {props.mealObj.meal.fat}
                                </p>
                                {props.mealObj.side.name && <>
                                    <div className='ant-card-meta-title' style={{ margin: '-8px 0 5px 0' }}>
                                        {props.mealObj.side.name}
                                    </div>
                                    <p className='ant-card-meta-description'>
                                        C: {props.mealObj.side.carbs}
                                        , P: {props.mealObj.side.protein}
                                        , F: {props.mealObj.side.fat}
                                    </p>
                                </>}
                            </div>
                        </Skeleton>
                    </Card >
                </>
            }
        </>
    );

}

export default MealCard;

    // setTitle() {
    //     if (this.props.mealNum === 1) {
    //         if (this.props.numMeals === 1)
    //             'Feast';
    //         else if (this.props.numMeals === 2)
    //             'Brunch';
    //         else
    //             'Breakfast';
    //     } else if (this.props.mealNum === 2) {
    //         if (this.props.numMeals === 2)
    //             'Dinner';
    //         else
    //             'Lunch';
    //     } else if (this.props.mealNum === 3) {
    //         'Dinner';
    //     } else
    //         'Snack';
    // }