import React from 'react';

import {
} from '@ant-design/icons';

import calendar from '../calendar.svg';
import gears from '../gears.svg';
import save from '../save.svg';

// for icons:
// dark green: #338A58
// light green: #51B37E

function InfoPanel(props) {
    return (
        <div className='infoPanel'>
            <div className='infoSquare'>
                <img className='infoSquareIcon' src={calendar} alt="calendar" draggable='false' />
                <div className='space16' />
                <h3 className='infoSquareTitle'>Remove the anxiety</h3>
                <p className='infoSquareText'>
                    Meal Maker will generate all your meals ahead of time.
                    That way, you don’t have to worry about what you’re doing to eat for the next meal.
                </p>
            </div>
            <div className='infoSquare'>
                <img className='infoSquareIcon' src={gears} alt="calendar" draggable='false' />
                <div className='space16' />
                <h3 className='infoSquareTitle'>Customized to your needs</h3>
                <p className='infoSquareText'>
                    You can customize your preferences to fit your needs.
                    Whether you liking snacking throughout the day,
                    or need to hit your protein intake, Meal Maker has you covered.
                </p>
            </div>
            <div className='infoSquare'>
                <img className='infoSquareIcon' src={save} alt="calendar" draggable='false' style={{ width: '40px', height: '40px', margin: '4px 0 0 0' }} />
                {/* style={{ width: '40px', height: '40px' }} */}
                <div className='space20' />
                {/* <div className='space16' /> */}
                <h3 className='infoSquareTitle'>Save your favorite meals</h3>
                <p className='infoSquareText'>
                    See a meal that peaks your interest?  Use your Meal Maker account to save it for later,
                    or pin it in place to keep it in your future meal plans.
                </p>
            </div>
        </div>
    )
}

export default InfoPanel;