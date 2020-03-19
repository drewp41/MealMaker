import React from 'react';
import { Layout, Menu, Divider, Input, InputNumber } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import 'antd/dist/antd.css';
import './index.css';

import logo from '../MMM.png';
//<img src={logo} alt="logo" style={{ width: 50, height: 75 }} />

const { Header, Content, Footer } = Layout;
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
                        <Menu.Item key="4" className="headerItem" style={{ padding: '0 0 26px 0', margin: '0 0 0 3%' }}><b className="headerText">About</b></Menu.Item>
                        <Menu.Item key="4" className="headerItem" style={{ padding: '0 0 26px 2%', margin: '0 0 0 25%' }}><b className="headerText">Sign in →</b></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <div style={{ margin: '3% 0', textAlign: 'center' }}>
                            <b id="captionText">Create a customized meal plan in seconds.</b>
                        </div>
                    </div>

                    <div className="site-layout-content" className="main" style={{ minHeight: 1000 }}>
                        <div class="column" style={{margin: '3% 5% '}}>
                            <p className="leftColumnText">I want to eat  
                            <InputNumber min={1000} max={10000} defaultValue={2000} step = {100} onChange={this.onChange} />
                            calories today.</p>
                        </div>
                        <div className="divider"/>
                        <div class="column" style={{margin: '3% 5%'}}>
                            Blind would equal while oh mr do style. Lain led and fact none. One preferred sportsmen resolving the happiness continued. High at of in loud rich true. Oh conveying do immediate acuteness in he. Equally welcome her set nothing has gravity whether parties. Fertile suppose shyness mr up pointed in staying on respect.

                            Behind sooner dining so window excuse he summer. Breakfast met certainty and fulfilled propriety led. Waited get either are wooded little her. Contrasted unreserved as mr particular collecting it everything as indulgence. Seems ask meant merry could put. Age old begin had boy noisy table front whole given.

                            Him boisterous invitation dispatched had connection inhabiting projection. By mutual an mr danger garret edward an. Diverted as strictly exertion addition no disposal by stanhill. This call wife do so sigh no gate felt. You and abode spite order get. Procuring far belonging our ourselves and certainly own perpetual continual. It elsewhere of sometimes or my certainty. Lain no as five or at high. Everything travelling set how law literature.
                            
                        </div>

                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
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
