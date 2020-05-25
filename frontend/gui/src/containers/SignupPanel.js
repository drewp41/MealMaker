import React from 'react';

import { Input } from 'antd';

import {
    GithubOutlined, LinkedinFilled,
    MailOutlined,
} from '@ant-design/icons';

{/* It tasts better when it's effortless. */ }
{/* It does everything but make the sandwich. */ }

function SignupPanel(props) {
    return (
        <div className='signupPanel'>
            <div className='signupPanelBody'>
                <div className='signupPanelFillerLR' />
                <div className='signupPanelReadyText'>
                    <div style={{ color: '#40a66e' }}>
                        Ready to get your diet on track?
                    </div>
                    Join Meal Maker today.
                </div>
                <div className='signupPanelFillerM' />
                <div className='signupPanelInput'>
                    <Input className='signupPanelEmail' placeholder='Email' size='large' />
                    <a className='genButton' onClick={() => console.log('hi')}
                        style={{ color: 'white', fontFamily: 'Camphor', margin: '0 20px 0 0' }}>
                        SIGN UP
                    </a>
                </div>
                <div className='signupPanelFillerLR' />
            </div>
        </div>
    )
}

export default SignupPanel;