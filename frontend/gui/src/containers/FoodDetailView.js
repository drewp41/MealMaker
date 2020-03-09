import React from 'react';
import axios from 'axios';

import { Button, Card } from 'antd';
import CustomForm from '../components/Form';

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

    handleDelete = (event) => {
        const foodID = this.props.match.params.foodID;
        axios.delete(`http://127.0.0.1:8000/api/${foodID}/`);
        // ugly
        this.props.history.push('/');
        this.forceUpdate();
    }

    render() {
        return (
            // should add more than just protein
            <div>
                <Card title={this.state.food.calories}>
                    <p>{this.state.food.protein}</p>
                </Card>
                <CustomForm
                    requestType="put"
                    foodID={this.props.match.params.foodID}
                    btnText="Update" />
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
            </div>
        )
    }
}

export default FoodDetail;