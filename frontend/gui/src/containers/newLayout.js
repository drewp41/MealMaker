import React from 'react';
import {
    Layout, Menu, Divider, Input, InputNumber,
    Skeleton, Card, Button, Dropdown, Slider,
    Select, Alert, Switch, Collapse, Avatar
} from 'antd';
import {
    SyncOutlined, GithubOutlined,
    LinkedinOutlined, MailOutlined, MenuOutlined,
    PushpinOutlined, PushpinFilled
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

import logo from '../MMM.png';
import recoloredLogo from '../recoloredMMM.png';
import otherLogo from '../otherLogo.png';
import carrot from '../carrot.svg';
import coloredCarrot from '../coloredCarrot.svg';

import groceries from '../FoodIcons/groceries.svg';

import { fetchMeals, fetchBreakfast, fetchMain } from './FoodGenerator.js';
import { SVG } from '@antv/g2plot/lib/dependents';

import './hamb/hamburgers.scss';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;

const mainTextColor = '#32323c';

//"background-color": "#383838"

class NewLayout extends React.Component {
    constructor(props) {
        super(props);
        // so loading a meal that doesnt exist won't cause an error
        this.emptyMeal = {
            name: '', calories: 0, carbs: 0,
            protein: 0, fat: 0, ingredients: [],
            instructions: [], servings: 0
        }
        this.emptyObj = {
            meal: this.emptyMeal,
            side: this.emptyMeal,
            loading: false,
            pinned: false
        }
        this.state = {
            calories: 2000,
            carbs: 225,   // 45%   225g
            protein: 150, // 30%   150g
            fat: 55,      // 25%   55g
            numMeals: 3,
            // actual data of the meals (iterator on array of objects)
            breakfastIter: null,
            breakfastSideIter: null,
            mainIter: null,
            mainSideIter: null,
            // whether user wants macros factored into their preferences
            enableMacros: false,
            // when true, the load animations go off
            loadingMeals: false,
            // when true, the meals are displayed 
            displayMeals: false,
            // set to true when any of the meal prefs. change
            // when its false, don't call the database, and 
            // just spit out one of the cached meals
            changedPrefs: true,
            // used because the hamburger menu expands the header height
            headerHeight: '80px',
            hamburgerActive: false,
            meal1: this.emptyObj,
            meal2: this.emptyObj,
            meal3: this.emptyObj,
            meal4: this.emptyObj,
            meal5: this.emptyObj,
            meal6: this.emptyObj,
            macroPinned: null,
        }
        this.pieConfig = {
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
    }

    onChange(value) {
        console.log('changed', value);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    macroSwitch = () => {
        this.setState({
            enableMacros: !this.state.enableMacros,
            changedPrefs: true,
        })
    }

    sliderFormatter(val) {
        return `${val}%`;
    }

    pinMacro(num) {
        // set the pin to whichever macro is calling it, remove the pin if it already exists
        this.setState(prevState => ({
            macroPinned: prevState.macroPinned === num ? null : num
        }));
    }

    carbSlider(percent) {
        let newCarbs = Math.floor((percent * this.state.calories) / 400);
        let diff = newCarbs - this.state.carbs;
        // if one of the other macros are zero and youre trying to increase carbs even more
        if (diff > 0 && ((this.state.protein <= (this.state.calories * 0.1) / 4) ||
            (this.state.fat <= (this.state.calories * 0.1) / 9))) {
            return;
        }
        // if one of the other macros are at 80% and youre trying to reduce carbs even more
        if (diff < 0 && ((this.state.protein >= (this.state.calories * 0.8) / 4) ||
            (this.state.fat >= (this.state.calories * 0.8) / 9))) {
            return;
        }
        if (this.state.macroPinned === null) {
            this.setState(prevState => ({
                carbs: newCarbs,
                protein: prevState.protein - (diff * 0.5),
                fat: prevState.fat - (diff * 0.5 * (4 / 9)),
                changedPrefs: true,
            }));
        }
        else if (this.state.macroPinned === 1)
            return;
        else if (this.state.macroPinned === 2) {
            this.setState(prevState => ({
                carbs: newCarbs,
                fat: prevState.fat - (diff * (4 / 9)),
                changedPrefs: true,
            }));
        }
        else if (this.state.macroPinned === 3) {
            this.setState(prevState => ({
                carbs: newCarbs,
                protein: prevState.protein - diff,
                changedPrefs: true,
            }));
        }
    }

    proteinSlider(percent) {
        let newProtein = Math.floor((percent * this.state.calories) / 400);
        let diff = newProtein - this.state.protein;
        if (diff > 0 && ((this.state.carbs <= (this.state.calories * 0.1) / 4) ||
            (this.state.fat <= (this.state.calories * 0.1) / 9))) {
            return;
        }
        if (diff < 0 && ((this.state.carbs >= (this.state.calories * 0.8) / 4) ||
            (this.state.fat >= (this.state.calories * 0.8) / 9))) {
            return;
        }

        if (this.state.macroPinned === null) {
            this.setState(prevState => ({
                protein: newProtein,
                carbs: prevState.carbs - (diff * 0.5),
                fat: prevState.fat - (diff * 0.5 * (4 / 9)),
                changedPrefs: true,
            }));
        }
        else if (this.state.macroPinned === 1) {
            this.setState(prevState => ({
                protein: newProtein,
                fat: prevState.fat - (diff * (4 / 9)),
                changedPrefs: true,
            }));
        }
        else if (this.state.macroPinned === 2)
            return;
        else if (this.state.macroPinned === 3) {
            this.setState(prevState => ({
                protein: newProtein,
                carbs: prevState.carbs - diff,
                changedPrefs: true,
            }));
        }
    }

    fatSlider(percent) {
        let newFat = Math.floor((percent * this.state.calories) / 900);
        let diff = newFat - this.state.fat;
        if (diff > 0 && ((this.state.carbs <= (this.state.calories * 0.1) / 4) ||
            (this.state.protein <= (this.state.calories * 0.1) / 4))) {
            return;
        }
        if (diff < 0 && ((this.state.carbs >= (this.state.calories * 0.8) / 4) ||
            (this.state.protein >= (this.state.calories * 0.8) / 4))) {
            return;
        }
        if (this.state.macroPinned === null) {
            this.setState(prevState => ({
                fat: newFat,
                carbs: prevState.carbs - (diff * 0.5 * (9 / 5)),
                protein: prevState.protein - (diff * 0.5 * (9 / 5)),
                changedPrefs: true,
            }));
        }
        else if (this.state.macroPinned === 1) {
            this.setState(prevState => ({
                fat: newFat,
                protein: prevState.protein - (diff * (9 / 5)),
                changedPrefs: true,
            }));
        }
        else if (this.state.macroPinned === 2) {
            this.setState(prevState => ({
                fat: newFat,
                carbs: prevState.carbs - (diff * (9 / 5)),
                changedPrefs: true,
            }));
        }
        else if (this.state.macroPinned === 3) {
            return;
        }
    }

    regenMeal = (num) => {
        const meal = 'meal' + num.toString();
        // if it's already loading a meal, return (stops spam clicking)
        if (this.state[meal].loading) {
            return;
        }
        this.setState(prevState => ({
            [meal]: {
                ...prevState[meal],
                loading: true
            }
        }));
        this.updateMeal(num);
        setTimeout(() => {
            this.setState(prevState => ({
                [meal]: {
                    ...prevState[meal],
                    loading: false
                }
            }));
        }, 500);
    }

    pinMeal = (num) => {
        const meal = 'meal' + num.toString();
        this.setState(prevState => ({
            [meal]: {
                ...prevState[meal],
                pinned: !prevState[meal].pinned
            }
        }));
    }

    updateMeal = (num) => {
        // updates the meal to its next meal
        const meal = 'meal' + num.toString();

        // IF BREAKFAST
        if (num == 1) {
            // iterator returns {value, done}
            const mealObj = this.state.breakfastIter.next();
            const sideObj = this.state.breakfastSideIter.next();
            if (!mealObj.done) { // mealObj and sideObj are on the same "index", so if one is done, the other is too
                this.setState(prevState => ({
                    meal1: {
                        // keep all the other values of the meal obj
                        ...prevState.meal1,
                        meal: mealObj.value,
                        side: sideObj.value,
                    }
                }))
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (this.state.enableMacros) {
                    carbVar = Math.floor(this.state.carbs);
                    proteinVar = Math.floor(this.state.protein);
                    fatVar = Math.floor(this.state.fat);
                }
                const data = fetchBreakfast(this.state.calories, this.state.numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        this.setState({
                            breakfastIter: res[0][Symbol.iterator](),
                            breakfastSideIter: res[1][Symbol.iterator](),
                        }, () => {
                            // call the function again now that the meals are refreshed
                            // and the iterator is at the '0th' meal
                            this.updateMeal(num);
                        })
                    });
            }
        }
        // IF NOT BREAKFAST
        else {
            // iterator returns {value, done}
            const mealObj = this.state.mainIter.next();
            const sideObj = this.state.mainSideIter.next();
            if (!mealObj.done) { // mealObj and sideObj are on the same "index", so if one is done, the other is too
                this.setState(prevState => ({
                    // dynamic set the key to the correct meal
                    // and keep all the other values of the meal obj
                    [meal]: {
                        ...prevState[meal],
                        meal: mealObj.value,
                        side: sideObj.value,
                    }
                }));
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (this.state.enableMacros) {
                    carbVar = Math.floor(this.state.carbs);
                    proteinVar = Math.floor(this.state.protein);
                    fatVar = Math.floor(this.state.fat);
                }
                const data = fetchMain(this.state.calories, this.state.numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        this.setState({
                            mainIter: res[0][Symbol.iterator](),
                            mainSideIter: res[1][Symbol.iterator](),
                        }, () => {
                            // call the function again now that the meals are refreshed
                            // and the iterator is now at the '0th' meal
                            this.updateMeal(num);
                        })
                    });
            }
        }
    }

    onClickGenerateButton = () => {
        // if it's already loading a meal, return (stops spam clicking)
        if (this.state.loadingMeals)
            return;

        if (this.state.changedPrefs) {
            // get the meal data with the given preferences
            // and once that data is recieved (.then), update the state
            let carbVar = 0;
            let proteinVar = 0;
            let fatVar = 0;
            if (this.state.enableMacros) {
                carbVar = Math.floor(this.state.carbs);
                proteinVar = Math.floor(this.state.protein);
                fatVar = Math.floor(this.state.fat);
            }
            const data = fetchMeals(this.state.calories, this.state.numMeals,
                carbVar, proteinVar, fatVar)
                .then(res => {
                    console.log(`Input: ${this.state.calories}, ${this.state.numMeals}, ${carbVar}, ${proteinVar}, ${fatVar}`)
                    console.log('Output: ');
                    console.log(res);
                    this.setState({
                        breakfastIter: res[0][Symbol.iterator](),
                        breakfastSideIter: res[1][Symbol.iterator](),
                        mainIter: res[2][Symbol.iterator](),
                        mainSideIter: res[3][Symbol.iterator](),
                    }, () => { // after the iterators are set, update all the meals
                        for (let i = 1; i <= this.state.numMeals; i++) {
                            if (!this.state[`meal${i}`].pinned)
                                this.updateMeal(i);
                        }
                        this.setState({
                            loadingMeals: false,
                            displayMeals: true,
                            changedPrefs: false,
                        })
                    })
                });
            // set the loading and temp values while the meal data is loading
            this.setState({
                displayMeals: false,
                loadingMeals: true,
            });
        } else {
            // preferences haven't changed, use cached meals
            // load the meals for half a second, to make it seem more real
            this.setState({
                displayMeals: false,
                loadingMeals: true,
            })
            setTimeout(() => {
                for (let i = 1; i <= this.state.numMeals; i++) {
                    if (!this.state[`meal${i}`].pinned)
                        this.updateMeal(i);
                }
                this.setState({
                    loadingMeals: false,
                    displayMeals: true,
                });
            }, 500);
        }
    };


    render() {
        return (
            //  242, 242, 242
            <div style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
                {/* <div style={{ backgroundColor: 'rgb(245, 243, 240)' }}> */}
                <div id="topLine"></div>
                {/* Header */}
                <div className='header' style={{ height: this.state.headerHeight }} >
                    <div className='rowHeader'>
                        <div className='headerLRSpace'></div>
                        <a href='#'>
                            <img src={coloredCarrot} alt="logo" style={{ width: 35, height: 35, margin: '20px 0 0 18px' }} draggable='false' />
                        </a>
                        {/* shifted down 21.5px to center it vertically in the header */}
                        <div className='colHeaderL' style={{ padding: '21.5px 0 0 9px' }}>
                            <a style={{ color: '#545454' }}>
                                <div className='logoText'>
                                    mealmaker.io
                                </div>
                            </a>
                        </div>

                        <div className='headerCenterLeftSpace'></div>

                        {/* shifted down 10px to center it vertically in the header */}
                        <div className='colHeaderMid' style={{ padding: '10px 0 0 0' }}>
                            <button className="headerText" style={{ height: '60px', width: '150px' }}>
                                How it works
                            </button>
                            <button className="headerText" style={{ height: '60px', width: '100px' }}>
                                About
                            </button>
                        </div>

                        <div className='headerCenterRightSpace'></div>

                        {/* shifted down 10px to center it vertically in the header */}
                        <div className='colHeaderR' style={{ padding: '10px 0 0 0' }}>
                            <button className="headerText" style={{ height: '60px', width: '130px' }}>
                                <text id="signInArrow">&nbsp;&nbsp;&nbsp;&nbsp;Sign in</text> <text > →</text>
                            </button>
                        </div>

                        {/* shifted down 30px to center it vertically in the header */}
                        <div className='hamburgerMenu' style={{ padding: '30px 25px 0 0', margin: '0 0 0 auto' }}>
                            <button className={this.state.hamburgerActive ? 'hamburger hamburger--slider is-active' :
                                'hamburger hamburger--slider'}
                                type="button"
                                onClick={e => this.setState({
                                    headerHeight: this.state.headerHeight === '250px' ? '80px' : '250px',
                                    hamburgerActive: !this.state.hamburgerActive,
                                })}>
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>

                        <div className='headerLRSpace'></div>
                    </div>
                    <div className='condensedHeader'>
                        <button className='condensedHeaderText' style={{ height: '45px', width: '120px' }}>How it works</button>
                        <button className='condensedHeaderText' style={{ height: '45px', width: '70px' }}>About</button>
                        <button className='condensedHeaderText' style={{ height: '45px', width: '80px' }}>Sign in</button>
                    </div>
                </div>

                <div className='headerBorder' />

                <div style={{ margin: '55px 0 55px 0', textAlign: 'center' }}>
                    <b id="captionText">Create a customized meal plan in seconds.</b>
                </div>

                <div className="mainBodyRow" style={{ minHeight: 680 }}>
                    <div className="leftColumn">
                        <div className="inputArea" >
                            <p className="leftColumnText">I want to eat &nbsp;
                                <NumberFormat className='ant-input' id='calorieInput' style={{ width: '126px' }} suffix={' calories'}
                                    defaultValue={2000} allowEmptyFormatting={true}
                                    onValueChange={(value) => this.setState({
                                        calories: Math.floor(value.floatValue),
                                        changedPrefs: true,
                                    })}
                                />
                                {/* <BetterInputNumber addonAfter="calories" /> */}
                            </p>
                            <p className="leftColumnText"> in &nbsp;
                                <Select className="mealInput" defaultValue="3" style={{ width: '126px' }}
                                    onChange={(value) => this.setState({
                                        numMeals: parseInt(value),
                                        changedPrefs: true,
                                    })}>
                                    <Option className='camphorFont' value="1" style={{ fontSize: '15px' }}>1 meal</Option>
                                    <Option className='camphorFont' value="2" style={{ fontSize: '15px' }}>2 meals</Option>
                                    <Option className='camphorFont' value="3" style={{ fontSize: '15px' }}>3 meals</Option>
                                    <Option className='camphorFont' value="4" style={{ fontSize: '15px' }}>4 meals</Option>
                                    <Option className='camphorFont' value="5" style={{ fontSize: '15px' }}>5 meals</Option>
                                    <Option className='camphorFont' value="6" style={{ fontSize: '15px' }}>6 meals</Option>
                                </Select>
                            </p>

                            <Collapse bordered={true} expandIconPosition='right' activeKey={this.state.enableMacros ? 1 : 0} style={{ marginLeft: 'auto', width: '257px' }}>
                                <Panel header={<b id="macroSwitchText">Macro Preferences&nbsp;&nbsp;</b>} showArrow={true} key="1"
                                    extra={<Switch defaultChecked={false} onChange={this.macroSwitch} style={{ margin: '3px 0 0 0' }} />} >
                                    {/* Carbs */}
                                    <span className='mealInput' style={{ float: 'left' }}>
                                        Carbs &nbsp;
                                        {this.state.macroPinned === null ?
                                            <PushpinOutlined className='macroPin' onClick={() => this.pinMacro(1)} /> :
                                            (this.state.macroPinned === 1 ?
                                                <PushpinFilled className='macroPin' onClick={() => this.pinMacro(1)} /> :
                                                null)
                                        }
                                    </span>
                                    <span className='mealInput' style={{ float: 'right' }}>
                                        {Math.floor(this.state.carbs)} g
                                    </span>
                                    <br />
                                    <Slider defaultValue={45} tipFormatter={this.sliderFormatter} min={10} max={80}
                                        value={Math.floor((this.state.carbs * 4) / (this.state.calories / 100))}
                                        disabled={this.state.macroPinned === 1}
                                        onChange={(percent) => this.carbSlider(percent)}
                                    />
                                    {/* Protein */}
                                    <span className='mealInput' style={{ float: 'left' }}>
                                        Protein &nbsp;
                                        {this.state.macroPinned === null ?
                                            <PushpinOutlined className='macroPin' onClick={() => this.pinMacro(2)} /> :
                                            (this.state.macroPinned === 2 ?
                                                <PushpinFilled className='macroPin' onClick={() => this.pinMacro(2)} /> :
                                                null)
                                        }
                                    </span>
                                    <span className='mealInput' style={{ float: 'right' }}>
                                        {Math.floor(this.state.protein)} g
                                    </span>
                                    <br />
                                    <Slider defaultValue={30} tipFormatter={this.sliderFormatter} min={10} max={80}
                                        value={Math.floor((this.state.protein * 4) / (this.state.calories / 100))}
                                        disabled={this.state.macroPinned === 2}
                                        onChange={(percent) => this.proteinSlider(percent)}
                                    />
                                    {/* Fat */}
                                    <span className='mealInput' style={{ float: 'left' }}>
                                        Fat &nbsp;
                                        {this.state.macroPinned === null ?
                                            <PushpinOutlined className='macroPin' onClick={() => this.pinMacro(3)} /> :
                                            (this.state.macroPinned === 3 ?
                                                <PushpinFilled className='macroPin' onClick={() => this.pinMacro(3)} /> :
                                                null)
                                        }
                                    </span>
                                    <span className='mealInput' style={{ float: 'right' }}>
                                        {Math.floor(this.state.fat)} g
                                    </span>
                                    <br />
                                    <Slider defaultValue={25} tipFormatter={this.sliderFormatter} min={10} max={80}
                                        value={Math.floor((this.state.fat * 9) / (this.state.calories / 100))}
                                        disabled={this.state.macroPinned === 3}
                                        onChange={(percent) => {
                                            this.setState({ fat: Math.floor((percent * this.state.calories) / 900) });
                                        }}
                                        onChange={(percent) => this.fatSlider(percent)}
                                    />
                                </Panel>
                            </Collapse>

                            <br />

                            {/* GENERATE BUTTON */}
                            <a className='genButton' onClick={this.onClickGenerateButton} style={{ color: 'white' }}>
                                {this.state.loadingMeals ? <SyncOutlined spin /> : <SyncOutlined />}&nbsp; GENERATE
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
                                config={this.pieConfig}
                            />
                        </div>

                    </div>


                    <div style={{ borderLeft: '2px solid #e0e0e0' }} />

                    <div className="rightColumn">

                        <MealCard mealNum={1} mealObj={this.state.meal1} numMeals={this.state.numMeals}
                            displayMeals={this.state.displayMeals} loadingMeals={this.state.loadingMeals}
                            regenMeal={this.regenMeal} pinMeal={this.pinMeal} />

                        <MealCard mealNum={2} mealObj={this.state.meal2} numMeals={this.state.numMeals}
                            displayMeals={this.state.displayMeals} loadingMeals={this.state.loadingMeals}
                            regenMeal={this.regenMeal} pinMeal={this.pinMeal} />

                        <MealCard mealNum={3} mealObj={this.state.meal3} numMeals={this.state.numMeals}
                            displayMeals={this.state.displayMeals} loadingMeals={this.state.loadingMeals}
                            regenMeal={this.regenMeal} pinMeal={this.pinMeal} />

                        <MealCard mealNum={4} mealObj={this.state.meal4} numMeals={this.state.numMeals}
                            displayMeals={this.state.displayMeals} loadingMeals={this.state.loadingMeals}
                            regenMeal={this.regenMeal} pinMeal={this.pinMeal} />

                        <MealCard mealNum={5} mealObj={this.state.meal5} numMeals={this.state.numMeals}
                            displayMeals={this.state.displayMeals} loadingMeals={this.state.loadingMeals}
                            regenMeal={this.regenMeal} pinMeal={this.pinMeal} />

                        <MealCard mealNum={6} mealObj={this.state.meal6} numMeals={this.state.numMeals}
                            displayMeals={this.state.displayMeals} loadingMeals={this.state.loadingMeals}
                            regenMeal={this.regenMeal} pinMeal={this.pinMeal} />
                    </div>
                </div >

                <div style={{ minHeight: 200 }} />

                <div style={{ borderTop: '2px solid #e0e0e0', width: '92%', margin: '0 auto' }} />

                {/* background: rgb(27,28,29) and dividers: rgb(50,51,52) */}
                <div className="rowFooter" style={{ margin: '25px 0 0 0', fontFamily: 'Camphor', fontSize: '15px' }}>
                    <div className="colFooter" style={{ padding: '0 40px 0 0' }}>
                        <div style={{ float: 'right' }}>
                            <ul style={{ listStyleType: 'none' }}>
                                <li>
                                    <a href='#'>How it works</a>
                                </li>
                                <p></p>
                                <li>
                                    <a href='#'>Source code</a>
                                </li>
                                <p></p>
                                <li>
                                    <a href='#'>About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="colFooter" style={{ padding: '0 0 0 15px' }}>
                        <ul style={{ listStyleType: 'none', }}>
                            <li>
                                <a href='#'>Feedback</a>
                            </li>
                            <p></p>
                            <li>
                                <a href='#'><GithubOutlined style={{ fontSize: '26px' }} /></a>
                                &nbsp;&nbsp;
                                <a href='#'><LinkedinOutlined style={{ fontSize: '26px' }} /></a>
                                &nbsp;&nbsp;
                                <a href='#'><MailOutlined style={{ fontSize: '26px' }} /></a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div >
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(NewLayout));


// old card
// <Card className="cardShadow2" title={this.state.numMeals == 1 ? "Feast" :
//     (this.state.numMeals == 2 ? "Brunch" : "Breakfast")}
//     extra={this.state.breakfastMeals[this.state.breakfastCount].calories + " calories"}
//     style={{ width: 350, height: 200 }} bordered={false}
//     headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
//     <Skeleton avatar={false} loading={!this.state.displayMeals} title={false}
//         active={this.state.loadingMeals}
//         paragraph={{ rows: 3, width: [250] }} >
//         <Meta
//             className='mealCard'
//             avatar={
//                 <Avatar src={groceries} />
//             }
//             title={this.state.breakfastMeals[this.state.breakfastCount].name}
//             description={'C: ' + this.state.breakfastMeals[this.state.breakfastCount].carbs +
//                 ', P: ' + this.state.breakfastMeals[this.state.breakfastCount].protein +
//                 ', F: ' + this.state.breakfastMeals[this.state.breakfastCount].fat +
//                 ', ' + this.state.breakfastMeals[this.state.breakfastCount].servings + ' servings'}
//         />
//     </Skeleton>
// </Card>
