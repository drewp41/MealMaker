import React from 'react';
import { Route } from 'react-router-dom';

import FoodList from './containers/FoodListView';
import FoodDetail from './containers/FoodDetailView';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={FoodList} />
        <Route exact path='/:foodID' component={FoodDetail} />
    </div>
);

export default BaseRouter;