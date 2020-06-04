import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import FoodList from './containers/FoodListView';
import FoodDetail from './containers/FoodDetailView';
import Login from './containers/Login';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import SignupOld from './containers/SignupOld';
import About from './containers/About';
import HowItWorks from './containers/HowItWorks';
import Home from './containers/Home';

const BaseRouter = (props) => {
    const history = useHistory();

    useEffect(() => {
        return history.listen((location) => {
            console.log(`You changed the page to: ${location.pathname}`);
        })
    }, [history])

    return (
        <div>
            <Route exact path='/' render={(routeProps) => (<Home {...props} />)} />
            <Route exact path='/howitworks/' component={HowItWorks} />
            <Route exact path='/about/' component={About} />
            <Route exact path='/signin/' component={SignIn} />
            <Route exact path='/signup/' component={SignUp} />
            {/* <Route exact path='/' component={FoodList} /> */}
            {/* <Route exact path='/foods/:foodID/' component={FoodDetail} /> */}
            {/* <Route exact path='/signupOld/' component={SignupOld} /> */}
        </div>
    )
};

export default BaseRouter;