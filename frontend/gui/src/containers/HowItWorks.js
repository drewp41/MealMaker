import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function HowItWorks(props) {

    useEffect(() => {
        // setTimeout(() => Prism.highlightAll(), 0)
    }, [])


    return (
        <>
            <Header {...props} />
            <div className='hiw'>
                <div className='hiwBody'>
                    <h2>
                        Technologies
                    </h2>
                    <div className='space8' />
                    <p>
                        This website was not just built with Javascript, HTML, and CSS.  One of the main technologies behind this site
                        is <a href='https://reactjs.org/'>React</a>, which is Facebook's open-source JS library. One of the biggest tools that
                        React offers is its state management.  React will efficiently rerender components when its data changes.
                        For example, when a meal is regenerated and its calories change, the total calories counter at the top will automatically update.
                        So long are the days of consulting the DOM or looking up an element by its ID to keep everything up to date.
                    </p>
                    <p>
                        I also used <a href='https://www.djangoproject.com/'>Django</a> for the backend, mainly for user authentication and
                        the storage of users' saved meals. In addition, I used <a href='https://ant.design/'>Ant Design</a> for various components,
                        and <a href='https://www.chartjs.org/'>ChartJS</a> for the pie charts.
                    </p>
                    <div className='space8' />
                    <h2>
                        Food algorithm
                    </h2>
                    <div className='space8' />
                    <p>
                        All of the food data is sourced from the <a href='https://spoonacular.com/food-api'>Spoonacular API</a>. This is a database
                        of over 365,000 recipes that allows for randomly searching recipes based on calories, macros, meal type, etc.
                    </p>
                    <p>
                        Whenever the user hits the generate button, a GET request is sent to Spoonacular's API to fetch recipes based on the certain parameters.
                    </p>
                    <div className='hiwCode'>
                        <pre className='hiwPreCode'>
                            <code>
                                {"axios.get('https://api.spoonacular.com/recipe/complexSearch', {"}<br />
                                {"            params: {"}<br />
                                {"              minCals: 400,"}<br />
                                {"              maxProtein: 40,"}<br />
                                {"              type: 'main+course',"}<br />
                                {"              number: 6,"}<br />
                                {"              ...otherParams"}<br />
                                {"            }"}<br />
                                {"        });"}<br />
                            </code>
                        </pre>
                    </div>
                    <p>
                        For a simplified explanation, the calories per meal is determined by taking the total number of calories, divided by the number of
                        meals. The same is done for the macronutrients. There is then a random chance for a meal to include a side.
                        However, if the user asks for say, 3000 calories in 3 meals, there are going to be close to zero results.
                        This is because most main course recipes are within 300 to 500 calories. To combat this, I randomize the servings the user
                        recives if the calories per meal is too high.  Using the example above, for an individual meal, the user might recieve
                        2 servings of a 500 calorie meal, or 3 servings of a 330 calorie meal.
                    </p>
                    <p>
                        Behind the scenes, Meal Maker caches meals to minimize the amount of API calls it does to Spoonacular.  For every meal generated,
                        an extra five is generated during the same API call.  This results in refreshing meals meals usually being instantaneous.  The
                        orchestration of trying to maximize the use cached meals during regeneration, while fetching meals and keeping certain meals pinned, was
                        the most difficult part of this project.
                    </p>
                    <div className='space8' />
                    <h2>
                        Features to add
                    </h2>
                    <div className='space8' />
                    <ul>
                        <li>
                            Filter by diet and intolerances
                        </li>
                        <li>
                            Include certain ingredients (ones in your pantry?)
                        </li>
                        <li>
                            Exclude ingredients you don't like
                        </li>
                        <li>
                            A stream/feed at the bottom of the site with meals other users have saved
                        </li>
                        <li>
                            Authentication with social media accounts
                        </li>
                        <li>
                            Search for specific recipes and add them directly to your meal plan
                        </li>
                        <li>
                            Regenerate an entire meal at a time
                        </li>
                    </ul>
                </div>
            </div>
            <div style={{ height: '200px' }} />
            <Footer />
        </>
    )
}


export default HowItWorks;