import React, { useState, useEffect } from 'react';
import {
    Modal, Input, Button
} from 'antd';

import axios from 'axios';

const FeedbackModal = (props) => {

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    function sendFeedback() {
        axios.post('https://meal-maker-feedback.firebaseio.com/.json', {
            name: name,
            message: message
        })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Modal
            className='feedbackModal'
            title='Feedback'
            visible={props.visible}
            onCancel={props.closeModal}
            footer={null}
            width='700px'
            bodyStyle={{}}
        >
            Name (optional)
            <Input value={name} onChange={e => setName(e.target.value)}>
            </Input>
            Message
            <Input value={message} onChange={e => setMessage(e.target.value)}>
            </Input>
            <Button type='primary' onClick={sendFeedback}>
                Submit
            </Button>
        </Modal >
    );
}

export default FeedbackModal;