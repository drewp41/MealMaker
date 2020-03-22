import React from 'react';
import {
    Layout, Menu, Divider, Input, InputNumber,
    Skeleton, Card, SkeletonParagraphProps, Button,
    Select, Alert, message, Switch, Collapse
} from 'antd';
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
        this.enableMacros = false
        this.textInput = React.createRef();
    }

    state = {
        enableMacros: false,
    };

    onChange(value) {
        console.log('changed', value);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    macroSwitch = () => {
        this.setState({
            enableMacros: !this.state.enableMacros
        })
    }
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
                <Content style={{ padding: '0 50px' }}>
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
                                <NumberFormat className='ant-input' suffix={' calories'} defaultValue={2000} allowEmptyFormatting={true}
                                    //onChange={this.calError()}
                                    //onChange={value => value.target.value < 10000 ? this.calError : this.onChange(value.target.value)}
                                    style={{ width: '130px' }}
                                />
                                {/* <NumberFormat defaultValue={2000} value={this.myTextInput} customInput={InputNumber}
                                    suffix={' calories'} ref={ref => this.myTextInput = ref}
                                    onValueChange={value => this.myTextInput = value}
                                /> */}
                            </p>
                            <p className="leftColumnText"> in &nbsp;
                            {/* <InputNumber min={1} max={8} defaultValue={3} onChange={this.onChange} /> */}
                                <Select defaultValue="3" style={{ width: '130px' }} onChange={this.handleChange}>
                                    <Option value="1">1 meal</Option>
                                    <Option value="2">2 meals</Option>
                                    <Option value="3">3 meals</Option>
                                    <Option value="4">4 meals</Option>
                                    <Option value="5">5 meals</Option>
                                    <Option value="6">6 meals</Option>
                                    <Option value="7">7 meals</Option>
                                    <Option value="8">8 meals</Option>
                                    <Option value="9">9 meals</Option>
                                </Select>
                            </p>
                            <div>
                                <Button type="primary" loading={false} >Generate</Button>
                            </div>
                            <br />
                            <div>
                                <Switch onChange={this.macroSwitch} />
                            </div>
                            <div destroyInactivePanel={true} style={{ margin: '1% 5% 0 35%', width: 250 }}>
                                <Collapse expandIconPosition='right'>
                                    <Panel header="Macro Prefrences" key="1" disabled={!this.state.enableMacros}>
                                        {/* <p>hi</p> */}
                                        <p>Carbohydrates:&nbsp;
                                        <NumberFormat className='ant-input' suffix=' g' defaultValue={200} allowEmptyFormatting={true}
                                                //onChange={this.calError()}
                                                //onChange={value => value.target.value < 10000 ? this.calError : this.onChange(value.target.value)}
                                                style={{ width: '80px' }}
                                            />
                                        </p>
                                        <p>Protein:&nbsp;
                                        <NumberFormat className='ant-input' suffix=' g' defaultValue={150} allowEmptyFormatting={true}
                                                //onChange={this.calError()}
                                                //onChange={value => value.target.value < 10000 ? this.calError : this.onChange(value.target.value)}
                                                style={{ width: '80px' }}
                                            />
                                        </p>
                                        <p>Fat:&nbsp;
                                        <NumberFormat className='ant-input' suffix=' g' defaultValue={65} allowEmptyFormatting={true}
                                                //onChange={this.calError()}
                                                //onChange={value => value.target.value < 10000 ? this.calError : this.onChange(value.target.value)}
                                                style={{ width: '80px' }}
                                            />
                                        </p>
                                    </Panel>
                                </Collapse>
                            </div>


                            <ReactG2Plot
                                className="pie"
                                Ctor={Pie}
                                config={{
                                    //forceFit: true,
                                    pixelRatio: 2,
                                    title: {
                                        visible: true,
                                        text: 'Macro Breakdown',
                                        position: 'left',
                                    },
                                    description: {
                                        visible: false,
                                        //text:
                                        //    '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。',
                                    },
                                    radius: 0.7,
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
                                    },
                                    legend: {
                                        visible: true,
                                        position: 'bottom-center',
                                        //offsetY: -285
                                    },
                                    //padding: [0, 0, 0, 0],
                                    //responsive: true
                                }}
                            />

                        </div>
                        <div style={{ 'border-left': '1px solid silver' }} />
                        <div class="column" style={{ margin: '1% 20% 0 5%' }}>
                            <Card title="Breakfast" extra="0 calories" style={{ width: 350 }}>
                                <Skeleton loading={true} title={false} paragraph={{ rows: 3, width: [250] }} />
                            </Card>
                            <br />
                            <Card title="Lunch" extra="0 calories" style={{ width: 350 }}>
                                <Skeleton loading={true} title={false} paragraph={{ rows: 3, width: [250] }} />
                            </Card>
                            <br />
                            <Card title="Dinner" extra="0 calories" style={{ width: 350 }}>
                                <Skeleton loading={true} title={false} paragraph={{ rows: 3, width: [250] }} />
                            </Card>
                        </div>

                    </div>

                    <div className="site-layout-content" className="main" style={{ minHeight: 200 }}>
                    </div>
                </Content>
                <div style={{ 'border-top': '1px solid #bbbbbb', width: '90%', margin: '0 3%' }} />
                <Footer style={{ textAlign: 'center' }}>Oh hey</Footer>
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

