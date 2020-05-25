import React from 'react';

import { Input } from 'antd';

import {
    GithubOutlined, LinkedinFilled,
    MailOutlined,
} from '@ant-design/icons';

function SignupPanel(props) {
    return (
        <div className='signupPanel'>
            <div className='signupPanelBody'>
                <div className='signupPanelReadyText'>
                    <span style={{ color: '#40a66e' }}>Ready to get your diet on track?</span>
                    Join Meal Maker today.
                </div>
                <div className='signupPanelInput'>
                    <Input placeholder='Email' size='large'
                        style={{
                            width: '200px', height: '40px', margin: '0 25px 0 0', fontFamily: 'Camphor', border: 'none',
                            boxShadow: '0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)'
                        }} />
                    <a className='genButton' onClick={() => console.log('hi')}
                        style={{ color: 'white', borderRadius: '4px', fontFamily: 'Camphor' }}>
                        SIGN UP
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SignupPanel;