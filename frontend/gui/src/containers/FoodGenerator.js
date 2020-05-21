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
    maxReadyTime: 31,
    sort: 'random',
}

const emptyMeal = {
    name: '', calories: 0, carbs: 0,
    protein: 0, fat: 0, ingredients: [],
    instructions: [], servings: 0, makes: 0,
    prepTime: 0, cookTime: 0
}

// percent chance a main side appears
const randMainSides = 0.7;

// ========== Fetch all meals ==========
export async function fetchMeals(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching all meals');
    if (numMeals === 1) {
        const feast = await fetchBreakfast(cals, numMeals, carbs, protein, fat);
        return [...feast, [], []];
    } else {
        const [breakfast, main] = await Promise.all([
            fetchBreakfast(cals, numMeals, carbs, protein, fat),
            fetchRegular(cals, numMeals, carbs, protein, fat),
        ]);
        return [...breakfast, ...main];
    }
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
            const servings = d[0];
            const breakfastData = d[1];

            // return an array of meals

            // ======== BREAKFAST MEALS ========
            let breakfastRes = [];
            breakfastData.forEach(elem => {
                const name = elem.title;
                const calories = Math.floor(elem.nutrition[0].amount) * servings;
                const carbs = Math.floor(elem.nutrition[3].amount) * servings;
                const protein = Math.floor(elem.nutrition[1].amount) * servings;
                const fat = Math.floor(elem.nutrition[2].amount) * servings;
                let instructions = [];
                let instArr = elem.analyzedInstructions;
                if (instArr && instArr.length) {
                    instArr[0].steps.forEach((inst) => {
                        instructions.push(inst.step);
                    })
                }
                let ingredients = [];
                elem.extendedIngredients.forEach((ing) => {
                    ingredients.push(ing.original);
                })
                const makes = elem.servings;
                const prepTime = elem.preparationMinutes;
                const cookTime = elem.cookingMinutes;

                const obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients,
                    instructions: instructions, servings: servings, makes: makes,
                    prepTime: prepTime, cookTime: cookTime
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

    if (numMeals === 1) {
        approxCals = Math.floor(cals / 2) - 300;
    } else if (numMeals === 2) {
        approxCals = Math.floor((2 / 5) * cals);
    } else {
        approxCals = Math.floor(cals / numMeals);
    }

    let servings = getServings(approxCals);

    // target = (approxCals - 100) +- 25 
    let avgCals = Math.floor((approxCals - 100) / servings);
    minBreakfastCals = avgCals - 25;
    maxBreakfastCals = avgCals + 25;

    // if they all equal 0, macro preferences are off and make the macros anything
    if (carbs === 0 && protein === 0 && fat === 0) {
        minCarbs = 0;
        maxCarbs = 1000;
        minProtein = 0;
        maxProtein = 1000;
        minFat = 0;
        maxFat = 1000;
    } else {
        let percentCarbs = carbs / (carbs + protein + fat * (9 / 4));
        let percentProtein = protein / (carbs + protein + fat * (9 / 4));
        let percentFat = (fat * (9 / 4)) / (carbs + protein + fat * (9 / 4));
        minCarbs = Math.floor((avgCals * percentCarbs) / 4) - 10;
        maxCarbs = Math.floor((avgCals * percentCarbs) / 4) + 10;
        minProtein = Math.floor((avgCals * percentProtein) / 4) - 10;
        maxProtein = Math.floor((avgCals * percentProtein) / 4) + 10;
        minFat = Math.floor((avgCals * percentFat) / 9) - 5;
        maxFat = Math.floor((avgCals * percentFat) / 9) + 5;
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
                    type: (numMeals > 1) ? 'breakfast' : 'main+course',
                    number: 6,
                }
            });
        // will throw an error if we do 'const breakfastMeals' and then 'return breakfastMeals'
        return [servings, breakfastMeals.data.results]; // return servings each meal has (not makes) with the meals
    } catch (error) {
        console.log(error, "error");
        return emptyMeal;
    }
}

export async function fetchBreakfastSide(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching breakfast side');
    if (numMeals === 1) {
        // always two sides with 1 meal 
        let servings = 2;
        return fetchBreakfastSideData(cals, numMeals, carbs, protein, fat)
            .then(d => {
                const sidesData = d.data.results;
                // return an array of meals

                // ======== MAIN SIDES ========
                let sidesRes = [];
                sidesData.forEach(elem => {
                    const name = elem.title;
                    const calories = Math.floor(elem.nutrition[0].amount) * servings;
                    const carbs = Math.floor(elem.nutrition[3].amount) * servings;
                    const protein = Math.floor(elem.nutrition[1].amount) * servings;
                    const fat = Math.floor(elem.nutrition[2].amount) * servings;
                    let instructions = [];
                    let instArr = elem.analyzedInstructions;
                    if (instArr && instArr.length) {
                        instArr[0].steps.forEach((inst) => {
                            instructions.push(inst.step);
                        })
                    }
                    let ingredients = [];
                    elem.extendedIngredients.forEach((ing) => {
                        ingredients.push(ing.original);
                    })
                    const makes = elem.servings;
                    const prepTime = elem.preparationMinutes;
                    const cookTime = elem.cookingMinutes;
                    const obj = {
                        name: name, calories: calories, carbs: carbs,
                        protein: protein, fat: fat, ingredients: ingredients,
                        instructions: instructions, servings: servings, makes: makes,
                        prepTime: prepTime, cookTime: cookTime
                    };

                    sidesRes.push(obj);
                })

                return [sidesRes];
            })
    } else {
        return fetchBreakfastSideData(cals, numMeals, carbs, protein, fat)
            .then(d => {
                return d;
            });
    }
}

async function fetchBreakfastSideData(cals, numMeals, carbs, protein, fat) {
    if (numMeals === 1) {
        let maxSideCals = 150;

        try {
            const sides = await
                instance({ // sides
                    "params": {
                        ...defaultParams,
                        maxCalories: maxSideCals,
                        minCarbs: 0,
                        minProtein: 0,
                        minFat: 0,
                        type: 'side+dish',
                        number: 6
                    }
                });
            return sides;
        } catch (error) {
            console.log(error, "error");
            return [[emptyMeal]];
        }
    }
    else {
        // let it wait at least half a second before returning, so it's not instant
        let res = await new Promise((resolve) => {
            setTimeout(() => {
                resolve([breakfastSides.slice(0, 6)]);
            }, 500)
        })
        return res;
    }
}

export async function fetchRegularMain(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching regular main');
    return fetchRegularMainData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const servings = d[0]
            const mainData = d[1];

            // return an array of meals

            // ======== MAIN MEALS ========
            let mainRes = [];
            mainData.forEach(elem => {
                const name = elem.title;
                const calories = Math.floor(elem.nutrition[0].amount) * servings;
                const carbs = Math.floor(elem.nutrition[3].amount) * servings;
                const protein = Math.floor(elem.nutrition[1].amount) * servings;
                const fat = Math.floor(elem.nutrition[2].amount) * servings;
                let instructions = [];
                let instArr = elem.analyzedInstructions;
                if (instArr && instArr.length) {
                    instArr[0].steps.forEach((inst) => {
                        instructions.push(inst.step);
                    })
                }
                let ingredients = [];
                elem.extendedIngredients.forEach((ing) => {
                    ingredients.push(ing.original);
                })
                const makes = elem.servings;
                const prepTime = elem.preparationMinutes;
                const cookTime = elem.cookingMinutes;
                const obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients,
                    instructions: instructions, servings: servings, makes: makes,
                    prepTime: prepTime, cookTime: cookTime
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

    if (numMeals === 2) {
        //just get one dinner
        approxCals = Math.floor((3 / 5) * cals);
    } else { //numMeals === 3-6
        approxCals = Math.floor(cals / numMeals);
    }

    let servings = getServings(approxCals);

    // target = (approxCals - 150) +- 25 bc guaranteed side
    let avgCals = Math.floor((approxCals - 100) / servings);
    minMainCals = avgCals - 25;
    maxMainCals = avgCals + 25;

    if (carbs === 0 && protein === 0 && fat === 0) {
        minCarbs = 0;
        maxCarbs = 1000;
        minProtein = 0;
        maxProtein = 1000;
        minFat = 0;
        maxFat = 1000;
    } else {
        let percentCarbs = carbs / (carbs + protein + fat * (9 / 4));
        let percentProtein = protein / (carbs + protein + fat * (9 / 4));
        let percentFat = (fat * (9 / 4)) / (carbs + protein + fat * (9 / 4));
        minCarbs = Math.floor((avgCals * percentCarbs) / 4) - 10;
        maxCarbs = Math.floor((avgCals * percentCarbs) / 4) + 10;
        minProtein = Math.floor((avgCals * percentProtein) / 4) - 10;
        maxProtein = Math.floor((avgCals * percentProtein) / 4) + 10;
        minFat = Math.floor((avgCals * percentFat) / 9) - 5;
        maxFat = Math.floor((avgCals * percentFat) / 9) + 5;
        //
        // minCarbs = Math.floor(((3 / 5) * carbs) / servings) - 10;
        // maxCarbs = Math.floor(((3 / 5) * carbs) / servings) + 10;
        // minProtein = Math.floor(((3 / 5) * protein) / servings) - 10;
        // maxProtein = Math.floor(((3 / 5) * protein) / servings) + 10;
        // minFat = Math.floor(((3 / 5) * fat) / servings) - 5;
        // maxFat = Math.floor(((3 / 5) * fat) / servings) + 5;
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
        return [servings, main.data.results];
    } catch (error) {
        console.log(error, "error");
        return [[emptyMeal]];
    }
}

export async function fetchRegularSide(cals, numMeals, carbs, protein, fat) {
    console.log('Fetching regular side');
    return fetchRegularSideData(cals, numMeals, carbs, protein, fat)
        .then(d => {
            const servings = d[0];
            const sidesData = d[1];

            // return an array of meals

            // ======== MAIN SIDES ========
            let sidesRes = [];
            sidesData.forEach(elem => {
                const name = elem.title;
                const calories = Math.floor(elem.nutrition[0].amount) * servings;
                const carbs = Math.floor(elem.nutrition[3].amount) * servings;
                const protein = Math.floor(elem.nutrition[1].amount) * servings;
                const fat = Math.floor(elem.nutrition[2].amount) * servings;
                let instructions = [];
                let instArr = elem.analyzedInstructions;
                if (instArr && instArr.length) {
                    instArr[0].steps.forEach((inst) => {
                        instructions.push(inst.step);
                    })
                }
                let ingredients = [];
                elem.extendedIngredients.forEach((ing) => {
                    ingredients.push(ing.original);
                })
                const makes = elem.servings;
                const prepTime = elem.preparationMinutes;
                const cookTime = elem.cookingMinutes;
                const obj = {
                    name: name, calories: calories, carbs: carbs,
                    protein: protein, fat: fat, ingredients: ingredients,
                    instructions: instructions, servings: servings, makes: makes,
                    prepTime: prepTime, cookTime: cookTime
                };

                if (numMeals === 2)
                    sidesRes.push(obj);
                else {
                    if (Math.random() < randMainSides)
                        sidesRes.push(obj);
                    else
                        sidesRes.push(emptyMeal);
                }
            })

            return [sidesRes];
        })
}
async function fetchRegularSideData(cals, numMeals, carbs, protein, fat) {
    let maxSideCals = 150;
    let servings = 1;

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
        return [servings, mainSides.data.results];
    } catch (error) {
        console.log(error, "error");
        return [[emptyMeal]];
    }
}

function getServings(cals) {
    let num = Math.random();
    if (cals < 600)
        return 1;
    else if (cals < 700)
        return (num < 0.70 ? 2 : 1);
    else if (cals < 800)
        return (num < 0.90 ? 2 : 1);
    else if (cals < 900)
        return (num < 0.20 ? 3 : 2);
    else if (cals < 1000)
        return (num < 0.35 ? 3 : 2);
    else if (cals < 1100)
        return (num < 0.70 ? 3 : 2);
    else if (cals < 1200)
        return (num < 0.85 ? 3 : 2);
    else if (cals < 1300)
        return (num < 0.10 ? 4 : 3);
    else if (cals < 1400)
        return (num < 0.25 ? 4 : 3);
    else if (cals < 1500)
        return (num < 0.40 ? 4 : 3);
    else if (cals < 1600)
        return (num < 0.80 ? 4 : 3);
    else // cals should be less than 1700 
        return 4;

}