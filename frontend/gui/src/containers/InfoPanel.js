import React from 'react';

import {
} from '@ant-design/icons';

import calendar from '../calendar.svg';
import gears from '../gears.svg';
import save from '../save.svg';

import calendar2 from '../calendar2.svg';
import gears2 from '../gears2.svg';
import save2 from '../save2.svg';

// for icons:
// dark green: #338A58
// light green: #51B37E

// ideal square is 45px x 45px with a 16px margin-bottom

function InfoPanel(props) {
    return (
        <div className='infoPanel'>
            <div className='infoSquare'>
                <img className='infoSquareIcon' src={calendar2} alt="calendar" draggable='false'
                    style={{ width: 48, height: 48, marginBottom: '13px' }} />
                <h3 className='infoSquareTitle'>Remove your anxiety</h3>
                <p className='infoSquareText'>
                    Meal Maker will generate all your meals ahead of time.
                    That way, you don’t have to worry about what you’re doing to eat for the next meal.
                </p>
            </div>
            <div className='infoSquare'>
                <img className='infoSquareIcon' src={gears2} alt="calendar" draggable='false'
                    style={{ width: 45, height: 45, marginBottom: '16px' }} />
                <h3 className='infoSquareTitle'>Customize to your needs</h3>
                <p className='infoSquareText'>
                    You can customize your preferences to fit your needs.
                    Whether you liking snacking throughout the day,
                    or need to hit your protein intake, Meal Maker has you covered.
                </p>
            </div>
            <div className='infoSquare'>
                <img className='infoSquareIcon' src={save2} alt="calendar" draggable='false'
                    style={{ width: 42, height: 42, marginBottom: '19px' }} />
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