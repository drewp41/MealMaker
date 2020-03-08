import React from 'react';
import axios from 'axios';

import { Card } from 'antd';

class FoodDetail extends React.Component {

    state = {
        food: {}
    }

    componentDidMount() {
        const foodID = this.props.match.params.foodID;
        axios.get(`http://127.0.0.1:8000/api/${foodID}/`)
            .then(res => {
                this.setState({
                    food: res.data
                });
                //console.log(res.data);
            })
    }

    render() {
        return (
            // should add more than just protein
            <Card title={this.state.food.calories}>
                <p>{this.state.food.protein}</p>
            </Card>
        )
    }
}

export default FoodDetail;