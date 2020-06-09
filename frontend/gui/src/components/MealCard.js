import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
    Card, Skeleton, message
} from 'antd';
import {
    SyncOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';
import TextTransition, { presets } from "react-text-transition";

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

    // the text transition component won't allow for text-overflow: ellipisis
    function ellipsis(str) {
        if (str.length > 39)
            return str.substring(0, 39) + '...';
        else
            return str;
    }

    return (
        <>
            {props.numMeals >= props.mealNum &&
                <>
                    {props.mealNum !== 1 && <br />}
                    <MealModal visible={showMainModal} meal={props.mealObj.main} closeModal={closeMainModal}
                        regen={regenMain} pin={pinMain} pinned={props.mealObj.mainPinned} useIcons={true}
                        loading={props.mealObj.mainLoading} isAuthenticated={props.isAuthenticated} username={props.username} />
                    <MealModal visible={showSideModal} meal={props.mealObj.side} closeModal={closeSideModal}
                        regen={regenSide} pin={pinSide} pinned={props.mealObj.sidePinned} useIcons={true}
                        loading={props.mealObj.sideLoading} isAuthenticated={props.isAuthenticated} username={props.username} />
                    <Card className={['mealCard', 'cardShadow2',
                        (!props.displayMeals && !props.mealObj.mainPinned && !props.mealObj.sidePinned) ? 'mealCardSkeletonPadding' : ''].join(' ')}
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
                        bordered={false}>
                        <Skeleton avatar={false} title={false}
                            loading={!props.displayMeals && !props.mealObj.mainPinned && !props.mealObj.sidePinned}
                            active={props.mealObj.mainLoading || props.mealObj.sideLoading}
                            paragraph={{ rows: 3, width: ['80%', '100%', '60%'] }} >
                            <div className='mealCardBody'>
                                <div className='mealCardRow'
                                    onClick={() => (props.mealObj.main.name !== 'Network Error :('
                                        && props.mealObj.main.name !== 'No meals found :(') ? setShowMainModal(true) : {}}>
                                    {props.mealObj.main.name !== 'Network Error :(' && props.mealObj.main.name !== 'No meals found :(' &&
                                        <div className='mealCardIcons'>
                                            {/* show regen icon if the meal isn't pinned */}
                                            {!props.mealObj.mainPinned ?
                                                (props.mealObj.mainLoading ?
                                                    <SyncOutlined spin className='regenIcon' onClick={(e) => regenMain(e)} /> :
                                                    <SyncOutlined className='regenIcon' onClick={(e) => regenMain(e)} />)
                                                : <SyncOutlined className='regenIcon' style={{ opacity: 0 }} />}
                                        &nbsp;&nbsp;&nbsp;
                                        {props.mealObj.mainPinned ?
                                                <PushpinFilled className='pinIcon' onClick={(e) => pinMain(e)} /> :
                                                <PushpinOutlined className='pinIcon' onClick={(e) => pinMain(e)} />}
                                        </div>
                                    }
                                    <TextTransition
                                        className='mealCardTitleText'
                                        text={props.mealObj.main.name}
                                    />
                                    <div className='space2' />
                                    {props.mealObj.main.name !== 'Network Error :(' &&
                                        (props.mealObj.main.name !== 'No meals found :(' ?
                                            <TextTransition
                                                className='mealCardServingText'
                                                text={props.mealObj.main.servings +
                                                    (props.mealObj.main.servings === 1 ? ' serving' : ' servings')}
                                            />
                                            :
                                            <div className='mealCardServingText'>
                                                Try again with different preferences
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='space4' />
                                {props.mealObj.side.name &&
                                    <div className='mealCardRow'
                                        onClick={() => (props.mealObj.side.name !== 'Network Error :('
                                            && props.mealObj.side.name !== 'No meals found :(') ? setShowSideModal(true) : {}}>
                                        {props.mealObj.side.name !== 'Network Error :(' && props.mealObj.side.name !== 'No meals found :(' &&
                                            <div className='mealCardIcons'>
                                                {/* show regen icon if the meal isn't pinned */}
                                                {!props.mealObj.sidePinned ?
                                                    (props.mealObj.sideLoading ?
                                                        <SyncOutlined spin className='regenIcon' onClick={(e) => regenSide(e)} /> :
                                                        <SyncOutlined className='regenIcon' onClick={(e) => regenSide(e)} />)
                                                    : <SyncOutlined className='regenIcon' style={{ opacity: 0 }} />}
                                            &nbsp;&nbsp;&nbsp;
                                            {props.mealObj.sidePinned ?
                                                    <PushpinFilled className='pinIcon' onClick={(e) => pinSide(e)} /> :
                                                    <PushpinOutlined className='pinIcon' onClick={(e) => pinSide(e)} />}
                                            </div>
                                        }
                                        <TextTransition
                                            className='mealCardTitleText'
                                            text={props.mealObj.side.name}
                                        />
                                        <div className='space2' />
                                        {props.mealObj.side.name !== 'Network Error :(' &&
                                            (props.mealObj.side.name !== 'No meals found :(' ?
                                                <TextTransition
                                                    className='mealCardServingText'
                                                    text={props.mealObj.side.servings +
                                                        (props.mealObj.side.servings === 1 ? ' serving' : ' servings')}
                                                />
                                                :
                                                <div className='mealCardServingText'>
                                                    Try again with different preferences
                                        </div>
                                            )
                                        }
                                    </div>
                                }
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