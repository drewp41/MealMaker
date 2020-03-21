import React from 'react';
import {
    Layout, Menu, Divider, Input, InputNumber,
    Skeleton, Card, SkeletonParagraphProps, Button,
    Select, Alert
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import 'antd/dist/antd.css';
import './index.css';
import { Pie } from '@antv/g2plot';
import NumberFormat from 'react-number-format';

import logo from '../MMM.png';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
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
    onChange(value) {
        console.log('changed', value);
    }
    handleChange(value) {
        console.log('changed', value);
    }
    numFormat = (value) =>
        <NumberFormat suffix={' calories'} allowEmptyFormatting={true}
            inputRef={(el) => this.inputElem = el}
        />

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
                        <Menu.Item key="2" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 0' }}><b id="logoText">Macro Meal Maker</b></Menu.Item>
                        <Menu.Item key="3" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 17%' }}><b className="headerText">How it works</b></Menu.Item>
                        <Menu.Item key="4" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 3.5%' }}><b className="headerText">About</b></Menu.Item>
                        <Menu.Item key="4" className="headerItem" style={{ padding: '0 0 26px 2%', margin: '0 0 0 25%' }}><b className="headerText">Sign in →</b></Menu.Item>
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
                                    //formatter={value => `${value} calories`}
                                    formatter={value => this.numFormat(value)}
                                    parser={value => value.replace(' calories', '')}
                                    onChange={this.onChange}
                                    style={{ width: '130px' }}
                                /> */}
                                <NumberFormat className='ant-input' suffix={' calories'} defaultValue={2000} allowEmptyFormatting={true}
                                    // isAllowed={(values) => {
                                    //     const { formattedValue, floatValue } = values;
                                    //     return formattedValue === "" || floatValue <= 10000;
                                    // }}
                                    onChange={(e, value) => { this.onChange(e.target.value) }}
                                    style={{ width: '130px' }}
                                />
                            </p>
                            <p className="leftColumnText"> in &nbsp;
                            {/* <InputNumber min={1} max={8} defaultValue={3} onChange={this.onChange} /> */}
                                <Select defaultValue="3" style={{ width: 120 }} style={{ width: '130px' }} onChange={this.handleChange}>
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
