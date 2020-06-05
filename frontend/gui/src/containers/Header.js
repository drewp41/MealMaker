import React, { useState } from 'react';

import { Menu, Dropdown } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

import logo from '../logo.svg';
import { UserOutlined } from '@ant-design/icons';


const { SubMenu } = Menu;

function Header(props) {
    const [headerHeight, setHeaderHeight] = useState('80px');
    const [hamburger, setHamburger] = useState(false);
    const [rotateClass, setRotateClass] = useState('logoIcon');

    const rotateIcon = () => {
        localStorage.clear();
        if (rotateClass === 'logoIconRotate')
            return;
        setRotateClass('logoIconRotate');
        setTimeout(() => {
            setRotateClass('logoIcon');
        }, 1100);
    }

    const onMenuClick = (event) => {
        if (event.key === '1') {

        } else if (event.key === '2') {

        } else {
            return props.logout();
        }
    }

    return (
        <>
            <div id="topLine" />
            <div className='header' style={{ height: headerHeight }} >
                <div className='rowHeader'>
                    <div className='headerLRSpace'></div>
                    <div className='logoIcon' style={{ padding: '8px 0 0 0' }}>
                        <button onClick={rotateIcon} style={{ height: '50px', width: '56px' }}>
                            <img className={rotateClass} src={logo} alt="carrot" style={{ width: 35, height: 35, margin: '0 -18px 0px 0' }} draggable='false' />
                        </button>
                    </div>
                    {/* shifted down 15px to center it vertically in the header */}
                    <div className='colHeaderL' style={{ padding: '15px 0 0 0' }}>
                        <Link to='/'>
                            <button className='logoText' style={{ height: '50px', width: '180px' }}
                                onClick={() => { }}>
                                mealmaker.io
                        </button>
                        </Link>
                    </div>

                    <div className='headerCenterLeftSpace'></div>

                    {/* shifted down 10px to center it vertically in the header */}
                    <div className='colHeaderMid' style={{ padding: '15px 0 0 0' }}>
                        <Link to='/howitworks'>
                            <button className="headerText" style={{ height: '50px', width: '135px' }}>
                                How it works
                            </button>
                        </Link>
                        <Link to='/about'>
                            <button className="headerText" style={{ height: '50px', width: '85px' }}>
                                About
                            </button>
                        </Link>
                    </div>

                    <div className='headerCenterRightSpace'></div>

                    {/* shifted down 15px to center it vertically in the header */}
                    <div className='colHeaderR' style={{ padding: '0px 0 0 0' }}>
                        {props.isAuthenticated ?
                            // <button className="headerText" style={{ height: '50px', width: '110px' }} onClick={() => {
                            //     console.log('hi');
                            //     return props.logout();
                            // }}>
                            //     <span id="signInArrow">Sign out</span> <span style={{ fontFamily: 'Inter' }}> →</span>
                            // </button>
                            <Dropdown className='headerAccountIcon' placement="bottomRight"
                                overlay={
                                    <Menu>
                                        <Menu.ItemGroup title="Account">
                                            <Menu.Item key="1">Saved meals</Menu.Item>
                                            <Menu.Item key="2">Preferences</Menu.Item>
                                            <Menu.Item key="3" onClick={() => props.logout()}>
                                                Sign out →
                                            </Menu.Item>
                                        </Menu.ItemGroup>
                                    </Menu>
                                }>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <UserOutlined style={{ fontSize: '18px' }} />
                                </a>
                            </Dropdown>
                            // <Menu selectedKeys={[1]} mode="horizontal">
                            //     <SubMenu title="Navigation Three - Submenu">
                            //         <Menu.ItemGroup title="Item 1">
                            //             <Menu.Item key="setting:1">Option 1</Menu.Item>
                            //             <Menu.Item key="setting:2">Option 2</Menu.Item>
                            //         </Menu.ItemGroup>
                            //         <Menu.ItemGroup title="Item 2">
                            //             <Menu.Item key="setting:3">Option 3</Menu.Item>
                            //             <Menu.Item key="setting:4">Option 4</Menu.Item>
                            //         </Menu.ItemGroup>
                            //     </SubMenu>
                            // </Menu>
                            :
                            <Link to='/signin'>
                                <button className="headerText" style={{ height: '50px', width: '110px' }}>
                                    <span id="signInArrow">Sign in</span> <span> →</span>
                                </button>
                            </Link>}
                    </div>

                    {/* shifted down 30px to center it vertically in the header */}
                    <div className='hamburgerMenu' style={{ padding: '30px 25px 0 0', margin: '0 0 0 auto' }}>
                        <button className=
                            {hamburger ? 'hamburger hamburger--slider is-active'
                                : 'hamburger hamburger--slider'}
                            type="button"
                            onClick={e => {
                                setHeaderHeight(prev => prev === '250px' ? '80px' : '250px');
                                setHamburger(prev => !prev);
                            }}>
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>

                    <div className='headerLRSpace'></div>
                </div>
                <div className='condensedHeader'>
                    <Link to='/howitworks'>
                        <button className='condensedHeaderText' style={{ height: '45px', width: '120px' }}>How it works</button>
                    </Link>
                    <Link to='about'>
                        <button className='condensedHeaderText' style={{ height: '45px', width: '70px' }}>About</button>
                    </Link>
                    <Link to='signin'>
                        <button className='condensedHeaderText' style={{ height: '45px', width: '80px' }}>Sign in</button>
                    </Link>
                </div>
            </div>

            <div className='headerBorder' />

            {/* {props.children} */}

        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Header));