import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Checkbox } from 'antd';

import logo from '../logo.svg';

// green text: #40a66e


function SignIn() {

    let [showPass, setShowPass] = useState(false);

    let userRef = React.createRef();
    let passRef = React.createRef();

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
                        <span className='logoText' style={{ color: '#585858', padding: '0 0 0 8px' }}>
                            mealmaker.io
                        </span>
                    </Link>
                </div>
                <div className='space32' />

                <a className='signinTextAbove' onClick={() => userRef.current.focus()}>Email</a>
                <Input className='signinEmail' size='large' ref={userRef} />
                <div className='space32' />

                <a className='signinTextAbove' onClick={() => passRef.current.focus()}>Password</a>
                <a className='signinForgot' onClick={() => console.log('forgot')}>Forgot your password?</a>
                <Input.Password className='signinPassword' id='pass' size='large' ref={passRef} />
                <div className='space32' />

                <Checkbox className='signinCheckbox' defaultChecked={true} onChange={() => console.log('check')}>
                    Stay signed in
                </Checkbox>
                <div className='space32' />

                <a className='signinButton' style={{ color: '#47B57A' }} onClick={() => console.log('sign in')}>
                    Sign in
                </a>
                <div className='space32' />

                <div style={{ textAlign: 'center' }}>
                    <span>Don't have an account?</span>
                    <a onClick={() => console.log('make account')} style={{ color: '#40a66e' }}>&nbsp;&nbsp;Sign up</a>
                </div>
            </div>
        </div >
    )
}

export default SignIn;