import React from 'react';
import axios from 'axios';

import Foods from '../components/Food';
import CustomForm from '../components/Form';

class FoodList extends React.Component {

    state = {
        foods: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                this.setState({
                    foods: res.data
                });
                console.log(res.data);
            })
    }

    render() {
        return (
            // since we're in the list view, it's a post requestType.  
            // we're giving the customform props
            <div>
                <Foods data={this.state.foods} />
                <br />
                <h2>Create a meal plan</h2>
                <CustomForm
                    requestType="post"
                    foodID={null}
                    btnText="Create" />
            </div>
        )
    }
}

export default FoodList;