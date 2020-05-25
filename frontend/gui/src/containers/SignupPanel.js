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
                    <Input className='signupPanelEmail' placeholder='Email' size='large' />
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