import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';


class CustomForm extends React.Component {
  // requestType = post or put
  handleFormSubmit = (event, requestType, foodID) => {
    //event.preventDefault();
    const calories = event.target.elements.calories.value;
    const carb = event.target.elements.carb.value;
    const protein = event.target.elements.protein.value;
    const fat = event.target.elements.fat.value;
    const meal = event.target.elements.meal.value;

    switch (requestType) {
      case 'post':
        return axios.post('http://127.0.0.1:8000/api/', {
          calories: calories,
          carb: carb,
          protein: protein,
          fat: fat,
          meal: meal,
        })
          .then(res => console.log(res))
          .catch(error => console.err(error));
      case 'put':
        return axios.put(`http://127.0.0.1:8000/api/${foodID}/`, {
          calories: calories,
          carb: carb,
          protein: protein,
          fat: fat,
          meal: meal
        })
          .then(res => console.log(res))
          .catch(error => console.err(error));
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.handleFormSubmit(
          event,
          this.props.requestType,
          this.props.foodID)}>
          <Form.Item label="Calories">
            <Input name="calories" placeholder="2000" />
          </Form.Item>
          <Form.Item label="Carbohydrates">
            <Input name="carb" placeholder="200" />
          </Form.Item>
          <Form.Item label="Protein">
            <Input name="protein" placeholder="150" />
          </Form.Item>
          <Form.Item label="Fat">
            <Input name="fat" placeholder="65" />
          </Form.Item>
          <Form.Item label="Meal">
            <Input name="meal" placeholder="Chicken" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </form>
      </div>
    );
  }
}

export default CustomForm;

