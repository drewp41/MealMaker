import React from 'react';
import {
    Layout, Menu, Divider, Input, InputNumber,
    Skeleton, Card, Button, Dropdown,
    Select, Alert, Switch, Collapse,
} from 'antd';
import {
    SyncOutlined, GithubOutlined,
    LinkedinOutlined, MailOutlined, MenuOutlined
} from '@ant-design/icons';
import { BetterInputNumber } from './betterInput';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import 'antd/dist/antd.css';
import './index.css';
import { Pie } from '@antv/g2plot';
//import { Pie } from '@opd/g2plot-react'
import ReactG2Plot from 'react-g2plot';
import NumberFormat from 'react-number-format';

import logo from '../MMM.png';
import { fetchMeals } from './FoodGenerator.js';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Panel } = Collapse;
const mainTextColor = '#32323c'

// padding is on the inside, margin is on the outside
/* 
Apply to all four sides 
padding: 1em;

 vertical | horizontal 
padding: 5% 10%;

 top | horizontal | bottom 
padding: 1em 2em 2em;

 top | right | bottom | left 
padding: 5px 1em 0 2em;
*/

//"background-color": "#383838"


class NewLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableMacros: false,
            loadingMeals: false,
            displayMeals: false,
            calories: 2000,
            numMeals: 3,
            meals: this.fillArr({
                name: '', calories: 0, carbs: 0,
                protein: 0, fat: 0, ingredients: []
            }),
            hide: 'none',
        };
    }

    fillArr(obj) {
        let arr = [];
        for (let i = 0; i <= 7; i++) {
            arr.push(obj);
        }
        return arr;
    }

    onChange(value) {
        console.log('changed', value);
    }

    onCalChange(value) {
        // formattedValue, value, floatValue
        console.log('changed', value.floatValue);
    }

    onMealChange(value) {
        console.log('changed', value);
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    macroSwitch = () => {
        this.setState({
            enableMacros: (this.state.enableMacros === 1) ? 0 : 1
        })
    }

    onClickGenerateButton = () => {
        const data = fetchMeals("meatball")
            .then(res => {
                console.log(res);
                this.setState({
                    meals: res,
                    // originally from setTimeout
                    loadingMeals: false,
                    displayMeals: true,
                    hide: 'block',
                })
            });
        this.setState({
            meals: this.fillArr({
                name: '', calories: 0, carbs: 0,
                protein: 0, fat: 0, ingredients: []
            }),
            displayMeals: false,
            loadingMeals: true,
            hide: 'none',
        });
        // setTimeout(() => {
        //     this.setState({

        //     });
        // }, 3000);
    };

    calError = () => {
        return (
            <Alert>message="Error" type="error" showIcon</Alert>
        )
    }

    render() {
        return (
            //stripes's 'rgb(247,249,252)'
            // ant's 'rgb(241, 242, 245)'
            //me:
            // for darker text: #32323c
            // for regular text: #

            <div style={{ backgroundColor: 'rgb(241, 242, 245)' }}>
                {/* Header */}
                <div className='rowHeader' style={{ backgroundColor: 'rgb(4, 21, 40)', height: '100px' }}>
                    <div className='headerLRSpace'></div>
                    {/* <div style={{ 'border-left': '1px solid silver' }} /> */}
                    <a href='#'>
                        <img src={logo} alt="logo" style={{ width: 66, height: 100, margin: '0 0 0 15px' }} />
                    </a>
                    <div className='colHeaderL'>
                        <button className="logoText" id="logo" style={{ height: '60px', width: '210px', textIndent: '-20px' }}>
                            Macro Meal Maker
                        </button>
                    </div>
                    {/* <div style={{ 'border-left': '1px solid silver' }} /> */}
                    <div className='headerCenterLeftSpace'></div>
                    {/* <div style={{ 'border-left': '1px solid silver' }} /> */}
                    <div className='colHeaderMid'>
                        <button className="headerText" style={{ height: '60px', width: '150px' }}>
                            How it works
                            </button>
                        <button className="headerText" style={{ height: '60px', width: '100px' }}>
                            About
                            </button>
                    </div>
                    {/* <div style={{ 'border-left': '1px solid silver' }} /> */}
                    <div className='headerCenterRightSpace'></div>
                    {/* <div style={{ 'border-left': '1px solid silver' }} /> */}
                    <div className='colHeaderR'>
                        <button className="headerText" style={{ height: '60px', width: '130px' }}>
                            <text id="signInArrow">Sign in</text> <text > →</text>
                        </button>
                    </div>
                    <div className='hamburger' style={{ padding: '0 30px 0 0', margin: '0 0 0 auto' }}>
                        <Dropdown overlay={<Menu>
                            <Menu.Item key="1"><a href="#">How it works</a></Menu.Item>
                            <Menu.Item key="2"><a href="#">About</a></Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="3"><a href="#">Sign in →</a></Menu.Item>
                        </Menu>} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <MenuOutlined style={{ fontSize: '22px', color: 'white' }} />
                            </a>
                        </Dropdown>
                    </div>
                    {/* <div style={{ 'border-left': '1px solid silver' }} /> */}
                    <div className='headerLRSpace'></div>
                </div>

                <div style={{ margin: '55px 0 55px 0', textAlign: 'center' }}>
                    <b id="captionText">Create a customized meal plan in seconds.</b>
                </div>

                <div className="row" style={{ minHeight: 680 }}>
                    <div className="leftColumn">
                        {/* has a margin of 90 on the right so that the pie chart is alligned with it */}
                        <div className="inputArea" >
                            <p className="leftColumnText">I want to eat &nbsp;
                                <NumberFormat className='ant-input' id='calorieInput' style={{ width: '126px' }} suffix={' calories'}
                                    defaultValue={2000} allowEmptyFormatting={true} onValueChange={(value) => { this.setState({ calories: Math.floor(value.floatValue) }) }}
                                />
                                {/* <BetterInputNumber addonAfter="calories" /> */}
                            </p>
                            <p className="leftColumnText"> in &nbsp;
                                <Select className="mealInput" defaultValue="3" style={{ width: '126px' }}
                                    onChange={this.onMealChange} onChange={(value) => { this.setState({ numMeals: parseInt(value) }) }}>
                                    <Option className='camphorFont' value="1">1 meal</Option>
                                    <Option className='camphorFont' value="2">2 meals</Option>
                                    <Option className='camphorFont' value="3">3 meals</Option>
                                    <Option className='camphorFont' value="4">4 meals</Option>
                                    <Option className='camphorFont' value="5">5 meals</Option>
                                    <Option className='camphorFont' value="6">6 meals</Option>
                                    <Option className='camphorFont' value="7">7 meals</Option>
                                    <Option className='camphorFont' value="8">8 meals</Option>
                                    <Option className='camphorFont' value="9">9 meals</Option>
                                </Select>
                            </p>

                            <Collapse expandIconPosition='right' activeKey={this.state.enableMacros} style={{ marginLeft: 'auto', width: '257px' }}>
                                <Panel header={<text id="macroSwitchText">Macro Preferences&nbsp;&nbsp;</text>} showArrow={true} key="1"
                                    extra={<Switch defaultChecked={false} onChange={this.macroSwitch} />}
                                >
                                    <p className="macroText">Carbohydrates:&nbsp;
                                        <NumberFormat className='ant-input' id="macroNumbers" suffix=' g' defaultValue={200}
                                            allowEmptyFormatting={true} style={{ width: '80px' }}
                                        />
                                    </p>
                                    <p className="macroText">Protein:&nbsp;
                                        <NumberFormat className='ant-input' id="macroNumbers" suffix=' g' defaultValue={150}
                                            allowEmptyFormatting={true} style={{ width: '80px' }}
                                        />
                                    </p>
                                    <p className="macroText">Fat:&nbsp;
                                        <NumberFormat className='ant-input' id="macroNumbers" suffix=' g' defaultValue={65}
                                            allowEmptyFormatting={true} style={{ width: '80px' }}
                                        />
                                    </p>
                                </Panel>
                            </Collapse>

                            <br />

                            <div>
                                <Button type="primary" id='generateButton' loading={this.state.loadingMeals}
                                    icon={<SyncOutlined />} onClick={this.onClickGenerateButton}>
                                    Generate
                            </Button>
                            </div>
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
                                    pixelRatio: 2,
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
                                            value: 34,
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
                                        type: 'outer',
                                        formatter: (val) => {
                                            return val + '%';
                                        },
                                        style: {
                                            fontFamily: 'Camphor',
                                        },
                                    },
                                    legend: {
                                        visible: true,
                                        position: 'bottom-center',
                                        offsetY: -5
                                    },
                                    tooltip: {
                                        //offset: 100,
                                    }
                                }}
                            />
                        </div>


                    </div>


                    <div style={{ borderLeft: '1px solid silver' }} />

                    <div className="rightColumn">
                        <Card title="Breakfast" extra={this.state.meals[0].calories + " calories"} style={{ width: 350, height: 200 }}
                            headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                            <Skeleton loading={!this.state.displayMeals} title={false} active={this.state.loadingMeals}
                                paragraph={{ rows: 3, width: [250] }} />
                            <div style={{ display: this.state.hide }}>
                                <p>
                                    {this.state.meals[0].name}
                                </p>
                            </div>
                        </Card>
                        <br />
                        <Card title="Lunch" extra={this.state.meals[1].calories + " calories"} style={{ width: 350, height: 200 }}
                            headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                            <Skeleton loading={!this.state.displayMeals} title={false} active={this.state.loadingMeals}
                                paragraph={{ rows: 3, width: [250] }} />
                            <div style={{ display: this.state.hide }}>
                                <p>
                                    {this.state.meals[1].name}
                                </p>
                            </div>
                        </Card>
                        <br />
                        <Card title="Dinner" extra={this.state.meals[2].calories + " calories"} style={{ width: 350, height: 200 }}
                            headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                            <Skeleton loading={!this.state.displayMeals} title={false} active={this.state.loadingMeals}
                                paragraph={{ rows: 3, width: [250] }} />
                            <div style={{ display: this.state.hide }}>
                                <p>
                                    {this.state.meals[2].name}
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="main" style={{ minHeight: 200 }}>
                </div>

                <div style={{ borderTop: '1px solid silver', width: '92%', margin: '0 auto' }} />

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



