import React from 'react';
import { Route } from 'react-router-dom';

import FoodList from './containers/FoodListView';
import FoodDetail from './containers/FoodDetailView';
import Login from './containers/Login'

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={FoodList} />
        <Route exact path='/foods/:foodID/' component={FoodDetail} />
        <Route exact path='/login/' component={Login} />
    </div>
);

export default BaseRouter;