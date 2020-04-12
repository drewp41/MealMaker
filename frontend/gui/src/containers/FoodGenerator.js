// file for creating the actual meal plan
import { Creds } from './Credentials'

import axios from "axios";

const apiURL = "https://api.edamam.com/search?q=";
const apiKey = "&app_key=" + Creds.key;
const apiId = "&app_id=" + Creds.id;
const maxTime = "&time=30";
const maxIngreds = `&ingr=10`;

async function fetchMeals(food) {
    try {
        const url = `${apiURL}${food}${maxIngreds}${maxTime}${apiId}${apiKey}`;
        const data = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error, "error");
    }
}

let recipes;
let rec = fetchMeals("chicken")
    .then((res) => {
        // console.log(res.data)
        recipes = res.data;
    })

export {
    recipes
}

// console.log(recipes);

// export function hello(calories, numMeals) {
//     // return [calories, numMeals, 'hi'];
//     return res;
// }