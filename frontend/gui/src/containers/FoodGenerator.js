// ======= This is the file where the api calls are located  =======
// ================ and the meal plan is made ======================

import { Creds } from './Credentials';
import { breakfastSides } from './BreakfastSides';

import axios from "axios";

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
    sort: 'random',
}



// ========== Fetch all meals ==========
async function fetchData(cals, numMeals, carbs, protein, fat) {
    console.log('fetchdata');

    let approxCals = 0;
    let minBreakfastCals = 0;
    let maxBreakfastCals = 0;
    let minMainCals = 0;
    let maxMainCals = 0;
    let maxSideCals = 0;
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
        // target = (approxCals - 100) +- 25
        minBreakfastCals = approxCals - 125;
        maxBreakfastCals = approxCals - 75;
        // target = (approxCals - 75) +- 25
        minMainCals = approxCals - 100;
        maxMainCals = approxCals - 50;
        // constant
        maxSideCals = 150;
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
        const [breakfastMeals, mainMeals, mainSides] = await Promise.all([
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
            }),
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
                    number: 6 * numMeals,
                }
            }),
            instance({ // main sides (6 * numMeals)
                "params": {
                    ...defaultParams,
                    maxCalories: maxSideCals,
                    minCarbs: 0,
                    minProtein: 0,
                    minFat: 0,
                    type: 'side+dish',
                    number: 6 * numMeals,
                }
            })
        ]);
        return [breakfastMeals, mainMeals, mainSides]; // get breakfastSides from fetchMeals
    } catch (error) {
        console.log(error, "error");
    }
}

export async function fetchMeals(cals, numMeals, carbs = 0, protein = 0, fat = 0) {
    console.log('fetchmeals');
    return fetchData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const breakfastData = d[0].data.results;
            const mainData = d[1].data.results;
            const sidesData = d[2].data.results;

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

                sidesRes.push(obj);
            })

            const res = [breakfastRes, breakfastSides, mainRes, sidesRes]
            return res;
        })
}




// ========== Fetch only breakfast and its sides ==========
async function fetchBreakfastData(cals, numMeals, carbs, protein, fat) {
    console.log('fetchbreakfastdata');

    let approxCals = 0;
    let minBreakfastCals = 0;
    let maxBreakfastCals = 0;
    let minMainCals = 0;
    let maxMainCals = 0;
    let maxSideCals = 0;
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
    // target = (approxCals - 75) +- 25
    minMainCals = approxCals - 100;
    maxMainCals = approxCals - 50;
    // constant
    maxSideCals = 150;
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

    try {
        const breakfastMeals = await Promise.all([
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
            })
        ]);
        return breakfastMeals; // get breakfastSides from fetchMeals
    } catch (error) {
        console.log(error, "error");
    }
}

export async function fetchBreakfast(cals, numMeals, carbs = 0, protein = 0, fat = 0) {
    console.log('fetchBreakfast');
    return fetchBreakfastData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const breakfastData = d[0].data.results;

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

            return [breakfastRes, breakfastSides];
        })
}



// ========== Fetch all non-breakfast and their sides ==========
async function fetchMainData(cals, numMeals, carbs, protein, fat) {

    console.log('fetchMainData');
    let approxCals = 0;
    let minBreakfastCals = 0;
    let maxBreakfastCals = 0;
    let minMainCals = 0;
    let maxMainCals = 0;
    let maxSideCals = 0;
    let minCarbs = 0;
    let maxCarbs = 0;
    let minProtein = 0;
    let maxProtein = 0;
    let minFat = 0;
    let maxFat = 0;

    if (numMeals === 2) {

    } else { //numMeals === 3-6
        approxCals = Math.floor(cals / numMeals);
        // target = (approxCals - 100) +- 25
        minBreakfastCals = approxCals - 125;
        maxBreakfastCals = approxCals - 75;
        // target = (approxCals - 75) +- 25
        minMainCals = approxCals - 100;
        maxMainCals = approxCals - 50;
        // constant
        maxSideCals = 150;
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
        const [mainMeals, mainSides] = await Promise.all([
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
                    number: 6 * numMeals,
                }
            }),
            instance({ // main sides (6 * numMeals)
                "params": {
                    ...defaultParams,
                    maxCalories: maxSideCals,
                    minCarbs: 0,
                    minProtein: 0,
                    minFat: 0,
                    type: 'side+dish',
                    number: 6 * numMeals,
                }
            })
        ]);
        return [mainMeals, mainSides]; // get breakfastSides from fetchMeals
    } catch (error) {
        console.log(error, "error");
    }
}

export async function fetchMain(cals, numMeals, carbs = 0, protein = 0, fat = 0) {
    console.log('fetchMain');
    return fetchMainData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const mainData = d[1].data.results;
            const sidesData = d[2].data.results;

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

                sidesRes.push(obj);
            })

            const res = [mainRes, sidesRes];
            return res;
        })
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