import React from 'react';
import {
    Layout, Menu, Divider, Input, InputNumber,
    Skeleton, Card, Button, Dropdown,
    Select, Alert, Switch, Collapse, Avatar
} from 'antd';
import {
    SyncOutlined, GithubOutlined,
    LinkedinOutlined, MailOutlined, MenuOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';
import { BetterInputNumber } from './betterInput';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import 'antd/dist/antd.css';
import './index.css';
import { Pie } from '@antv/g2plot';
import ReactG2Plot from 'react-g2plot';
import NumberFormat from 'react-number-format';

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

const mainTextColor = '#32323c'

//"background-color": "#383838"

class NewLayout extends React.Component {
    constructor(props) {
        super(props);
        this.emptyMeals = Array(6).fill({
            name: '', calories: 0, carbs: 0,
            protein: 0, fat: 0, ingredients: [],
            instructions: [], servings: 0
        });
        this.emptyMeal = {
            name: '', calories: 0, carbs: 0,
            protein: 0, fat: 0, ingredients: [],
            instructions: [], servings: 0
        }
        this.state = {
            calories: 2000,
            carbs: 220,
            protein: 130,
            fat: 65,
            numMeals: 3,
            // actual data of the meals (array of objects)
            breakfastMeals: this.emptyMeals,
            breakfastSides: this.emptyMeals,
            mainMeals: this.emptyMeals,
            mainSides: this.emptyMeals,
            // what index of meal youre on
            // breakfastCount: breakfastMeals[Symbol.iterator](),
            // mainCount: mainMeals[Symbol.iterator](),
            breakfastCount: 0,
            mainCount: 0,
            breakfastIter: null,
            mainIter: null,
            // whether user wants macros factored into their preferences
            enableMacros: false,
            // when true, the load animations go off
            loadingMeals: false,
            // when true, the meals are displayed 
            displayMeals: false,
            // when the generate button is hit, this is set to true
            // but onces any mal preference changes, it's set to false
            // when its false, don't call the database, and just spit out
            // one of the cached meals
            changedPrefs: true,
            headerHeight: '80px',
            hamburgerActive: false,
            meal1: this.emptyMeal,
            meal2: this.emptyMeal,
            meal3: this.emptyMeal,
            meal4: this.emptyMeal,
            meal5: this.emptyMeal,
            meal6: this.emptyMeal,
        };
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

    regenMeal = () => {
        this.setState({
            loadingMeals: true,
        })
    }

    updateMeal = (num) => {
        // updates the meal to its next meal
        const meal = 'meal' + num.toString();

        // IF BREAKFAST
        if (num == 1) {
            // iterator returns {value, done}
            const obj = this.state.breakfastIter.next();
            if (!obj.done) {
                this.setState({
                    meal1: obj.value,
                })
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (this.state.enableMacros) {
                    carbVar = this.state.carbs;
                    proteinVar = this.state.protein;
                    fatVar = this.state.fat;
                }
                const data = fetchBreakfast(this.state.calories, this.state.numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        this.setState({
                            breakfastMeals: res[0],
                            breakfastSides: res[1],
                        }, () => {
                            this.setState({
                                breakfastIter: this.state.breakfastMeals[Symbol.iterator](),
                            }, () => {
                                // call the function again now that the meals are refreshed
                                // and the iterator is at the '0th' meal
                                this.updateMeal(num);
                            })
                        })
                    });
            }
        }

        // IF NOT BREAKFAST
        else {
            const obj = this.state.mainIter.next();
            if (!obj.done) {
                this.setState({
                    // dynamic set the key to the correct meal
                    [meal]: obj.value,
                })
            } else {
                let carbVar = 0;
                let proteinVar = 0;
                let fatVar = 0;
                if (this.state.enableMacros) {
                    carbVar = this.state.carbs;
                    proteinVar = this.state.protein;
                    fatVar = this.state.fat;
                }
                const data = fetchMain(this.state.calories, this.state.numMeals,
                    carbVar, proteinVar, fatVar)
                    .then(res => {
                        this.setState({
                            mainMeals: res[0],
                            mainSides: res[1],
                        }, () => {
                            this.setState({
                                mainIter: this.state.mainMeals[Symbol.iterator](),
                            }, () => {
                                // call the function again now that the meals are refreshed
                                // and the iterator is at the '0th' meal
                                this.updateMeal(num);
                            })
                        })
                    });
            }
        }
    }

    onClickGenerateButton = () => {
        if (this.state.loadingMeals)
            return;
        if (this.state.breakfastCount == 5 || this.state.mainCount >= 14) {
            // give it a half second delay so the if statement under this runs
            setTimeout(() => {
                this.setState({
                    changedPrefs: true,
                    // 2 lines might be unnecessary
                    breakfastCount: 0,
                    mainCount: 6,
                });
            }, 500);
        }

        if (this.state.changedPrefs) {
            // get the meal data with the given preferences
            // and once that data is recieved (.then), update the state
            let carbVar = 0;
            let proteinVar = 0;
            let fatVar = 0;
            if (this.state.enableMacros) {
                carbVar = this.state.carbs;
                proteinVar = this.state.protein;
                fatVar = this.state.fat;
            }
            const data = fetchMeals(this.state.calories, this.state.numMeals,
                carbVar, proteinVar, fatVar)
                .then(res => {
                    console.log(res);
                    this.setState({
                        breakfastMeals: res[0],
                        breakfastSides: res[1],
                        mainMeals: res[2],
                        mainSides: res[3],
                        breakfastCount: 0,
                        mainCount: 0,
                    }, () => { // after the meals are set
                        this.setState({
                            breakfastIter: this.state.breakfastMeals[Symbol.iterator](),
                            mainIter: this.state.mainMeals[Symbol.iterator](),
                        }, () => { // after the iterators are set, update all the meals
                            for (let i = 1; i <= this.state.numMeals; i++) {
                                this.updateMeal(i);
                            }
                            this.setState({
                                loadingMeals: false,
                                displayMeals: true,
                                changedPrefs: false,
                            })
                        })
                    })
                });

            // set the loading and temp values while the meal data is loading
            this.setState({
                meals: this.emptyMeals,
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
                    this.updateMeal(i);
                }
                this.setState({
                    loadingMeals: false,
                    displayMeals: true,
                    // breakfastCount: this.state.breakfastCount + 1,
                    // -1 to account for the breakfast
                    // mainCount: this.state.mainCount + this.state.numMeals - 1,
                });
            }, 500);
        }
    };

    render() {
        return (

            <div style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
                <div id="topLine"></div>
                {/* Header */}
                <div className='header' style={{ height: this.state.headerHeight }}>
                    <div className='rowHeader'>
                        <div className='headerLRSpace'></div>
                        {/* <a href='#'>
                        <img src={recoloredLogo} alt="logo" style={{ width: 53, height: 80, margin: '0 0 0 15px' }} draggable='false' />
                        </a> */}
                        <a href='#'>
                            <img src={coloredCarrot} alt="logo" style={{ width: 35, height: 35, margin: '20px 0 0 15px' }} draggable='false' />
                        </a>
                        {/* shifted down 21.5px to center it vertically in the header */}
                        <div className='colHeaderL' style={{ padding: '21.5px 0 0 9px' }}>
                            {/* <button className="logoText" id="logo" style={{ height: '60px', width: '210px', textIndent: '-20px', }}>
                            Macro Meal Maker
                        </button> */}
                            <a style={{ color: '#545454' }}>
                                <div id="pt">
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
                                <text id="signInArrow">Sign in</text> <text > →</text>
                            </button>
                        </div>

                        {/* shifted down 30px to center it vertically in the header */}
                        <div className='hamburgerMenu' style={{ padding: '30px 25px 0 0', margin: '0 0 0 auto' }}>
                            <button className={this.state.hamburgerActive ? 'hamburger hamburger--slider is-active' :
                                'hamburger hamburger--slider'}
                                type="button"
                                onClick={e => this.setState({
                                    headerHeight: this.state.headerHeight == '250px' ? '80px' : '250px',
                                    hamburgerActive: !this.state.hamburgerActive,
                                })}>
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>

                        <div className='headerLRSpace'></div>
                        {/* <div className="break"></div> */}
                        {/* <div>About</div> */}
                    </div>
                    <div className='condensedHeader'>
                        <button className='condensedHeaderText' style={{ height: '45px', width: '120px' }}>How it works</button>
                        <button className='condensedHeaderText' style={{ height: '45px', width: '70px' }}>About</button>
                        <button className='condensedHeaderText' style={{ height: '45px', width: '80px' }}>Sign in</button>
                    </div>
                </div>

                <div style={{ margin: '55px 0 55px 0', textAlign: 'center' }}>
                    <b id="captionText">Create a customized meal plan in seconds.</b>
                </div>

                <div className="mainBodyRow" style={{ minHeight: 680 }}>
                    <div className="leftColumn">
                        {/* has a margin of 90 on the right so that the pie chart is alligned with it */}
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

                            <Collapse bordered={true} expandIconPosition='right' activeKey={this.state.enableMacros ? 1 : 0} style={{ marginLeft: 'auto', width: '242px' }}>
                                <Panel header={<b id="macroSwitchText">Macro Prefences&nbsp;&nbsp;</b>} showArrow={true} key="1"
                                    extra={<Switch defaultChecked={false} onChange={this.macroSwitch} />}
                                >
                                    <div className="macroText">Carbohydrates:&nbsp;
                                        <NumberFormat className='ant-input' id="macroNumbers" suffix=' g' defaultValue={220}
                                            allowEmptyFormatting={true} style={{ width: '80px' }}
                                            onValueChange={(values) => this.setState({
                                                carbs: Math.floor(values.floatValue),
                                            })}
                                        />
                                    </div>
                                    <p />
                                    <div className="macroText">Protein:&nbsp;
                                        <NumberFormat className='ant-input' id="macroNumbers" suffix=' g' defaultValue={130}
                                            allowEmptyFormatting={true} style={{ width: '80px' }}
                                            onValueChange={(values) => this.setState({
                                                protein: Math.floor(values.floatValue),
                                            })}
                                        />
                                    </div>
                                    <p />
                                    <div className="macroText">Fat:&nbsp;
                                        <NumberFormat className='ant-input' id="macroNumbers" suffix=' g' defaultValue={65}
                                            allowEmptyFormatting={true} style={{ width: '80px' }}
                                            onValueChange={(values) => this.setState({
                                                fat: Math.floor(values.floatValue),
                                            })}
                                        />
                                    </div>

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
                                config={{
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
                                        //text:
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
                                    tooltip: {
                                        //offset: 100,
                                    },
                                    responsive: true
                                }}
                            />
                        </div>

                    </div>


                    <div style={{ borderLeft: '2px solid #e0e0e0' }} />

                    <div className="rightColumn">
                        {/* TEST CARD */}
                        <Card className="cardShadow2" title={this.state.numMeals == 1 ? "Feast" :
                            (this.state.numMeals == 2 ? "Brunch" : "Breakfast")}
                            extra={this.state.breakfastMeals[this.state.breakfastCount].calories + " calories"}
                            style={{ width: 350, height: 200 }} bordered={false}
                            headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                            <Skeleton avatar={false} loading={this.state.displayMeals} title={false}
                                active={this.state.loadingMeals}
                                paragraph={{ rows: 3, width: [250] }} >
                                <div className='mealCard' style={{ margin: '-10px 0 0 0' }}>
                                    <div style={{ float: 'right', fontSize: '18px' }}>
                                        {this.state.loadingMeals ? <SyncOutlined spin /> : <SyncOutlined onClick={this.regenMeal} />}
                                        &nbsp;&nbsp;&nbsp;
                                        <PushpinOutlined />
                                    </div>
                                    <p>
                                        . {this.state.breakfastMeals[this.state.breakfastCount].name}
                                    </p>
                                    <p>
                                        C: {this.state.breakfastMeals[this.state.breakfastCount].carbs}
                                        , P: {this.state.breakfastMeals[this.state.breakfastCount].protein}
                                        , F: {this.state.breakfastMeals[this.state.breakfastCount].fat}
                                        ,  {this.state.breakfastMeals[this.state.breakfastCount].servings} servings
                                    </p>
                                </div>
                            </Skeleton>
                        </Card>
                        <br />

                        {/* First card is always shown */}
                        <Card className="cardShadow2" title={this.state.numMeals == 1 ? "Feast" :
                            (this.state.numMeals == 2 ? "Brunch" : "Breakfast")}
                            extra={this.state.meal1.calories + " calories"}
                            style={{ width: 350, height: 200 }} bordered={false}
                            headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                            <Skeleton avatar={false} loading={!this.state.displayMeals} title={false}
                                active={this.state.loadingMeals}
                                paragraph={{ rows: 3, width: [250] }} >
                                <Meta
                                    className='mealCard'
                                    avatar={
                                        <Avatar src={groceries} />
                                    }
                                    title={this.state.meal1.name}
                                    description={'C: ' + this.state.meal1.carbs +
                                        ', P: ' + this.state.meal1.protein +
                                        ', F: ' + this.state.meal1.fat +
                                        ', ' + this.state.meal1.servings + ' servings'}
                                />
                            </Skeleton>
                        </Card>

                        {this.state.numMeals >= 2 &&
                            <div>
                                <br />
                                <Card className="cardShadow2" title={this.state.numMeals == 2 ? "Dinner" : "Lunch"}
                                    extra={(this.state.numMeals > 1 ? this.state.meal2.calories : '0') + " calories"}
                                    style={{ width: 350, height: 200 }} bordered={false}
                                    headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                                    <Skeleton avatar={false} loading={!this.state.displayMeals} title={false}
                                        active={this.state.loadingMeals}
                                        paragraph={{ rows: 3, width: [250] }} >
                                        <Meta
                                            className='mealCard'
                                            avatar={
                                                <Avatar src={groceries} />
                                            }
                                            title={this.state.meal2.name}
                                            description={'C: ' + this.state.meal2.carbs +
                                                ', P: ' + this.state.meal2.protein +
                                                ', F: ' + this.state.meal2.fat +
                                                ', ' + this.state.meal2.servings + ' servings'}
                                        />
                                    </Skeleton>
                                </Card>
                            </div>
                        }
                        {this.state.numMeals >= 3 &&
                            <div>
                                <br />
                                <Card className="cardShadow2" title="Dinner"
                                    extra={(this.state.numMeals > 2 ? this.state.meal3.calories : '0') + " calories"}
                                    style={{ width: 350, height: 200 }} bordered={false}
                                    headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                                    <Skeleton avatar={false} loading={!this.state.displayMeals} title={false}
                                        active={this.state.loadingMeals}
                                        paragraph={{ rows: 3, width: [250] }} >
                                        <Meta
                                            className='mealCard'
                                            avatar={
                                                <Avatar src={groceries} />
                                            }
                                            title={this.state.meal3.name}
                                            description={'C: ' + this.state.meal3.carbs +
                                                ', P: ' + this.state.meal3.protein +
                                                ', F: ' + this.state.meal3.fat +
                                                ', ' + this.state.meal3.servings + ' servings'}
                                        />
                                    </Skeleton>
                                </Card>
                            </div>
                        }
                        {this.state.numMeals >= 4 &&
                            <div>
                                <br />
                                <Card className="cardShadow2" title="Snack"
                                    extra={(this.state.numMeals > 3 ? this.state.meal4.calories : '0') + " calories"}
                                    style={{ width: 350, height: 200 }} bordered={false}
                                    headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                                    <Skeleton avatar={false} loading={!this.state.displayMeals} title={false}
                                        active={this.state.loadingMeals}
                                        paragraph={{ rows: 3, width: [250] }} >
                                        <Meta
                                            className='mealCard'
                                            avatar={
                                                <Avatar src={groceries} />
                                            }
                                            title={this.state.meal4.name}
                                            description={'C: ' + this.state.meal4.carbs +
                                                ', P: ' + this.state.meal4.protein +
                                                ', F: ' + this.state.meal4.fat +
                                                ', ' + this.state.meal4.servings + ' servings'}
                                        />
                                    </Skeleton>
                                </Card>
                            </div>
                        }
                        {this.state.numMeals >= 5 &&
                            <div>
                                <br />
                                <Card className="cardShadow2" title="Snack"
                                    extra={(this.state.numMeals > 4 ? this.state.meal5.calories : '0') + " calories"}
                                    style={{ width: 350, height: 200 }} bordered={false}
                                    headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                                    <Skeleton avatar={false} loading={!this.state.displayMeals} title={false}
                                        active={this.state.loadingMeals}
                                        paragraph={{ rows: 3, width: [250] }} >
                                        <Meta
                                            className='mealCard'
                                            avatar={
                                                <Avatar src={groceries} />
                                            }
                                            title={this.state.meal5.name}
                                            description={'C: ' + this.state.meal5.carbs +
                                                ', P: ' + this.state.meal5.protein +
                                                ', F: ' + this.state.meal5.fat +
                                                ', ' + this.state.meal5.servings + ' servings'}
                                        />
                                    </Skeleton>
                                </Card>
                            </div>
                        }
                        {this.state.numMeals >= 6 &&
                            <div>
                                <br />
                                <Card className="cardShadow2" title="Snack"
                                    extra={(this.state.numMeals > 5 ? this.state.meal6.calories : '0') + " calories"}
                                    style={{ width: 350, height: 200 }} bordered={false}
                                    headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                                    <Skeleton avatar={false} loading={!this.state.displayMeals} title={false}
                                        active={this.state.loadingMeals}
                                        paragraph={{ rows: 3, width: [250] }} >
                                        <Meta
                                            className='mealCard'
                                            avatar={
                                                <Avatar src={groceries} />
                                            }
                                            title={this.state.meal6.name}
                                            description={'C: ' + this.state.meal6.carbs +
                                                ', P: ' + this.state.meal6.protein +
                                                ', F: ' + this.state.meal6.fat +
                                                ', ' + this.state.meal6.servings + ' servings'}
                                        />
                                    </Skeleton>
                                </Card>
                            </div>
                        }
                    </div>
                </div >

                <div className="main" style={{ minHeight: 200 }}>
                </div>

                <div style={{ borderTop: '2px solid #e0e0e0', width: '92%', margin: '0 auto' }} />

                <div className="rowFooter" style={{ margin: '25px 0 0 0', fontFamily: 'Camphor', fontSize: '15px' }}>
                    <div className="colFooter" style={{ padding: '0 50px 0 0' }}>
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
                    <div className="colFooter" style={{ padding: '0 0 0 50px' }}>
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


