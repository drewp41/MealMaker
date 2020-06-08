import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    GithubOutlined, LinkedinFilled,
    MailOutlined, CheckCircleOutlined
} from '@ant-design/icons';

import FeedbackModal from '../components/FeedbackModal';

import whiteLogo from '../whiteLogo.svg';

function copyToClipboard(text) {
    // from good ol' stack overflow
    var dummy = document.createElement("textarea");
    // to avoid breaking origin page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea".
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function Footer(props) {

    const [displayEmail, setDisplayEmail] = useState(false);
    const [showModal, setShowModal] = useState(false)

    function closeModal() {
        setShowModal(false);
    }

    return (
        <>
            <FeedbackModal visible={showModal} closeModal={closeModal} />
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
                        <Link to='/'>
                            Home
                        </Link>
                        <Link to='/howitworks'>
                            How it works
                        </Link>
                        <Link to='/about'>
                            About
                        </Link>
                        <a onClick={() => setShowModal(true)} style={{ color: '#fff' }}>
                            Feedback
                        </a>
                        <a href='https://github.com/drewp41/MealMaker'>
                            Source code
                        </a>
                    </div>
                    <div className='footerSocials'>
                        <a href='https://github.com/drewp41'>
                            <GithubOutlined style={{ fontSize: '26px' }} />
                        </a>
                        <a href='https://www.linkedin.com/in/andrew-paul-5a5036178/'>
                            <LinkedinFilled style={{ fontSize: '26px' }} />
                        </a>
                        <span className='footerEmail' onClick={() => setDisplayEmail(!displayEmail)}>
                            <MailOutlined style={{ fontSize: '26px' }} />
                        </span>
                    </div>
                    {displayEmail &&
                        <div className='footerEmailText' >
                            {copyToClipboard('drewpaul4141@gmail.com')}
                            <CheckCircleOutlined />&nbsp; Copied to clipboard
                        <div className='space8' />
                        drewpaul4141@gmail.com
                    </div>
                    }
                    <div className='footerCopyright'>
                        © 2020 Andrew Paul
                </div>
                </div>
            </div >
        </>
    )
}

export default Footer;