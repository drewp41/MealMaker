import React, { useState } from 'react';

import {
    GithubOutlined,
    LinkedinOutlined, MailOutlined,
} from '@ant-design/icons';

function Footer(props) {
    return (
        <>
            <div style={{ borderTop: '2px solid #e0e0e0', width: '92%', margin: '0 auto' }} />

            {/* background: rgb(27,28,29) and dividers: rgb(50,51,52) */}
            <div className="rowFooter" style={{ margin: '25px 0 0 0', fontFamily: 'Camphor', fontSize: '15px' }}>
                <div className="colFooter" style={{ padding: '0 45px 0 0' }}>
                    <div style={{ float: 'right' }}>
                        <ul style={{ listStyleType: 'none' }}>
                            <li>
                                <a href='#'>How it works</a>
                            </li>
                            <p></p>
                            <li>
                                <a href='#'>Source code</a>
                            </li>
                            <p></p>
                            <li>
                                <a href='#'>About</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="colFooter" style={{ padding: '0 0 0 15px' }}>
                    <ul style={{ listStyleType: 'none', }}>
                        <li>
                            <a href='#'>Feedback</a>
                        </li>
                        <p></p>
                        <li>
                            <a href='#'><GithubOutlined style={{ fontSize: '26px' }} /></a>
                                    &nbsp;&nbsp;
                            <a href='#'><LinkedinOutlined style={{ fontSize: '26px' }} /></a>
                                    &nbsp;&nbsp;
                            <a href='#'><MailOutlined style={{ fontSize: '26px' }} /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Footer;