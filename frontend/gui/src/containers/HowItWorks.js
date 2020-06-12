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
                        For example, when a meal is refreshed and its calories change, the total calories counter at the top will automatically update.
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
                        of over 365,000 recipes that allows me to randomly search recipes based on calories, macros, meal type, etc.
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
                        Under "normal" circumstances, calories are determined by taking the total number of calories, divided by the number of
                        meals, with breakfast being a little smaller. The same is done for the macronutrients.  This results in every meal having a
                        similar amount of calories and macronutrient profile. There is then a random chance for a non-breakfast meal to include a side.
                        However, if the user asks for say, 4000 calories in 3 meals, there are going to be close to zero results.  This is because most main course recipes
                        are within 300 to 500 calories (follows a normal distribution peaking at 400 calories). To combat this, I randomize the servings the user recives if the calories per meal is too high.  For example,
                        when the calories per meal is 900, there is a 20% chance of receiving (roughly) 2x 450 calorie meals, and an 80% chance
                        of receiving 3x 300 calorie meals.
                    </p>
                    <p>

                    </p>
                </div>
            </div>
            <div style={{ height: '200px' }} />
            <Footer />
        </>
    )
}


export default HowItWorks;