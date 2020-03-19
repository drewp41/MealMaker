import React from 'react';
import { Layout, Menu, Divider } from 'antd';
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
                        <Menu.Item key="2" style={{ padding: '0 0 25px 0', margin: '0 0 0 0' }}><b id="logo">Macro Meal Maker</b></Menu.Item>
                        <Menu.Item key="3" style={{ padding: '0 0 25px 0', margin: '0 0 0 20%' }}><b id="header">How it works</b></Menu.Item>
                        <Menu.Item key="4" style={{ padding: '0 0 25px 0', margin: '0 0 0 3%' }}><b id="header">About</b></Menu.Item>
                        <Menu.Item key="4" style={{ padding: '0 0 25px 2%', margin: '0 0 0 22%' }}><b id="header">Sign in →</b></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content" style={{ minHeight: 1200 }}>
                        Content
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
