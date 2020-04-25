// file for creating the actual meal plan
import { Creds } from './Credentials'

import axios from "axios";

// Create an Axios instance that all (most) the axios requests to Spoonacular will use
const instance = axios.create({
    method: 'get',
    baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'x-rapidapi-key': Creds.key,
    },
});

// Parameters to be sent into all the get requests
const defaultParams = {
    'instructionsRequired': 'true',
    'addRecipeInformation': 'true',
    'fillIngredients': 'true',
    'sort': 'random',
}

async function fetchData(cals, numMeals, carbs, protein, fat) {
    const approxCals = Math.floor(cals / numMeals);
    const minCals = approxCals - 100;
    const maxCals = approxCals + 100;

    const approxCarbs = Math.floor(carbs / numMeals);
    const minCarbs = Math.max(0, approxCarbs - 15);
    const maxCarbs = approxCarbs + 15;

    const approxProtein = Math.floor(protein / numMeals);
    const minProtein = Math.max(0, approxProtein - 15);
    const maxProtein = approxProtein + 15;

    const approxFat = Math.floor(fat / numMeals);
    const minFat = Math.max(0, approxFat - 15);
    const maxFat = approxFat + 15;

    try {
        const [breakfastData, mainData] = await Promise.all([
            instance({
                "params": {
                    ...defaultParams,
                    'minCalories': '100',
                    'minProtein': '0',
                    'minCarbs': '0',
                    'minFat': '0',
                    'type': 'breakfast',
                    'number': '6',
                }
            }),
            instance({
                "params": {
                    ...defaultParams,
                    'minCalories': '100',
                    'minProtein': '0',
                    'minCarbs': '0',
                    'minFat': '0',
                    'type': 'main+course',
                    'number': '12',
                }
            })
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
            console.log(breakfastData);
            console.log(mainData);
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
                let instArr = elem.analyzedInstructions;
                if (instArr && instArr.length) {
                    instArr[0].steps.forEach((inst) => {
                        instructions.push(inst.step);
                    })
                }
                let ingredients = [];
                elem.missedIngredients.forEach((ing) => {
                    ingredients.push(ing.original);
                })
                const servings = elem.servings;
                const obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients,
                    instructions: instructions, servings: servings
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
                let instArr = elem.analyzedInstructions;
                if (instArr && instArr.length) {
                    instArr[0].steps.forEach((inst) => {
                        instructions.push(inst.step);
                    })
                }
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