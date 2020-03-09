import React from 'react';
import axios from 'axios';

import Foods from '../components/Food';
import CustomForm from '../components/Form';

/*
const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        //title: `ant design part ${i}`,
        //title: `Calories: ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
} */

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