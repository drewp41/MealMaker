import React, { useState } from 'react';
import {
    Slider
} from 'antd';
import {
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

const Sliders = (props) => {

    return (
        <div className='inputMacroSlider'>
            <div style={{ width: '220px' }}>
                {/* Carbs */}
                <span className='macroSliderText' style={{ float: 'left' }}>
                    Carbs &nbsp;
                    {props.macroPinned === null ?
                        <PushpinOutlined className='macroPin' onClick={() => props.pinMacro(1)} /> :
                        (props.macroPinned === 1 ?
                            <PushpinFilled className='macroPin' onClick={() => props.pinMacro(1)} /> :
                            null)
                    }
                </span>
                <span className='macroSliderText' style={{ float: 'right' }}>
                    {Math.round(props.macros.carbs)} g
                </span>
                <br />
                <Slider defaultValue={45} tipFormatter={val => `${val}%`} min={15} max={70}
                    value={Math.round((props.macros.carbs * 4) / (props.calories / 100))}
                    disabled={props.macroPinned === 1}
                    onChange={(percent) => props.carbSlider(percent)}
                />
                {/* Protein */}
                <span className='macroSliderText' style={{ float: 'left' }}>
                    Protein &nbsp;
                    {props.macroPinned === null ?
                        <PushpinOutlined className='macroPin' onClick={() => props.pinMacro(2)} /> :
                        (props.macroPinned === 2 ?
                            <PushpinFilled className='macroPin' onClick={() => props.pinMacro(2)} /> :
                            null)
                    }
                </span>
                <span className='macroSliderText' style={{ float: 'right' }}>
                    {Math.round(props.macros.protein)} g
                </span>
                <br />
                <Slider defaultValue={30} tipFormatter={val => `${val}%`} min={15} max={70}
                    value={Math.round((props.macros.protein * 4) / (props.calories / 100))}
                    disabled={props.macroPinned === 2}
                    onChange={(percent) => props.proteinSlider(percent)}
                />
                {/* Fat */}
                <span className='macroSliderText' style={{ float: 'left' }}>
                    Fat &nbsp;
                        {props.macroPinned === null ?
                        <PushpinOutlined className='macroPin' onClick={() => props.pinMacro(3)} /> :
                        (props.macroPinned === 3 ?
                            <PushpinFilled className='macroPin' onClick={() => props.pinMacro(3)} /> :
                            null)
                    }
                </span>
                <span className='macroSliderText' style={{ float: 'right' }}>
                    {Math.round(props.macros.fat)} g
                </span>
                <br />
                <Slider defaultValue={25} tipFormatter={val => `${val}%`} min={15} max={70}
                    value={Math.round((props.macros.fat * 9) / (props.calories / 100))}
                    disabled={props.macroPinned === 3}
                    onChange={(percent) => props.fatSlider(percent)}
                />
            </div>
        </div>
    )
}

export default Sliders;