// file for creating the actual meal plan
import { Creds } from './Credentials'

import axios from "axios";

const apiURL = 'https://api.spoonacular.com/recipes/complexSearch';
const apiKey = '?apiKey=' + Creds.key;

async function fetchData(cals, numMeals, carbs, protein, fat) {
    const approxCals = Math.floor(cals / numMeals);
    const minCals = approxCals - 100;
    const maxCals = approxCals + 100;
    const breakfastUrl = `${apiURL}${apiKey}`
        + `&minCalories=${minCals}&maxCalories=${maxCals}&number=6&minCarbs=0&minProtein=0&minFat=0&type=breakfast,brunch,morning%20meal,`
        + `&instructionsRequired=true&addRecipeInformation=true&maxReadyTime=60&fillIngredients=true&sort=random`
    const mainUrl = `${apiURL}${apiKey}`
        + `&minCalories=${minCals}&maxCalories=${maxCals}&number=12&minCarbs=0&minProtein=0&minFat=0&type=main%20course`
        + `&instructionsRequired=true&addRecipeInformation=true&maxReadyTime=60&fillIngredients=true&sort=random`
    try {
        const [breakfastData, mainData] = await Promise.all([
            axios.get(breakfastUrl),
            axios.get(mainUrl),
        ]);
        return [breakfastData, mainData];
    } catch (error) {
        console.log(error, "error");
    }
}

export async function fetchMeals(cals, numMeals, carbs = 0, protein = 0, fat = 0) {
    return fetchData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const breakfastData = d[0].data.results;
            const mainData = d[1].data.results;
            // return an array of meals
            // with each meal of the form
            // [name of food, calories, carbs, protein, 
            /// fat, ingredients, instructions]

            // ======== BREAKFAST MEALS ========
            let breakfastRes = [];
            breakfastData.forEach(elem => {
                const name = elem.title;
                const calories = Math.floor(elem.nutrition[0].amount);
                const carbs = Math.floor(elem.nutrition[3].amount);
                const protein = Math.floor(elem.nutrition[1].amount);
                const fat = Math.floor(elem.nutrition[2].amount);
                let instructions = [];
                elem.analyzedInstructions[0].steps.forEach((inst) => {
                    instructions.push(inst.step);
                })
                let ingredients = [];
                elem.missedIngredients.forEach((ing) => {
                    ingredients.push(ing.original);
                })
                const obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients,
                    instructions: instructions,
                };
                breakfastRes.push(obj);
            })

            // ======== MAIN MEALS ========
            let mainRes = [];
            mainData.forEach(elem => {
                const name = elem.title;
                const calories = Math.floor(elem.nutrition[0].amount);
                const carbs = Math.floor(elem.nutrition[3].amount);
                const protein = Math.floor(elem.nutrition[1].amount);
                const fat = Math.floor(elem.nutrition[2].amount);
                let instructions = [];
                elem.analyzedInstructions[0].steps.forEach((inst) => {
                    instructions.push(inst.step);
                })
                let ingredients = [];
                elem.missedIngredients.forEach((ing) => {
                    ingredients.push(ing.original);
                })
                const obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients,
                    instructions: instructions,
                };
                mainRes.push(obj);
            })

            // should be size of 18 (6 + 12)
            const res = breakfastRes.concat(mainRes);
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