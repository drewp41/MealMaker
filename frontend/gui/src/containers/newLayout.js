// using hooks :(
import React, { useState, useEffect, useRef } from 'react';
import {
    Card, Slider, Select,
    Switch, Collapse, Avatar
} from 'antd';
import {
    SyncOutlined, PushpinOutlined, PushpinFilled
} from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import 'antd/dist/antd.css';
import './index.css';
import { Pie } from '@antv/g2plot';
import ReactG2Plot from 'react-g2plot';
import NumberFormat from 'react-number-format';
import MealCard from '../components/MealCard';
import Header from './Header';
import Footer from './Footer';

import groceries from '../FoodIcons/groceries.svg';

import {
    fetchMeals, fetchBreakfast, fetchRegular,
    fetchBreakfastMain, fetchBreakfastSide,
    fetchRegularMain, fetchRegularSide
} from './FoodGenerator.js';
import { SVG } from '@antv/g2plot/lib/dependents';

import './hamb/hamburgers.scss';

const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;

const mainTextColor = '#32323c';

const emptyMeal = {
    name: '', calories: 0, carbs: 0,
    protein: 0, fat: 0, ingredients: [],
    instructions: [], servings: 0
}
const emptyObj = {
    main: emptyMeal,
    side: emptyMeal,
    mainLoading: false,
    sideLoading: false,
    mainPinned: false,
    sidePinned: false,
}


const pieConfig = {
    width: 325,
    height: 325,
    //forceFit: true,
    pixelRatio: 4,
    renderer: 'canvas',
    title: {
        visible: false,
        text: '            Macro Breakdown',
        //position: 'middle',
        style: {
            fontSize: 22,
            fontFamily: 'Camphor',
            fontWeight: 300,
            fill: mainTextColor,
        },
    },
    description: {
        visible: false,
    },
    radius: 1,
    colorField: 'type',
    color: ['#5B8FF9', '#E15554', '#3BB273'], //#3BB273, #7768AE
    data: [
        {
            type: 'Carbohydrates',
            value: 33,
        },
        {
            type: 'Protein',
            value: 33,
        },
        {
            type: 'Fat',
            value: 33,
        },
    ],
    angleField: 'value',
    label: {
        visible: true,
        type: 'inner',
        formatter: (val) => {
            return val + '%';
        },
        style: {
            fontFamily: 'Camphor',
            fill: '#fcfcfc',
            lineWidth: 0,
        },
    },
    legend: {
        visible: true,
        position: 'bottom-center',
        offsetY: -5
    },
}

function useAsyncState(initialValue) {
    const [value, setValue] = useState(initialValue);
    const setter = x =>
        new Promise(resolve => {
            setValue(x);
            resolve(x);
        });
    return [value, setter];
}

function NewLayout(props) {

    const [calories, setCalories] = useState(2000);
    const [macros, setMacros] = useState({ carbs: 225, protein: 150, fat: 55 });
    const [numMeals, setNumMeals] = useState(3);

    const [enableMacros, setEnableMacros] = useState(false);
    const [loadingMeals, setLoadingMeals] = useState(false); // used for gen button
    const [displayMeals, setDisplayMeals] = useState(false);
    const [changedPrefs, setChangedPrefs] = useState(true);
    const [macroPinned, setMacroPinned] = useState(null);

    const [breakfastIter, setBreakfastIter] = useAsyncState(null);
    const breakfastRef = useRef(breakfastIter);
    breakfastRef.current = breakfastIter;
    const [breakfastSideIter, setBreakfastSideIter] = useAsyncState(null);
    const breakfastSideRef = useRef(breakfastSideIter);
    breakfastSideRef.current = breakfastSideIter;
    const [regularIter, setRegularIter] = useAsyncState(null);
    const regularRef = useRef(regularIter);
    regularRef.current = regularIter;
    const [regularSideIter, setRegularSideIter] = useAsyncState(null);
    const regularSideRef = useRef(regularSideIter);
    regularSideRef.current = regularSideIter;

    const [meal1, setMeal1] = useState(emptyObj);
    const [meal2, setMeal2] = useState(emptyObj);
    const [meal3, setMeal3] = useState(emptyObj);
    const [meal4, setMeal4] = useState(emptyObj);
    const [meal5, setMeal5] = useState(emptyObj);
    const [meal6, setMeal6] = useState(emptyObj);

    const macroSwitch = () => {
        setEnableMacros(prev => !prev);
        setChangedPrefs(true);
    }

    const pinMacro = (num) => {
        // set the pin to whichever macro is calling it, remove the pin if it already exists
        setMacroPinned(prev => prev === num ? null : num);
    }

    const carbSlider = (percent) => {
        let newCarbs = Math.floor((percent * calories) / 400);
        let diff = newCarbs - macros.carbs;
        // if one of the other macros are zero and youre trying to increase carbs even more
        if (diff > 0 && ((macros.protein <= (calories * 0.1) / 4) ||
            (macros.fat <= (calories * 0.1) / 9))) {
            return;
        }
        // if one of the other macros are at 80% and youre trying to reduce carbs even more
        if (diff < 0 && ((macros.protein >= (calories * 0.8) / 4) ||
            (macros.fat >= (calories * 0.8) / 9))) {
            return;
        }
        if (macroPinned === null) {
            setMacros(prev => ({
                carbs: newCarbs,
                protein: prev.protein - (diff * 0.5),
                fat: prev.fat - (diff * 0.5 * (4 / 9)),
            }));
            setChangedPrefs(true);
        }
        else if (macroPinned === 1)
            return;
        else if (macroPinned === 2) {
            setMacros(prev => ({
                ...prev,
                carbs: newCarbs,
                fat: prev.fat - (diff * (4 / 9)),
            }));
            setChangedPrefs(true);
        }
        else if (macroPinned === 3) {
            setMacros(prev => ({
                ...prev,
                carbs: newCarbs,
                protein: prev.protein - diff,
            }));
            setChangedPrefs(true);
        }
    }

    const proteinSlider = (percent) => {
        let newProtein = Math.floor((percent * calories) / 400);
        let diff = newProtein - macros.protein;
        if (diff > 0 && ((macros.carbs <= (calories * 0.1) / 4) ||
            (macros.fat <= (calories * 0.1) / 9))) {
            return;
        }
        if (diff < 0 && ((macros.carbs >= (calories * 0.8) / 4) ||
            (macros.fat >= (calories * 0.8) / 9))) {
            return;
        }

        if (macroPinned === null) {
            setMacros(prev => ({
                protein: newProtein,
                carbs: prev.carbs - (diff * 0.5),
                fat: prev.fat - (diff * 0.5 * (4 / 9)),
            }));
            setChangedPrefs(true);
        }
        else if (macroPinned === 1) {
            setMacros(prev => ({
                ...prev,
                protein: newProtein,
                fat: prev.fat - (diff * (4 / 9)),
            }));
            setChangedPrefs(true);
        }
        else if (macroPinned === 2)
            return;
        else if (macroPinned === 3) {
            setMacros(prev => ({
                ...prev,
                protein: newProtein,
                carbs: prev.carbs - diff,
            }));
            setChangedPrefs(true);
        }
    }

    const fatSlider = (percent) => {
        let newFat = Math.floor((percent * calories) / 900);
        let diff = newFat - macros.fat;
        if (diff > 0 && ((macros.carbs <= (calories * 0.1) / 4) ||
            (macros.protein <= (calories * 0.1) / 4))) {
            return;
        }
        if (diff < 0 && ((macros.carbs >= (calories * 0.8) / 4) ||
            (macros.protein >= (calories * 0.8) / 4))) {
            return;
        }
        if (macroPinned === null) {
            setMacros(prev => ({
                fat: newFat,
                carbs: prev.carbs - (diff * 0.5 * (9 / 5)),
                protein: prev.protein - (diff * 0.5 * (9 / 5)),
            }));
            setChangedPrefs(true);
        }
        else if (macroPinned === 1) {
            setMacros(prev => ({
                ...prev,
                fat: newFat,
                protein: prev.protein - (diff * (9 / 5)),
            }));
            setChangedPrefs(true);
        }
        else if (macroPinned === 2) {
            setMacros(prev => ({
                ...prev,
                fat: newFat,
                carbs: prev.carbs - (diff * (9 / 5)),
            }));
            setChangedPrefs(true);
        }
        else if (macroPinned === 3) {
            return;
        }
    }

    const regenMain = (num) => {
        const mealVar = 'meal' + num.toString();
        const setMealVar = 'setMeal' + num.toString();
        // if it's already loading a meal, return (prevents spam clicking)
        if (eval(mealVar).mainLoading) {
            return;
        }
        eval(setMealVar)(prev => ({
            ...prev,
            mainLoading: true,
        }));

        updateMain(num);

        setTimeout(() => {
            eval(setMealVar)(prev => ({
                ...prev,
                // if it's still looking for the meal (aka the name didnt change), keep the loading icon
                // works bc of stale closures
                mainLoading: prev.main.name === eval(mealVar).main.name ? true : false,
            }));
        }, 500);
    }

    const regenSide = (num) => {
        const mealVar = 'meal' + num.toString();
        const setMealVar = 'setMeal' + num.toString();
        // if it's already loading a meal, return (prevents spam clicking)
        if (eval(mealVar).sideLoading) {
            return;
        }
        eval(setMealVar)(prev => ({
            ...prev,
            sideLoading: true,
        }));

        updateSide(num);

        setTimeout(() => {
            eval(setMealVar)(prev => ({
                ...prev,
                // if it's still looking for the meal (aka the name didnt change), keep the loading icon
                // works bc of stale closures
                sideLoading: prev.side.name === eval(mealVar).side.name ? true : false,
            }));
        }, 500);
    }

    const pinMain = (num) => {
        const setMealVar = 'setMeal' + num.toString();

        eval(setMealVar)(prev => ({
            ...prev,
            mainPinned: !prev.mainPinned,
        }));
    }

    const pinSide = (num) => {
        const setMealVar = 'setMeal' + num.toString();

        eval(setMealVar)(prev => ({
            ...prev,
            sidePinned: !prev.sidePinned,
        }));
    }

    const updateMeal = (num) => {
        const setMealVar = 'setMeal' + num.toString();

        // IF BREAKFAST
        if (num == 1) {
            // iterator returns {value, done}
            const mealObj = breakfastRef.current.next();
            const sideObj = breakfastSideRef.current.next();
            if (!mealObj.done) { // mealObj and sideObj are on the same "index", so if one is done, the other is too
                eval(setMealVar)(prev => ({
                    ...prev,
                    main: mealObj.value,
                    side: sideObj.value,
                }));
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (enableMacros) {
                    carbVar = Math.floor(macros.carbs);
                    proteinVar = Math.floor(macros.protein);
                    fatVar = Math.floor(macros.fat);
                }
                fetchBreakfast(calories, numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        setBreakfastIter(res[0][Symbol.iterator]()).then(a => {
                            setBreakfastSideIter(res[1][Symbol.iterator]()).then(b => {
                                // now that the iters are loaded, set the meal with the new data
                                eval(setMealVar)(prev => ({
                                    ...prev,
                                    main: res[0][0],
                                    side: res[1][0],
                                    mainLoading: false,
                                    sideLoading: false,
                                }));
                                // and now increment the iterators since we just used the first entry
                                breakfastRef.current.next();
                                breakfastSideRef.current.next();
                            })
                        })
                    });
            }
        }
        // IF NOT BREAKFAST
        else {
            // iterator returns {value, done}
            const mealObj = regularRef.current.next();
            const sideObj = regularSideRef.current.next();
            if (!mealObj.done) { // mealObj and sideObj are on the same "index", so if one is done, the other is too
                eval(setMealVar)(prev => ({
                    ...prev,
                    main: mealObj.value,
                    side: sideObj.value
                }));
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (enableMacros) {
                    carbVar = Math.floor(macros.carbs);
                    proteinVar = Math.floor(macros.protein);
                    fatVar = Math.floor(macros.fat);
                }
                fetchRegular(calories, numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        setRegularIter(res[0][Symbol.iterator]());
                        setRegularSideIter(res[1][Symbol.iterator]());
                        // now that the iters are loaded, set the meal with the new data
                        eval(setMealVar)(prev => ({
                            ...prev,
                            main: res[0][0],
                            side: res[1][0],
                            mainLoading: false,
                            sideLoading: false,
                        }));
                        // and now increment the iterators since we just used the first entry
                        regularRef.current.next();
                        regularSideRef.current.next();
                    });
            }
        }
    }

    const updateMain = async (num) => {
        const setMealVar = 'setMeal' + num.toString();

        // IF BREAKFAST
        if (num === 1) {
            // iterator returns {value, done}
            const mealObj = breakfastRef.current.next();
            if (!mealObj.done) { // mealObj and sideObj are on the same "index", so if one is done, the other is too
                eval(setMealVar)(prev => ({
                    ...prev,
                    main: mealObj.value,
                }));
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (enableMacros) {
                    carbVar = Math.floor(macros.carbs);
                    proteinVar = Math.floor(macros.protein);
                    fatVar = Math.floor(macros.fat);
                }
                fetchBreakfastMain(calories, numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        setBreakfastIter(res[0][Symbol.iterator]()).then(a => {
                            // now that the iter is loaded, set the meal with the new data
                            eval(setMealVar)(prev => ({
                                ...prev,
                                main: res[0][0],
                                mainLoading: false,
                            }));
                            // and now increment the iterator since we just used the first entry
                            breakfastRef.current.next();
                        })
                    });
            }
        }
        // IF NOT BREAKFAST
        else {
            // iterator returns {value, done}
            const mealObj = regularRef.current.next();
            if (!mealObj.done) { // mealObj and sideObj are on the same "index", so if one is done, the other is too
                eval(setMealVar)(prev => ({
                    ...prev,
                    main: mealObj.value,
                }));
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (enableMacros) {
                    carbVar = Math.floor(macros.carbs);
                    proteinVar = Math.floor(macros.protein);
                    fatVar = Math.floor(macros.fat);
                }
                await fetchRegularMain(calories, numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        setRegularIter(res[0][Symbol.iterator]()).then(a => {
                            // now that the iter is loaded, set the meal with the new data
                            eval(setMealVar)(prev => ({
                                ...prev,
                                main: res[0][0],
                                mainLoading: false,
                            }));
                            // and now increment the iterator since we just used the first entry
                            regularRef.current.next();
                        })
                    });
            }
        }
    }

    const updateSide = async (num) => {
        const setMealVar = 'setMeal' + num.toString();

        // IF BREAKFAST
        if (num === 1) {
            // iterator returns {value, done}
            const sideObj = breakfastSideRef.current.next();
            if (!sideObj.done) { // mealObj and sideObj are on the same "index", so if one is done, the other is too
                eval(setMealVar)(prev => ({
                    ...prev,
                    side: sideObj.value,
                }));
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (enableMacros) {
                    carbVar = Math.floor(macros.carbs);
                    proteinVar = Math.floor(macros.protein);
                    fatVar = Math.floor(macros.fat);
                }
                fetchBreakfastSide(calories, numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        setBreakfastSideIter(res[0][Symbol.iterator]()).then(b => {
                            // now that the iters are loaded, set the meal with the new data
                            eval(setMealVar)(prev => ({
                                ...prev,
                                side: res[0][0],
                                sideLoading: false,
                            }));
                            // and now increment the iterator since we just used the first entry
                            breakfastSideRef.current.next();
                        })
                    });
            }
        }
        // IF NOT BREAKFAST
        else {
            // iterator returns {value, done}
            const sideObj = regularSideRef.current.next();
            if (!sideObj.done) { // mealObj and sideObj are on the same "index", so if one is done, the other is too
                eval(setMealVar)(prev => ({
                    ...prev,
                    side: sideObj.value
                }));
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (enableMacros) {
                    carbVar = Math.floor(macros.carbs);
                    proteinVar = Math.floor(macros.protein);
                    fatVar = Math.floor(macros.fat);
                }
                await fetchRegularSide(calories, numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        setRegularSideIter(res[0][Symbol.iterator]()).then(a => {
                            // now that the iter is loaded, set the meal with the new data
                            eval(setMealVar)(prev => ({
                                ...prev,
                                side: res[0][0],
                                sideLoading: false,
                            }));
                            // and now increment the iterator since we just used the first entry
                            regularSideRef.current.next();
                        })
                    });
            }
        }
    }

    const onClickGenerateButton = async () => {
        // if it's already loading a meal, return (prevents spam clicking)
        if (loadingMeals)
            return;

        // set the unpinned meals to loading
        for (let i = 1; i <= numMeals; i++) {
            eval(`setMeal${i}`)(prev => ({
                ...prev,
                mainLoading: !prev.mainPinned,
                sideLoading: !prev.sidePinned,
            }));
        }

        setDisplayMeals(false);
        setLoadingMeals(true);

        if (changedPrefs) {
            // get the meal data with the given preferences
            // and once that data is recieved (.then), update the state
            let carbVar = 0;
            let proteinVar = 0;
            let fatVar = 0;
            if (enableMacros) {
                carbVar = Math.floor(macros.carbs);
                proteinVar = Math.floor(macros.protein);
                fatVar = Math.floor(macros.fat);
            }
            fetchMeals(calories, numMeals,
                carbVar, proteinVar, fatVar)
                .then(res => {
                    console.log(`Getting all meals: ${calories}, ${numMeals}, ${carbVar}, ${proteinVar}, ${fatVar}`);
                    console.log(res);
                    setBreakfastIter(res[0][Symbol.iterator]()).then(a =>
                        setBreakfastSideIter(res[1][Symbol.iterator]()).then(b =>
                            setRegularIter(res[2][Symbol.iterator]()).then(c =>
                                setRegularSideIter(res[3][Symbol.iterator]()).then(d => {
                                    // now that the iters are set, update all the meals that aren't pinned
                                    for (let i = 1; i <= numMeals; i++) {
                                        if (!eval(`meal${i}`).mainPinned) {
                                            updateMain(i);
                                        }
                                        if (!eval(`meal${i}`).sidePinned) {
                                            updateSide(i);
                                        }
                                    }

                                    // turn the loading off
                                    for (let i = 1; i <= numMeals; i++) {
                                        eval(`setMeal${i}`)(prev => ({
                                            ...prev,
                                            mainLoading: false,
                                            sideLoading: false
                                        }));
                                    }
                                    setDisplayMeals(true);
                                    setLoadingMeals(false);
                                    setChangedPrefs(false);
                                }))));
                });
        } else {
            // preferences haven't changed, use cached meals
            for (let i = 1; i <= numMeals; i++) {
                if (!eval(`meal${i}`).mainPinned) {
                    await updateMain(i);
                }
                if (!eval(`meal${i}`).sidePinned) {
                    await updateSide(i);
                }
            }
            // spin the loading icon for half a second so it does half a rotation
            setTimeout(() => {
                for (let i = 1; i <= numMeals; i++) {
                    // if it's still looking for the meal (aka the name didnt change), keep the loading icon
                    // must also check if it's pinned or obviously the names will be the same
                    // works bc of stale closures
                    eval(`setMeal${i}`)(prev => ({
                        ...prev,
                        mainLoading: !prev.mainPinned && prev.main.name === eval(`meal${i}`).main.name ? true : false,
                        sideLoading: !prev.sidePinned && prev.side.name === eval(`meal${i}`).side.name ? true : false,
                    }));
                }
                setDisplayMeals(true);
                setLoadingMeals(false);
            }, 500);
        }
    };

    return (
        //  242, 242, 242
        <div style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
            {/* <div style={{ backgroundColor: 'rgb(245, 243, 240)' }}> */}
            <div id="topLine"></div>

            <Header />

            <div style={{ margin: '55px 0 55px 0', textAlign: 'center' }}>
                <b id="captionText">Create a customized meal plan in seconds.</b>
            </div>

            <div className="mainBodyRow" style={{ minHeight: 680 }}>
                <div className="leftColumn">
                    <div className="inputArea" >
                        <span className="leftColumnText">I want to eat &nbsp;
                                    <NumberFormat className='ant-input' id='calorieInput' style={{ width: '126px' }} suffix={' calories'}
                                defaultValue={2000} allowEmptyFormatting={true}
                                onValueChange={(value) => {
                                    setCalories(Math.floor(value.floatValue));
                                    setChangedPrefs(true);
                                }}
                            />
                        </span>
                        <div className='space20' />
                        <span className="leftColumnText"> in &nbsp;
                            <Select className="mealInput" defaultValue="3" style={{ width: '126px' }}
                                onChange={(value) => {
                                    setNumMeals(parseInt(value));
                                    setChangedPrefs(true);
                                }}>
                                <Option className='camphorFont' value="1" style={{ fontSize: '15px' }}>1 meal</Option>
                                <Option className='camphorFont' value="2" style={{ fontSize: '15px' }}>2 meals</Option>
                                <Option className='camphorFont' value="3" style={{ fontSize: '15px' }}>3 meals</Option>
                                <Option className='camphorFont' value="4" style={{ fontSize: '15px' }}>4 meals</Option>
                                <Option className='camphorFont' value="5" style={{ fontSize: '15px' }}>5 meals</Option>
                                <Option className='camphorFont' value="6" style={{ fontSize: '15px' }}>6 meals</Option>
                            </Select>
                        </span>
                        <div className='space20' />

                        <Collapse bordered={true} expandIconPosition='right' activeKey={enableMacros ? 1 : 0}
                            style={{ marginLeft: 'auto', width: '257px' }}>
                            <Panel header={<b id="macroSwitchText">Macro Preferences&nbsp;&nbsp;</b>} showArrow={true} key="1"
                                extra={<Switch defaultChecked={false} onChange={macroSwitch} style={{ margin: '3px 0 0 0' }} />} >
                                {/* Carbs */}
                                <span className='mealInput' style={{ float: 'left' }}>
                                    Carbs &nbsp;
                                            {macroPinned === null ?
                                        <PushpinOutlined className='macroPin' onClick={() => pinMacro(1)} /> :
                                        (macroPinned === 1 ?
                                            <PushpinFilled className='macroPin' onClick={() => pinMacro(1)} /> :
                                            null)
                                    }
                                </span>
                                <span className='mealInput' style={{ float: 'right' }}>
                                    {Math.floor(macros.carbs)} g
                                        </span>
                                <br />
                                <Slider defaultValue={45} tipFormatter={val => `${val}%`} min={10} max={80}
                                    value={Math.floor((macros.carbs * 4) / (calories / 100))}
                                    disabled={macroPinned === 1}
                                    onChange={(percent) => carbSlider(percent)}
                                />
                                {/* Protein */}
                                <span className='mealInput' style={{ float: 'left' }}>
                                    Protein &nbsp;
                                            {macroPinned === null ?
                                        <PushpinOutlined className='macroPin' onClick={() => pinMacro(2)} /> :
                                        (macroPinned === 2 ?
                                            <PushpinFilled className='macroPin' onClick={() => pinMacro(2)} /> :
                                            null)
                                    }
                                </span>
                                <span className='mealInput' style={{ float: 'right' }}>
                                    {Math.floor(macros.protein)} g
                                        </span>
                                <br />
                                <Slider defaultValue={30} tipFormatter={val => `${val}%`} min={10} max={80}
                                    value={Math.floor((macros.protein * 4) / (calories / 100))}
                                    disabled={macroPinned === 2}
                                    onChange={(percent) => proteinSlider(percent)}
                                />
                                {/* Fat */}
                                <span className='mealInput' style={{ float: 'left' }}>
                                    Fat &nbsp;
                                            {macroPinned === null ?
                                        <PushpinOutlined className='macroPin' onClick={() => pinMacro(3)} /> :
                                        (macroPinned === 3 ?
                                            <PushpinFilled className='macroPin' onClick={() => pinMacro(3)} /> :
                                            null)
                                    }
                                </span>
                                <span className='mealInput' style={{ float: 'right' }}>
                                    {Math.floor(macros.fat)} g
                                        </span>
                                <br />
                                <Slider defaultValue={25} tipFormatter={val => `${val}%`} min={10} max={80}
                                    value={Math.floor((macros.fat * 9) / (calories / 100))}
                                    disabled={macroPinned === 3}
                                    onChange={(percent) => fatSlider(percent)}
                                />
                            </Panel>
                        </Collapse>

                        <br />

                        {/* GENERATE BUTTON */}
                        <a className='genButton' onClick={onClickGenerateButton} style={{ color: 'white' }}>
                            {loadingMeals ? <SyncOutlined spin /> : <SyncOutlined />}&nbsp; GENERATE
                                </a>
                    </div>

                    <br />
                    <br />
                    <br />

                    <b className='pieTitle' style={{ fontSize: '22px', fontFamily: 'Camphor', fontWeight: '300', color: mainTextColor }}>
                        Macro Breakdown
                    </b>
                    <div className='pieDiv' style={{ width: '325px', height: '325px' }}>
                        <ReactG2Plot
                            className="pie"
                            Ctor={Pie}
                            config={pieConfig} />
                    </div>

                </div>


                <div style={{ borderLeft: '2px solid #e0e0e0' }} />

                <div className="rightColumn">

                    <MealCard mealNum={1} mealObj={meal1} numMeals={numMeals}
                        displayMeals={displayMeals}
                        regenMain={regenMain} regenSide={regenSide}
                        pinMain={pinMain} pinSide={pinSide} />

                    <MealCard mealNum={2} mealObj={meal2} numMeals={numMeals}
                        displayMeals={displayMeals}
                        regenMain={regenMain} regenSide={regenSide}
                        pinMain={pinMain} pinSide={pinSide} />

                    <MealCard mealNum={3} mealObj={meal3} numMeals={numMeals}
                        displayMeals={displayMeals}
                        regenMain={regenMain} regenSide={regenSide}
                        pinMain={pinMain} pinSide={pinSide} />

                    <MealCard mealNum={4} mealObj={meal4} numMeals={numMeals}
                        displayMeals={displayMeals}
                        regenMain={regenMain} regenSide={regenSide}
                        pinMain={pinMain} pinSide={pinSide} />

                    <MealCard mealNum={5} mealObj={meal5} numMeals={numMeals}
                        displayMeals={displayMeals}
                        regenMain={regenMain} regenSide={regenSide}
                        pinMain={pinMain} pinSide={pinSide} />

                    <MealCard mealNum={6} mealObj={meal6} numMeals={numMeals}
                        displayMeals={displayMeals}
                        regenMain={regenMain} regenSide={regenSide}
                        pinMain={pinMain} pinSide={pinSide} />
                </div>
            </div >

            <div style={{ minHeight: 200 }} />

            <Footer />

        </div >
    )
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(NewLayout));


