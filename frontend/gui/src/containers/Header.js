import React, { useState } from 'react';

import coloredCarrot from '../coloredCarrot.svg';

function Header(props) {
    const [headerHeight, setHeaderHeight] = useState('80px');
    const [hamburger, setHamburger] = useState(false);

    return (
        <>
            <div className='header' style={{ height: headerHeight }} >
                <div className='rowHeader'>
                    <div className='headerLRSpace'></div>
                    <a href='#'>
                        <img src={coloredCarrot} alt="logo" style={{ width: 35, height: 35, margin: '20px 0 0 18px' }} draggable='false' />
                    </a>
                    {/* shifted down 21.5px to center it vertically in the header */}
                    <div className='colHeaderL' style={{ padding: '21.5px 0 0 9px' }}>
                        <a style={{ color: '#545454' }}>
                            <div className='logoText'>
                                mealmaker.io
                                    </div>
                        </a>
                    </div>

                    <div className='headerCenterLeftSpace'></div>

                    {/* shifted down 10px to center it vertically in the header */}
                    <div className='colHeaderMid' style={{ padding: '10px 0 0 0' }}>
                        <button className="headerText" style={{ height: '60px', width: '150px' }}>
                            How it works
                                </button>
                        <button className="headerText" style={{ height: '60px', width: '100px' }}>
                            About
                                </button>
                    </div>

                    <div className='headerCenterRightSpace'></div>

                    {/* shifted down 10px to center it vertically in the header */}
                    <div className='colHeaderR' style={{ padding: '10px 0 0 0' }}>
                        <button className="headerText" style={{ height: '60px', width: '130px' }}>
                            <text id="signInArrow">&nbsp;&nbsp;&nbsp;&nbsp;Sign in</text> <text > →</text>
                        </button>
                    </div>

                    {/* shifted down 30px to center it vertically in the header */}
                    <div className='hamburgerMenu' style={{ padding: '30px 25px 0 0', margin: '0 0 0 auto' }}>
                        <button className=
                            {hamburger ? 'hamburger hamburger--slider is-active'
                                : 'hamburger hamburger--slider'}
                            type="button"
                            onClick={e => {
                                setHeaderHeight(prev => prev === '250px' ? '80px' : '250px');
                                setHamburger(prev => !prev);
                            }}>
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>

                    <div className='headerLRSpace'></div>
                </div>
                <div className='condensedHeader'>
                    <button className='condensedHeaderText' style={{ height: '45px', width: '120px' }}>How it works</button>
                    <button className='condensedHeaderText' style={{ height: '45px', width: '70px' }}>About</button>
                    <button className='condensedHeaderText' style={{ height: '45px', width: '80px' }}>Sign in</button>
                </div>
            </div>

            <div className='headerBorder' />
        </>
    )
}

export default Header;