import React from 'react';
import {
    Layout, Menu, Divider, Input, InputNumber,
    Skeleton, Card, Button,
    Select, Alert, Switch, Collapse,
} from 'antd';
import {
    SyncOutlined, GithubOutlined,
    LinkedinOutlined, MailOutlined
} from '@ant-design/icons';
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
            generateLoading: false
        };
        this.textInput = React.createRef();
    }

    onChange(value) {
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
        this.setState({ generateLoading: true });
        setTimeout(() => {
            this.setState({
                generateLoading: false
            });
        }, 3000);
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
                <Header style={{ height: '100px' }}>
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item key="1" style={{ margin: '0 0 0 10%' }}><img src={logo} alt="logo" style={{ width: 66, height: 100 }} /></Menu.Item>
                        <Menu.Item key="2" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 0%' }}><b className="logoText">Macro Meal Maker</b></Menu.Item>
                        <Menu.Item key="3" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 17%' }}><b className="headerText">How it works</b></Menu.Item>
                        <Menu.Item key="4" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 3.5%' }}><b className="headerText">About</b></Menu.Item>
                        <Menu.Item key="4" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 26%' }}>
                            <b className="headerText">Sign in</b> <b className="headerText" id="signInArrow"> →</b>
                        </Menu.Item>
                    </Menu>
                </Header>

                {/* bc it's off center */}
                <div style={{ margin: '55px 65px 55px 0', textAlign: 'center' }}>
                    <b id="captionText">Create a customized meal plan in seconds.</b>
                </div>

                <div className="row" style={{ minHeight: 680 }}>
                    <div className="leftColumn">
                        {/* has a margin of 90 on the right so that the pie chart is alligned with it */}
                        <div className="inputArea" >
                            <p className="leftColumnText">I want to eat &nbsp;
                            <NumberFormat className='ant-input' id='calorieInput' suffix={' calories'} defaultValue={2000} allowEmptyFormatting={true}
                                    //onChange={this.calError()}
                                    style={{ width: '126px' }}
                                />
                            </p>
                            <p className="leftColumnText"> in &nbsp;
                            <Select className="mealInput" defaultValue="3" style={{ width: '126px' }} onChange={this.onChange}>
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

                            <Collapse expandIconPosition='right' activeKey={this.state.enableMacros} style={{ 'margin-left': 'auto', width: '257px' }}>
                                <Panel header={<text id="macroSwitchText">Macro Preferences&nbsp;&nbsp;</text>} showArrow={true} key="1" extra={
                                    <Switch defaultChecked={this.state.enableMacros} onChange={this.macroSwitch} />
                                } >
                                    <p id="macroText">Carbohydrates:&nbsp;
                                        <NumberFormat className='ant-input' id="macroNumbers" suffix=' g' defaultValue={200}
                                            allowEmptyFormatting={true} style={{ width: '80px' }}
                                        />
                                    </p>
                                    <p id="macroText">Protein:&nbsp;
                                        <NumberFormat className='ant-input' id="macroNumbers" suffix=' g' defaultValue={150}
                                            allowEmptyFormatting={true} style={{ width: '80px' }}
                                        />
                                    </p>
                                    <p id="macroText">Fat:&nbsp;
                                        <NumberFormat className='ant-input' id="macroNumbers" suffix=' g' defaultValue={65}
                                            allowEmptyFormatting={true} style={{ width: '80px' }}
                                        />
                                    </p>
                                </Panel>
                            </Collapse>

                            <br />

                            <div>
                                <Button type="primary" id='generateButton' loading={this.state.generateLoading}
                                    icon={<SyncOutlined />} onClick={this.onClickGenerateButton}>
                                    Generate
                            </Button>
                            </div>
                        </div>

                        <br />
                        <br />

                        <div style={{ width: '400px', height: '406px', 'margin': '0 25px 0 auto' }}>
                            <ReactG2Plot
                                className="pie"
                                Ctor={Pie}
                                config={{
                                    width: 400,
                                    height: 400,

                                    //forceFit: true,
                                    pixelRatio: 2,
                                    title: {
                                        visible: true,
                                        text: '                 Macro Breakdown',
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
                                    radius: 0.65,
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
                                        offsetY: -15
                                    },
                                    tooltip: {
                                        //offset: 100,
                                    }
                                }}
                            />
                        </div>


                    </div>


                    <div style={{ 'border-left': '1px solid silver' }} />

                    <div className="rightColumn">
                        <Card title="Breakfast" extra="0 calories" style={{ width: 350 }}
                            headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                            <Skeleton loading={true} title={false} active={this.state.generateLoading}
                                paragraph={{ rows: 3, width: [250] }} />
                        </Card>
                        <br />
                        <Card title="Lunch" extra="0 calories" style={{ width: 350 }}
                            headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                            <Skeleton loading={true} title={false} active={this.state.generateLoading}
                                paragraph={{ rows: 3, width: [250] }} />
                        </Card>
                        <br />
                        <Card title="Dinner" extra="0 calories" style={{ width: 350 }}
                            headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                            <Skeleton loading={true} title={false} active={this.state.generateLoading}
                                paragraph={{ rows: 3, width: [250] }} />
                        </Card>
                    </div>
                </div>

                <div className="main" style={{ minHeight: 200 }}>
                </div>

                <div style={{ 'border-top': '1px solid silver', width: '92%', margin: '0 auto' }} />

                <div style={{ padding: '25px 0', margin: '0% 0 0% 30%', textAlign: 'left' }}>
                    <div className="row" style={{ fontFamily: 'Camphor', fontSize: '15px' }}>
                        <div className="column" style={{ margin: '0% 0% 0 8%' }}>
                            <ul style={{ 'list-style-type': 'none' }}>
                                <li>
                                    <a href='#'>How it works</a>
                                </li>
                                <p></p>
                                <li>
                                    <a href='#'>Code</a>
                                </li>
                                <p></p>
                                <li>
                                    <a href='#'>About</a>
                                </li>
                            </ul>
                        </div>
                        <div className="column" style={{ margin: '0% 35% 0 0%' }}>
                            <a href='#'>Feedback</a>
                            <p></p>
                            <p>
                                <a href='#'><GithubOutlined style={{ fontSize: '26px' }} /></a>
                                &nbsp;&nbsp;
                                <a href='#'><LinkedinOutlined style={{ fontSize: '26px' }} /></a>
                                &nbsp;&nbsp;
                                <a href='#'><MailOutlined style={{ fontSize: '26px' }} /></a>
                            </p>
                        </div>
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



