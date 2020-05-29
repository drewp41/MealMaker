import React from 'react';
import { Route } from 'react-router-dom';

import FoodList from './containers/FoodListView';
import FoodDetail from './containers/FoodDetailView';
import Login from './containers/Login';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import SignupOld from './containers/SignupOld';
import About from './containers/About';
import HowItWorks from './containers/HowItWorks';

import Home from './containers/Home';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/howitworks/' component={HowItWorks} />
        <Route exact path='/about/' component={About} />
        <Route exact path='/signin/' component={SignIn} />
        <Route exact path='/signup/' component={SignUp} />
        {/* <Route exact path='/' component={FoodList} /> */}
        {/* <Route exact path='/foods/:foodID/' component={FoodDetail} /> */}
        {/* <Route exact path='/signupOld/' component={SignupOld} /> */}
    </div>
);

export default BaseRouter;