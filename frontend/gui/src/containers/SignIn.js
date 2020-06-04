import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Checkbox, Form, Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

import logo from '../logo.svg';

// green text: #40a66e


const SignIn = (props) => {

    let [showPass, setShowPass] = useState(false);

    let emailRef = React.createRef();
    let passRef = React.createRef();

    function onClickSignin() {
        console.log(passRef);
    }

    const onFinish = values => {
        console.log('Received values of form: ', values);
        props.onAuth(values.username, values.password);
    }

    return (
        <div className='signinPage'>
            <div style={{ height: '60px' }} />
            <div className='signinLogo'>

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
                <div className='space32' />
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    //onFinish={this.handleSubmit}
                    onFinish={onFinish}
                // onFinishFailed={this.onFinishFailed}
                >

                    <a className='signinTextAbove' onClick={() => {
                        emailRef.current.focus();
                        console.log(props.isAuthenticated);
                    }}>Email</a>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input className='signinField' size='large' ref={emailRef} />
                    </Form.Item>
                    <div className='space32' />

                    <a className='signinTextAbove' onClick={() => passRef.current.focus()}>Password</a>
                    <a className='signinForgot' onClick={() => console.log('forgot')}>Forgot your password?</a>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input type="password" className='signinField' size='large' ref={passRef} />
                    </Form.Item>
                    <div className='space32' />
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form>

                <Checkbox className='signinCheckbox' defaultChecked={true} onChange={() => console.log('check')}>
                    Stay signed in
                </Checkbox>
                <div className='space32' />

                <a className='signinButton' style={{ color: '#47B57A' }} onClick={onClickSignin}>
                    Sign in
                </a>
                <div className='space32' />

                <div style={{ textAlign: 'center' }}>
                    <span>Don't have an account?</span>
                    <Link to='/signup'>
                        <a className='signinBottomText' onClick={() => console.log('make account')}>&nbsp;&nbsp;Sign up</a>
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

// required for connect
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

// dispatch because we're calling on onAuth with the username and password
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)