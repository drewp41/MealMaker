// file for creating the actual meal plan
import { Creds } from './Credentials'

import axios from "axios";

const apiURL = "https://api.edamam.com/search?q=";
const apiKey = "&app_key=" + Creds.key;
const apiId = "&app_id=" + Creds.id;
const maxTime = "&time=30";
const maxIngreds = `&ingr=10`;

async function fetchData(food) {
    try {
        const url = `${apiURL}${food}${maxIngreds}${maxTime}${apiId}${apiKey}`;
        const data = await axios.get(url)
        return data;
    } catch (error) {
        console.log(error, "error");
    }
}

export async function fetchMeals(food) {
    return fetchData(food)
        .then(d => {
            const data = d.data.hits.slice(0, 3);
            // return a list of meals
            // with each meal of the form
            // [name of food, calories, carbs, protein, fat, ingredients]
            let res = []
            data.forEach(elem => {
                let name = elem.recipe.label;
                let calories = Math.floor(elem.recipe.calories);
                let carbs = Math.floor(elem.recipe.totalNutrients.CHOCDF.quantity);
                let protein = Math.floor(elem.recipe.totalNutrients.PROCNT.quantity);
                let fat = Math.floor(elem.recipe.totalNutrients.FAT.quantity);
                let ingredients = elem.recipe.ingredients;
                let obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients
                };
                res.push(obj);
            });
            return res;
        });
}

// (async function() {
//     await yourFunction();
//   })();

//   Or resolve the promise :

//   yourFunction().then(result => {
//     // ...
//   }).catch(error => {
//     // if you have an error
//   })