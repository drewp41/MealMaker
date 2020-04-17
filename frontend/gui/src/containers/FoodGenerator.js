// file for creating the actual meal plan
import { Creds } from './Credentials'

import axios from "axios";

const apiURL = 'https://api.spoonacular.com/recipes/complexSearch';
const apiKey = '?apiKey=' + Creds.key;

async function fetchData(cals, numMeals, carbs, protein, fat) {
    const approxCals = Math.floor(cals / numMeals);
    const minCals = approxCals - 50;
    const maxCals = approxCals + 50;
    const url = `${apiURL}${apiKey}`
        + `&minCalories=${minCals}&maxCalories=${maxCals}&number=${numMeals}&minCarbs=0&minProtein=0&minFat=0&type=main+course`
        + `&instructionsRequired=true&addRecipeInformation=true&maxReadyTime=45&fillIngredients=true&sort=random`;
    try {
        const data = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error, "error");
    }
}

export async function fetchMeals(cals, numMeals, carbs = 0, protein = 0, fat = 0) {
    return fetchData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const data = d.data.results;
            // ======== DATA CLEANUP ========
            // return an array of meals
            // with each meal of the form
            // [name of food, calories, carbs, protein, fat, ingredients]
            let res = []
            data.forEach(elem => {
                let name = elem.title;
                let calories = Math.floor(elem.nutrition[0].amount);
                let carbs = Math.floor(elem.nutrition[3].amount);
                let protein = Math.floor(elem.nutrition[1].amount);
                let fat = Math.floor(elem.nutrition[2].amount);
                let ingredients = []
                elem.missedIngredients.forEach((ing) => {
                    ingredients.push(ing.original)
                })
                let obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients
                };
                res.push(obj);
            });
            // fill in with rest of the meals with empty results
            for (let i = 0; i < 6 - numMeals; i++) {
                res.push({
                    name: '', calories: 0, carbs: 0,
                    protein: 0, fat: 0, ingredients: []
                })
            }
            // console.log(res);
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