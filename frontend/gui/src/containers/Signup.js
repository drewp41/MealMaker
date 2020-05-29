import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Checkbox } from 'antd';

import logo from '../logo.svg';

// green text: #40a66e


function SignIn() {

    let emailRef = React.createRef();
    let userRef = React.createRef();
    let passRef = React.createRef();
    let confirmPassRef = React.createRef();

    return (
        <div className='signinPage'>
            <div style={{ height: '60px' }} />
            <div className='signinLogo'>
                {/* <Link to='/'>
                    <img src={logo} alt="logo" style={{ width: 32, height: 32, margin: '-5px 0 0 0' }} draggable='false' />
                </Link>
                <Link to='/'>
                    <span className='logoText' style={{ color: '#585858', padding: '0 0 0 8px' }}>
                        mealmaker.io
                    </span>
                </Link> */}
            </div>
            <div className='signinBox'>
                {/* padding centers it a little better */}
                <div style={{ textAlign: 'center', padding: '0 6px 0 0' }}>
                    <Link to='/'>
                        <img src={logo} alt="logo" style={{ width: 32, height: 32, margin: '-20px 0 0 0' }} draggable='false' />
                    </Link>
                    <Link to='/'>
                        <span className='logoText' style={{ padding: '0 0 0 8px' }}>
                            mealmaker.io
                        </span>
                    </Link>
                </div>
                <div className='space20' />

                <a className='signinTextAbove' onClick={() => emailRef.current.focus()}>Email</a>
                <Input className='signinField' size='middle' ref={emailRef} />
                <div className='space20' />

                <a className='signinTextAbove' onClick={() => userRef.current.focus()}>Username</a>
                <Input className='signinField' size='middle' ref={userRef} />
                <div className='space20' />

                <a className='signinTextAbove' onClick={() => passRef.current.focus()}>Password</a>
                <Input.Password className='signinField' size='middle' ref={passRef} visibilityToggle={false} />
                <div className='space20' />

                <a className='signinTextAbove' onClick={() => confirmPassRef.current.focus()}>Confirm password</a>
                <Input.Password className='signinField' size='middle' ref={confirmPassRef} visibilityToggle={false} />
                <div className='space20' />

                {/* <Checkbox className='signinCheckbox' defaultChecked={true} onChange={() => console.log('check')}>
                    Stay signed in
                </Checkbox>
                <div className='space32' /> */}

                <a className='signinButton' style={{ color: '#47B57A' }} onClick={() => console.log('sign in')}>
                    Create Account
                </a>
                <div className='space20' />

                <div style={{ textAlign: 'center' }}>
                    <span>Have an account?</span>
                    <Link to='/signin'>
                        <a className='signinBottomText' onClick={() => console.log('make account')}>&nbsp;&nbsp;Sign in</a>
                    </Link>
                </div>
            </div>
            <div className='space64' />
            <div className='space64' />
            <div className='signinCopyright'>
                © 2020 Andrew Paul
            </div>
        </div >
    )
}

export default SignIn;