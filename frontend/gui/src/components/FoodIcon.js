import React, { useState, useEffect } from 'react';

import { getName } from './GetFoodName';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../FoodIcons', false, /\.svg$/));

const FoodIcon = (props) => {

    return (
        <img src={images[getName(props.name)]} alt={'food' + 'image'}
            style={{ width: 90, height: 90 }} />
    )
}

export default FoodIcon;