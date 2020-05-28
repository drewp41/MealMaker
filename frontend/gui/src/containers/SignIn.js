import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

import logo from '../logo.svg';


function SignIn() {
    return (
        <div className='signinPage'>
            <div style={{ height: '60px' }} />
            <div className='signinLogo'>
                <Link to='/'>
                    <img src={logo} alt="logo" style={{ width: 32, height: 32, margin: '-5px 0 0 0' }} draggable='false' />
                </Link>
                {/* <Link to='/'>
                    <span className='logoText' style={{ color: '#585858', padding: '0 0 0 8px' }}>
                        mealmaker.io
                    </span>
                </Link> */}
            </div>
            <div className='signinBox'>
                <span>Email</span>
                <Input className='signinEmail' size='large' />
                <br />
                <br />
                <span>Password</span>
                <a onClick={() => console.log('forgot')} style={{ float: 'right', color: '#40a66e' }}>Forgot your password?</a>
                <Input className='signinPassword' size='large' />
                <br />
                <br />
                <a className='signinButton' onClick={() => console.log('sign in')}>
                    Sign in
                </a>
                <br />
                <br />
                <span>Don't have an account?</span>
                <a onClick={() => console.log('make account')} style={{ color: '#40a66e' }}>&nbsp;&nbsp;Sign up</a>
            </div>
        </div >
    )
}

export default SignIn;