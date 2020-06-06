import React, { useState } from 'react';
import { Input } from 'antd';
import { useHistory } from 'react-router-dom';

import {
    GithubOutlined, LinkedinFilled,
    MailOutlined,
} from '@ant-design/icons';

{/* It tasts better when it's effortless. */ }
{/* It does everything but make the sandwich. */ }

function SignupPanel(props) {

    const [email, setEmail] = useState('');

    const history = useHistory();

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
                    <Input className='signupPanelEmail' placeholder='Email' size='large'
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <a className={['genButton', 'signupPanelInputButton'].join(' ')}
                        onClick={() => {
                            history.push(`/signup#${email}`);
                        }}>
                        SIGN UP
                    </a>
                    <div className='signupPanelInputFiller' />
                </div>
                <div className='signupPanelFillerLR' />
            </div>
        </div>
    )
}

export default SignupPanel;