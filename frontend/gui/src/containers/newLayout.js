import React from 'react';
import { Layout, Menu, Breadcrumb, PageHeader } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

import logo from '../MMM.png';
//<img src={logo} alt="logo" style={{ width: 50, height: 75 }} />

const { Header, Content, Footer } = Layout;

class NewLayout extends React.Component {
    render() {
        return (
            <Layout>
                {/* <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Title"
                    subTitle="This is a subtitle"
                />, */}
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '120px' }}>
                    <div className="logo" inlineIndent='50px' />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '117px' }}
                        selectable={false}
                    >
                        <Menu.Item key="4" style={{ textIndent: '200px' }}><img src={logo} alt="logo" style={{ width: 80, height: 120 }} /></Menu.Item>
                        <Menu.Item key="1"><b>Macro Meal Maker</b></Menu.Item>
                        <Menu.Item key="2" style={{ float: 'right', textIndent: '-400px' }}>About</Menu.Item>
                        <Menu.Item key="3" style={{ float: 'right' }}>How it works</Menu.Item>
                    </Menu>
                </Header>
                < Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }
                }>

                    <div className="site-layout-background" style={{ padding: 24, minHeight: 1200 }}>
                        Content
                    </div>
                </Content >
                <Footer style={{ textAlign: 'center' }}> Footer </Footer>
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
