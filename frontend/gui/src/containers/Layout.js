import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

import Footer from './Footer';
import SignupPanel from './SignupPanel';
import InfoPanel from './InfoPanel';

const { Header, Content } = Layout;

class CustomLayout extends React.Component {
    render() {
        return (
            <>
                <Layout className="layout" >
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            {
                                this.props.isAuthenticated
                                    ?
                                    <Menu.Item key="2" onClick={this.props.logout}>
                                        Logout
                                </Menu.Item>
                                    :
                                    <Menu.Item key="2">
                                        <Link to="/login">Log in</Link>
                                    </Menu.Item>
                            }


                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to='/'>List</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout >
                <InfoPanel />

                <SignupPanel />

                <Footer />
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));