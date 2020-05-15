// ======= This is the file where the api calls are located  =======
// ================ and the meal plan is made ======================

import { Creds } from './Credentials';
import { breakfastSides } from './BreakfastSides';

import axios from "axios";

// functions:
// fetchMeals (get everything)
// fetchBreakfast (gets breakfast main and side)
// fetchBreakfastMain
// fetchBreakfastSide
// fetchRegular
// fetchRegularMain
// fetchRegularSide

// Create an Axios instance that all the axios requests to Spoonacular will use
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
    instructionsRequired: true,
    addRecipeInformation: true,
    fillIngredients: true,
    maxAlcohol: 0,
    sort: 'random',
}

const emptyMeal = {
    name: '', calories: 0, carbs: 0,
    protein: 0, fat: 0, ingredients: [],
    instructions: [], servings: 0
}

// percent chance a main side appears
const randMainSides = 0.7;

// ========== Fetch all meals ==========
export async function fetchMeals(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching all meals');
    const [breakfast, main] = await Promise.all([
        fetchBreakfast(cals, numMeals, carbs, protein, fat),
        fetchRegular(cals, numMeals, carbs, protein, fat),
    ]);
    return [...breakfast, ...main];
}

// ========== Fetch both breakfast main and side ==========
export async function fetchBreakfast(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching all breakfast');
    const [main, side] = await Promise.all([
        fetchBreakfastMain(cals, numMeals, carbs, protein, fat),
        fetchBreakfastSide(cals, numMeals, carbs, protein, fat),
    ]);
    return [...main, ...side];
}

// ========== Fetch both breakfast main and side ==========
export async function fetchRegular(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching all regular');
    const [main, side] = await Promise.all([
        fetchRegularMain(cals, numMeals, carbs, protein, fat),
        fetchRegularSide(cals, numMeals, carbs, protein, fat),
    ]);
    return [...main, ...side];
}

export async function fetchBreakfastMain(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching breakfast main');
    return fetchBreakfastMainData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const breakfastData = d.data.results;

            // return an array of meals
            // with each meal of the form
            // [name of food, calories, carbs, protein, 
            /// fat, ingredients, instructions, servings]

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

            return [breakfastRes];
        })
}

async function fetchBreakfastMainData(cals, numMeals, carbs, protein, fat) {
    let approxCals = 0;
    let minBreakfastCals = 0;
    let maxBreakfastCals = 0;
    let minCarbs = 0;
    let maxCarbs = 0;
    let minProtein = 0;
    let maxProtein = 0;
    let minFat = 0;
    let maxFat = 0;

    approxCals = Math.floor(cals / numMeals);
    // target = (approxCals - 100) +- 25
    minBreakfastCals = approxCals - 125;
    maxBreakfastCals = approxCals - 75;

    // if they all equal 0, macro preferences are off and make the macros anything
    if (carbs === 0 && protein === 0 && fat === 0) {
        minCarbs = 0;
        maxCarbs = 1000;
        minProtein = 0;
        maxProtein = 1000;
        minFat = 0;
        maxFat = 1000;
    } else {
        minCarbs = Math.floor(carbs / numMeals) - 10;
        maxCarbs = Math.floor(carbs / numMeals) + 10;
        minProtein = Math.floor(protein / numMeals) - 10;
        maxProtein = Math.floor(protein / numMeals) + 10;
        minFat = Math.floor(fat / numMeals) - 5;
        maxFat = Math.floor(fat / numMeals) + 5;
    }

    try {
        const breakfastMeals = await
            instance({ // breakfast (6)
                "params": {
                    ...defaultParams,
                    minCalories: minBreakfastCals,
                    maxCalories: maxBreakfastCals,
                    minCarbs: minCarbs,
                    maxCarbs: maxCarbs,
                    minProtein: minProtein,
                    maxProtein: maxProtein,
                    minFat: minFat,
                    maxFat: maxFat,
                    type: 'breakfast',
                    number: 6,
                }
            });
        // will throw an error if we do 'const breakfastMeals' and then 'return breakfastMeals'
        return breakfastMeals; // get breakfastSides from fetchMeals
    } catch (error) {
        console.log(error, "error");
        return emptyMeal;
    }
}

export async function fetchBreakfastSide(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching breakfast side');
    // return [breakfastSides.slice(0, 6)]
    return fetchBreakfastSideData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            return d;
        });
}

async function fetchBreakfastSideData(cals, numMeals, carbs, protein, fat) {
    // let it wait at least half a second before returning, so it's not instant
    let res = await new Promise((resolve) => {
        setTimeout(() => {
            resolve([breakfastSides.slice(0, 6)]);
        }, 500)
    })
    return res;
}

export async function fetchRegularMain(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching regular main');
    return fetchRegularMainData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const mainData = d.data.results;

            // return an array of meals
            // with each meal of the form
            // [name of food, calories, carbs, protein, 
            /// fat, ingredients, instructions, servings]

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
                const servings = elem.servings;
                const obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients,
                    instructions: instructions, servings: servings
                };

                mainRes.push(obj);
            })

            return [mainRes];
        })

}
async function fetchRegularMainData(cals, numMeals, carbs, protein, fat) {
    let approxCals = 0;
    let minMainCals = 0;
    let maxMainCals = 0;
    let minCarbs = 0;
    let maxCarbs = 0;
    let minProtein = 0;
    let maxProtein = 0;
    let minFat = 0;
    let maxFat = 0;

    if (numMeals === 1) {

    } else if (numMeals === 2) {

    } else { //numMeals === 3-6
        approxCals = Math.floor(cals / numMeals);
        // target = (approxCals - 75) +- 25
        minMainCals = approxCals - 100;
        maxMainCals = approxCals - 50;
        // macro preferences using a range of +- 15
        // might have to reduce carbs to account for extra carbs from the sides

        // if they all equal 0, macro preferences are off and make the macros anything
        if (carbs === 0 && protein === 0 && fat === 0) {
            minCarbs = 0;
            maxCarbs = 1000;
            minProtein = 0;
            maxProtein = 1000;
            minFat = 0;
            maxFat = 1000;
        } else {
            minCarbs = Math.floor(carbs / numMeals) - 10;
            maxCarbs = Math.floor(carbs / numMeals) + 10;
            minProtein = Math.floor(protein / numMeals) - 10;
            maxProtein = Math.floor(protein / numMeals) + 10;
            minFat = Math.floor(fat / numMeals) - 5;
            maxFat = Math.floor(fat / numMeals) + 5;
        }
    }

    try {
        const main = await
            instance({ // main meals (6 * numMeals)
                "params": {
                    ...defaultParams,
                    minCalories: minMainCals,
                    maxCalories: maxMainCals,
                    minCarbs: minCarbs,
                    maxCarbs: maxCarbs,
                    minProtein: minProtein,
                    maxProtein: maxProtein,
                    minFat: minFat,
                    maxFat: maxFat,
                    type: 'main+course',
                    number: 6 * (numMeals - 1), //exclude bfast
                }
            });
        return main;
    } catch (error) {
        console.log(error, "error");
        return [[emptyMeal]];
    }
}

export async function fetchRegularSide(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching regular side');
    return fetchRegularSideData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const sidesData = d.data.results;

            // return an array of meals
            // with each meal of the form
            // [name of food, calories, carbs, protein, 
            /// fat, ingredients, instructions, servings]

            // ======== MAIN SIDES ========
            let sidesRes = [];
            sidesData.forEach(elem => {
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

                if (Math.random() < randMainSides)
                    sidesRes.push(obj);
                else
                    sidesRes.push(emptyMeal);
            })

            return [sidesRes];
        })
}
async function fetchRegularSideData(cals, numMeals, carbs, protein, fat) {
    let maxSideCals = 150;

    try {
        const mainSides = await
            instance({ // main sides (6 * numMeals)
                "params": {
                    ...defaultParams,
                    maxCalories: maxSideCals,
                    minCarbs: 0,
                    minProtein: 0,
                    minFat: 0,
                    type: 'side+dish',
                    number: 6 * (numMeals - 1), //exclude bfast
                }
            });
        return mainSides;
    } catch (error) {
        console.log(error, "error");
        return [[emptyMeal]];
    }
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