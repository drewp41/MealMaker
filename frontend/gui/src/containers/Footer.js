import React from 'react';

import {
    GithubOutlined, LinkedinFilled,
    MailOutlined,
} from '@ant-design/icons';

import whiteLogo from '../whiteLogo.svg';

function Footer(props) {
    return (
        <div className='footer'>
            {/* background: rgb(27,28,29) and dividers: rgb(50,51,52) */}
            <div className='footerBody'>
                <div style={{ display: 'flex' }}>
                    <img src={whiteLogo} alt="logo" style={{ width: 32, height: 32, margin: '-5px 0 0 0' }} draggable='false' />
                    <span className='logoText' style={{ color: '#FFF', padding: '0 0 0 8px' }}>
                        mealmaker.io
                    </span>
                </div>

                <div className='footerLinks'>
                    <a href='#'>Home</a>
                    <a href='#'>How it works</a>
                    <a href='#'>About</a>
                    <a href='#'>Feedback</a>
                    <a href='#'>Source code</a>
                </div>
                <div className='footerSocials'>
                    <a href='#'> <GithubOutlined style={{ fontSize: '26px' }} /> </a>
                    <a href='#'> <LinkedinFilled style={{ fontSize: '26px' }} /> </a>
                    <a href='#'> <MailOutlined style={{ fontSize: '26px' }} /> </a>
                </div>
                <div className='footerCopyright'>
                    © 2020 Andrew Paul
                </div>
            </div>
        </div>
    )
}

export default Footer;