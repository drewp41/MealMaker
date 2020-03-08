import React from 'react';
import { Form, Input, Button } from 'antd';

class CustomForm extends React.Component {

  handleFormSubmit = (event) => {
    event.preventDefault();
    const calories = event.target.elements.calories.value;
    const carbs = event.target.elements.carbs.value;
    const protein = event.target.elements.protein.value;
    const fat = event.target.elements.fat.value;
    console.log(calories, carbs, protein, fat);
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Item label="Calories">
            <Input name="calories" placeholder="2000" />
          </Form.Item>
          <Form.Item label="Carbohydrates">
            <Input name="carbs" placeholder="200" />
          </Form.Item>
          <Form.Item label="Protein">
            <Input name="protein" placeholder="150" />
          </Form.Item>
          <Form.Item label="Fat">
            <Input name="fat" placeholder="65" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CustomForm;