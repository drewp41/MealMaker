import React, { useState, useEffect } from 'react';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../FoodIcons', false, /\.svg$/));

const foodNames = ['Waffle', 'Pancake', 'Burrito', 'Sub', 'Sandwich', 'Turkey', 'Pizza', 'Salmon', 'Rice', 'Salad',
    'Chicken', 'Sausage', 'Steak', 'Soda', 'Water', 'Fish', 'Pitcher', 'Can', 'Egg', 'Bread', 'Jelly',
    'Drink', 'Smoothie', 'Coffee', 'Tea', 'Peanut', 'Breakfast', 'Milk', 'Lemonade', 'Green', 'Honey',
    'Cucumber', 'Carrot', 'Corn', 'Eggplant', 'Apple', 'Pear', 'Pineapple', 'Banana', 'Chinese', 'Chips',
    'Clams', 'Octopus', 'Shrimp', 'Lobster', 'Sushi', 'Donut', 'Cake', 'Cupcake', 'Pastry', 'Pie', 'Pretzel', 'Cookie', 'Dessert',
    'Tomato', 'Onion', 'Pepper', 'Garlic', 'Kiwi', 'Radish', 'Lemon', 'Orange', 'Spicy', 'Potato', 'Olive', 'Strawberry', 'Plum',
    'Peach', 'Grapefruit', 'Pea', 'Cabbage', 'Brocolli', 'Pumpkin', 'Grape', 'Cherry', 'Watermelon', 'Cream', 'Bacon', 'Ribs', 'Candy', 'Chocolate', 'Popsicle', 'Burger', 'Taco',
    'Dog', 'Fries', 'Cheese', 'Other'];


const FoodIcon = (props) => {

    function getName() {
        const query = props.name;
        let resFood = null;
        let found = false;
        foodNames.forEach(word => {
            if (!found) {
                // case sensitive bc all the meals in the databse start with a capital letter
                // and so you don't match "egg" with "Veggie Pancakes"
                if (query.includes(word)) {
                    resFood = word;
                    found = true;
                }
            }
        });
        if (resFood)
            return resFood + '.svg';
        else
            return 'Other.svg';
    }

    return (
        <img src={images[getName()]} alt={'food' + 'image'}
            style={{ width: 90, height: 90 }} />
    )
}

export default FoodIcon;