import React, { useState } from 'react';
import {
    Card, Skeleton
} from 'antd';
import {
    SyncOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

import MealModal from './MealModal';

const mainTextColor = '#32323c';

// meal consists of: 
//     name: '', calories: 0, carbs: 0,
//     protein: 0, fat: 0, ingredients: [],
//     instructions: [], servings: 0, makes: 0,
//     prepTime: 0, cookTime: 0

// mealObj consists of:
//      main: emptyMeal,
//      side: emptyMeal,
//      mainLoading: false,
//      sideLoading: false,
//      mainPinned: false,
//      sidePinned: false,

// didn't use yet
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

const MealCard = (props) => {

    const [showMainModal, setShowMainModal] = useState(false);
    const [showSideModal, setShowSideModal] = useState(false);

    function closeMainModal() {
        setShowMainModal(false);
    }

    function closeSideModal() {
        setShowSideModal(false);
    }

    function regenMain(e) {
        // prevents the meal modal from opening when clicking an icon
        e.stopPropagation();
        props.regenMain(props.mealNum);
    }

    function regenSide(e) {
        e.stopPropagation();
        props.regenSide(props.mealNum);
    }

    function pinMain(e) {
        e.stopPropagation();
        props.pinMain(props.mealNum);
    }

    function pinSide(e) {
        e.stopPropagation();
        props.pinSide(props.mealNum);
    }

    return (
        <>
            {props.numMeals >= props.mealNum &&
                <>
                    {props.mealNum !== 1 && <br />}
                    <MealModal visible={showMainModal} meal={props.mealObj.main} closeModal={closeMainModal} />
                    <MealModal visible={showSideModal} meal={props.mealObj.side} closeModal={closeSideModal} />
                    <Card className={['mealCard', 'cardShadow2'].join(' ')}
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
                        extra={props.mealObj.main.calories + props.mealObj.side.calories + ' calories'}
                        bordered={false}
                        headStyle={{ fontFamily: 'Camphor', fontWeight: 500, color: mainTextColor }}>
                        <Skeleton avatar={false} title={false}
                            loading={!props.displayMeals && !props.mealObj.mainPinned && !props.mealObj.sidePinned}
                            active={props.mealObj.mainLoading || props.mealObj.sideLoading}
                            paragraph={{ rows: 3, width: [250] }} >
                            <div className='mealCardBody'>
                                <div className='mealCardMainRow' onClick={() => setShowMainModal(true)}>
                                    <div className='mealCardIcons'>
                                        {/* show regen icon if the meal isn't pinned */}
                                        {!props.mealObj.mainPinned && (props.mealObj.mainLoading ?
                                            <SyncOutlined spin className='regenIcon' onClick={(e) => regenMain(e)} /> :
                                            <SyncOutlined className='regenIcon' onClick={(e) => regenMain(e)} />)}
                                        &nbsp;&nbsp;&nbsp;
                                        {props.mealObj.mainPinned ?
                                            <PushpinFilled className='pinIcon' onClick={(e) => pinMain(e)} /> :
                                            <PushpinOutlined className='pinIcon' onClick={(e) => pinMain(e)} />}
                                    </div>
                                    <div className='ant-card-meta-title'>
                                        {props.mealObj.main.name}
                                    </div>
                                    <div className='space2' />
                                    <p className='ant-card-meta-description'>
                                        {props.mealObj.main.servings}
                                        {props.mealObj.main.servings === 1 ? ' serving' : ' servings'}
                                    </p>
                                </div>
                                {props.mealObj.side.name &&
                                    <div className='mealCardSideRow' onClick={() => setShowSideModal(true)}>
                                        <div className='mealCardIcons'>
                                            {/* show regen icon if the meal isn't pinned */}
                                            {!props.mealObj.sidePinned && (props.mealObj.sideLoading ?
                                                <SyncOutlined spin className='regenIcon' onClick={(e) => regenSide(e)} /> :
                                                <SyncOutlined className='regenIcon' onClick={(e) => regenSide(e)} />)}
                                            &nbsp;&nbsp;&nbsp;
                                            {props.mealObj.sidePinned ?
                                                <PushpinFilled className='pinIcon' onClick={(e) => pinSide(e)} /> :
                                                <PushpinOutlined className='pinIcon' onClick={(e) => pinSide(e)} />}
                                        </div>

                                        <div className='ant-card-meta-title'>
                                            {props.mealObj.side.name}
                                        </div>
                                        <div className='space2' />
                                        <p className='ant-card-meta-description'>
                                            {props.mealObj.side.servings}
                                            {props.mealObj.side.servings === 1 ? ' serving' : ' servings'}
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