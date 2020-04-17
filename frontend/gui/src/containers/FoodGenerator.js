// file for creating the actual meal plan
import { Creds } from './Credentials'

import axios from "axios";

const apiURL = 'https://api.spoonacular.com/recipes/complexSearch';
const apiKey = '?apiKey=' + Creds.key;

async function fetchData(cals, numMeals, carbs, protein, fat) {
    const approxCals = Math.floor(cals / numMeals);
    const minCals = approxCals - 100;
    const maxCals = approxCals + 100;
    const url = `${apiURL}${apiKey}`
        + `&minCalories=${minCals}&maxCalories=${maxCals}&number=20&minCarbs=0&minProtein=0&minFat=0&type=breakfast,brunch,morning%20meal,main%20course`
        + `&instructionsRequired=true&addRecipeInformation=true&maxReadyTime=60&fillIngredients=true&sort=random`
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
            let includedBreakfast = false;
            data.forEach(elem => {
                let name = elem.title;
                let calories = Math.floor(elem.nutrition[0].amount);
                let carbs = Math.floor(elem.nutrition[3].amount);
                let protein = Math.floor(elem.nutrition[1].amount);
                let fat = Math.floor(elem.nutrition[2].amount);
                // find the breakfast item
                let type = elem.dishTypes;
                let isBreakfast = type.includes("breakfast") || type.includes("brunch") || type.includes("morning meal");
                console.log(isBreakfast);
                // clean this up later
                let instructions = elem.analyzedInstructions;
                let ingredients = [];
                elem.missedIngredients.forEach((ing) => {
                    ingredients.push(ing.original)
                })
                let obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients,
                    type: type, instructions: instructions,
                };
                if (!includedBreakfast && isBreakfast) {
                    res.unshift(obj) //push obj to front of array so breakfast is the 1st meal
                    includedBreakfast = true;
                }
                else {
                    res.push(obj);
                }
            });
            // fill in with rest of the meals with empty results
            // for (let i = 0; i < 6 - numMeals; i++) {
            //     res.push({
            //         name: '', calories: 0, carbs: 0,
            //         protein: 0, fat: 0, ingredients: [],
            //         type: [], instructions: []
            //     })
            // }
            return res.slice(0, 6);
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