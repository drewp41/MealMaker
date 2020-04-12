// file for creating the actual meal plan
import { Creds } from './Credentials'

import axios from "axios";

const apiURL = 'https://api.spoonacular.com/recipes/complexSearch';
const apiKey = '?apiKey=' + Creds.key;

async function fetchData(cals, numMeals, carbs, protein, fat) {
    const url = `${apiURL}${apiKey}&minCalories=300&maxCalories=650&maxCarbs=100&minProtein=5&sort=random&number=3&instructionsRequired=true&addRecipeInformation=true&maxReadyTime=45&minFat=0&fillIngredients=true`;
    try {
        const data = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error, "error");
    }
}

export async function fetchMeals(cals, numMeals = 3, carbs = 0, protein = 0, fat = 0) {
    // console.log(cals, numMeals, carbs, protein, fat);
    return fetchData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const data = d.data.results;
            // return a list of meals
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
                elem.missedIngredients.forEach(ing => {
                    ingredients.push(ing.original)
                })
                let obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients
                };
                res.push(obj);
            });
            // console.log(res);
            return res;
        });
}


// const apiURL = "https://api.edamam.com/search?q=";
// const apiKey = "&app_key=" + Creds.key;
// const apiId = "&app_id=" + Creds.id;
// const maxTime = "&time=60";
// const maxIngreds = `&ingr=10`;

// async function fetchData(food, cals, numMeals, carbs, protein, fat) {
//     const url = `${apiURL}${food}${maxIngreds}${maxTime}${apiId}${apiKey}`;
//     try {
//         const data = await axios.get(url)
//         return data;
//     } catch (error) {
//         console.log(error, "error");
//     }
// }

// export async function fetchMeals(cals, numMeals = 3, carbs = 0, protein = 0, fat = 0) {
//     console.log(cals, numMeals, carbs, protein, fat);
//     const lst = ['chicken'];

//     var food = lst[Math.floor(Math.random() * lst.length)];

//     return fetchData(food, cals, numMeals, carbs, protein, fat)
//         .then(d => {
//             const data = d.data.hits.slice(0, 3);
//             // return a list of meals
//             // with each meal of the form
//             // [name of food, calories, carbs, protein, fat, ingredients]
//             let res = []
//             data.forEach(elem => {
//                 let name = elem.recipe.label;
//                 let calories = Math.floor(elem.recipe.calories);
//                 let carbs = Math.floor(elem.recipe.totalNutrients.CHOCDF.quantity);
//                 let protein = Math.floor(elem.recipe.totalNutrients.PROCNT.quantity);
//                 let fat = Math.floor(elem.recipe.totalNutrients.FAT.quantity);
//                 let ingredients = elem.recipe.ingredients;
//                 let obj = {
//                     name: name, calories: calories, carbs: carbs,
//                     protein: protein, fat: fat, ingredients: ingredients
//                 };
//                 res.push(obj);
//             });
//             return res;
//         });
// }

// (async function() {
//     await yourFunction();
//   })();

//   Or resolve the promise :

//   yourFunction().then(result => {
//     // ...
//   }).catch(error => {
//     // if you have an error
//   })