import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {updateQuestion} from './../../actions/questionActions';
import Container from '../../components/common/Container';

let AddQuestion = ({dispatch}) => {
    let titleField;
    let bodyField;

    return (
        <Container>
            <Link to="/questions">Back to Questions</Link>
            <form onSubmit={e => {
                e.preventDefault();

                const title = titleField.value;
                const body = bodyField.value;

                if (!title.trim() || !body.trim()) {
                    return;
                }

                dispatch(updateQuestion(title, body));
                titleField.value = '';
                bodyField.value = '';
            }}>

                <input ref={(input) => titleField = input} />
                <input ref={(input) => bodyField = input} />

                <button type="submit">
                    Add Question
                </button>
            </form>
        </Container>
    );
};

AddQuestion = connect()(AddQuestion);

export default AddQuestion;