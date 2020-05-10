import React from 'react';
import {
    Card, Skeleton, Space
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

    const regenMain = () => {
        props.regenMain(props.mealNum);
    }

    const regenSide = () => {
        props.regenSide(props.mealNum);
    }

    const pinMain = () => {
        props.pinMain(props.mealNum);
    }

    const pinSide = () => {
        props.pinSide(props.mealNum);
    }

    return (
        <>
            {props.numMeals >= props.mealNum &&
                <>
                    {props.mealNum !== 1 && <br />}
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
                        style={{ width: 360, height: 208 }} bordered={false} //head height: 58, body height: 150
                        headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                        <Skeleton avatar={false} title={false}
                            loading={!props.displayMeals && !props.mealObj.mainPinned && !props.mealObj.sidePinned}
                            active={props.mealObj.mainLoading || props.mealObj.sideLoading}
                            paragraph={{ rows: 3, width: [250] }} >
                            <div className='mealCard'>
                                <div className='mealCardMainRow'>
                                    <div className='mealCardIcons'>
                                        {/* show regen icon if the meal isn't pinned */}
                                        {!props.mealObj.mainPinned && (props.mealObj.mainLoading ?
                                            <SyncOutlined spin className='regenIcon' onClick={() => regenMain()} /> :
                                            <SyncOutlined className='regenIcon' onClick={() => regenMain()} />)}
                                        &nbsp;&nbsp;&nbsp;
                                        {props.mealObj.mainPinned ?
                                            <PushpinFilled className='pinIcon' onClick={() => pinMain()} /> :
                                            <PushpinOutlined className='pinIcon' onClick={() => pinMain()} />}
                                    </div>
                                    <div className='ant-card-meta-title'>
                                        {props.mealObj.meal.name}
                                    </div>
                                    <div className='space2' />
                                    <p className='ant-card-meta-description'>
                                        C: {props.mealObj.meal.carbs}
                                        , P: {props.mealObj.meal.protein}
                                        , F: {props.mealObj.meal.fat}
                                    </p>
                                </div>
                                {props.mealObj.side.name &&
                                    <div className='mealCardSideRow'>
                                        <div style={{ float: 'right', fontSize: '18px', color: '#606060' }}>
                                            {/* show regen icon if the meal isn't pinned */}
                                            {!props.mealObj.sidePinned && (props.mealObj.sideLoading ?
                                                <SyncOutlined spin className='regenIcon' onClick={() => regenSide()} /> :
                                                <SyncOutlined className='regenIcon' onClick={() => regenSide()} />)}
                                            &nbsp;&nbsp;&nbsp;
                                            {props.mealObj.sidePinned ?
                                                <PushpinFilled className='pinIcon' onClick={() => pinSide()} /> :
                                                <PushpinOutlined className='pinIcon' onClick={() => pinSide()} />}
                                        </div>

                                        <div className='ant-card-meta-title'>
                                            {props.mealObj.side.name}
                                        </div>
                                        <div className='space2' />
                                        <p className='ant-card-meta-description'>
                                            C: {props.mealObj.side.carbs}
                                            , P: {props.mealObj.side.protein}
                                            , F: {props.mealObj.side.fat}
                                        </p>
                                    </div>}
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