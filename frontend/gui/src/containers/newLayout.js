import React from 'react';
import {
    Layout, Menu, Divider, Input, InputNumber,
    Skeleton, Card, SkeletonParagraphProps, Button,
    Select, Alert, Switch, Collapse, Spin
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

const antIcon = <SyncOutlined style={{ fontSize: 24 }} spin />;
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
        // message.config({
        //     duration: 3,
        //     maxCount: 1
        // });
        // message.error({ content: 'Enter between 1000 and 10,000 calories' });
        return (
            <Alert>message="Error" type="error" showIcon</Alert>
        )
    }

    render() {
        return (
            <Layout>
                <Header style={{ height: '100px' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                    >
                        <Menu.Item key="1" style={{ margin: '0 0 0 10%' }}><img src={logo} alt="logo" style={{ width: 66, height: 100 }} /></Menu.Item>
                        <Menu.Item key="2" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 0' }}><b className="logoText">Macro Meal Maker</b></Menu.Item>
                        <Menu.Item key="3" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 17%' }}><b className="headerText">How it works</b></Menu.Item>
                        <Menu.Item key="4" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 3.5%' }}><b className="headerText">About</b></Menu.Item>
                        <Menu.Item key="4" className="headerItem" style={{ padding: '0 0 26px 2%', margin: '0 0 0 25%' }}>
                            <b className="headerText">Sign in</b> <b className="headerText" id="signInArrow"> →</b>
                        </Menu.Item>
                    </Menu>
                </Header>

                <div className="site-layout-content">
                    <div style={{ margin: '3% 0', textAlign: 'center' }}>
                        <b id="captionText">Create a customized meal plan in seconds.</b>
                    </div>
                </div>

                <div className="site-layout-content" className="main" style={{ minHeight: 680 }}>
                    <div class="column" style={{ margin: '1% 5% 0 20%', 'text-align': 'right' }}  >
                        <p className="leftColumnText">I want to eat &nbsp;
                                {/* <InputNumber
                                    min={1000} max={10000} defaultValue={2000} step={100}
                                    formatter={value => `${value} calories`}
                                    parser={value => value.replace(' calories', '')}
                                    //value={this.state.val}
                                    //onChange={this.handleChange}
                                    style={{ width: '130px' }}
                                /> */}
                            <NumberFormat className='ant-input' id='calorieInput' suffix={' calories'} defaultValue={2000} allowEmptyFormatting={true}
                                //onChange={this.calError()}
                                //onChange={value => value.target.value < 10000 ? this.calError : this.onChange(value.target.value)}
                                style={{ width: '126px' }}
                            />
                            {/* <NumberFormat defaultValue={2000} value={this.myTextInput} customInput={InputNumber}
                                    suffix={' calories'} ref={ref => this.myTextInput = ref}
                                    onValueChange={value => this.myTextInput = value}
                                /> */}
                        </p>
                        <p className="leftColumnText"> in &nbsp;
                            {/* <InputNumber min={1} max={8} defaultValue={3} onChange={this.onChange} /> */}
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
                        <div style={{ margin: '1% 5% 0 37.5%', width: 265 }}>
                            <Collapse expandIconPosition='right' activeKey={this.state.enableMacros}>
                                <Panel id="macroSwitchText" header='Macro Preferences &nbsp;&nbsp;' showArrow={true} key="1" extra={
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
                        </div>

                        <br />

                        <div>
                            <Button type="primary" id='generateButton' loading={this.state.generateLoading}
                                icon={<SyncOutlined />} onClick={this.onClickGenerateButton}>
                                Generate
                                    </Button>
                        </div>

                        <br />

                        <ReactG2Plot
                            className="pie"
                            Ctor={Pie}
                            config={{
                                //forceFit: true,
                                pixelRatio: 2,
                                title: {
                                    visible: true,
                                    text: '                  Macro Breakdown',
                                    position: 'middle',
                                    style: {
                                        fontSize: 22,
                                        fontFamily: 'Camphor',
                                        fontWeight: 300,
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
                                //padding: [0, 0, 0, 0],
                                //responsive: true
                            }}
                        />

                    </div>


                    <div style={{ 'border-left': '1px solid silver' }} />


                    <div class="column" style={{ margin: '1% 20% 0 5%' }}>
                        <Card title="Breakfast" extra="0 calories" style={{ width: 350 }} headStyle={{ fontFamily: 'Camphor', fontWeight: 400 }}>
                            <Skeleton loading={true} title={false} active={this.state.generateLoading}
                                paragraph={{ rows: 3, width: [250] }} />
                        </Card>
                        <br />
                        <Card title="Lunch" extra="0 calories" style={{ width: 350 }} headStyle={{ fontFamily: 'Camphor', fontWeight: 400 }}>
                            <Skeleton loading={true} title={false} active={this.state.generateLoading}
                                paragraph={{ rows: 3, width: [250] }} />
                        </Card>
                        <br />
                        <Card title="Dinner" extra="0 calories" style={{ width: 350 }} headStyle={{ fontFamily: 'Camphor', fontWeight: 400 }}>
                            <Skeleton loading={true} title={false} active={this.state.generateLoading}
                                paragraph={{ rows: 3, width: [250] }} />
                        </Card>
                    </div>

                </div>

                <div className="site-layout-content" className="main" style={{ minHeight: 200 }}>
                </div>
                <div style={{ 'border-top': '1px solid silver', width: '90%', margin: '0 3%' }} />
                <Footer style={{ margin: '0 0 0 30%', textAlign: 'left' }}>
                    <div className="main" style={{ fontFamily: 'Camphor', fontSize: '15px' }}>
                        <div class="column" style={{ margin: '0% 0% 0 8%' }}>
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
                        <div class="column" style={{ margin: '0% 35% 0 0%' }}>
                            <a href='#'>Contact</a>
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

                </Footer>
            </Layout >
            //mountNode,
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(NewLayout));

