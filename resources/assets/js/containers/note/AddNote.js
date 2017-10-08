import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {addNote} from './../../actions/noteActions';
import Container from '../../components/common/Container';

let AddNote = ({dispatch}) => {
    let titleField;
    let bodyField;

    return (
        <Container>
            <Link to="/notes">Back to notes</Link>
            <form onSubmit={e => {
                e.preventDefault();

                const title = titleField.value;
                const body = bodyField.value;

                if (!title.trim() || !body.trim()) {
                    return;
                }

                dispatch(addNote(title, body));
                titleField.value = '';
                bodyField.value = '';
            }}>

                <input ref={(input) => titleField = input} />
                <input ref={(input) => bodyField = input} />

                <button type="submit">
                    Add Todo
                </button>
            </form>
        </Container>
    );
};

AddNote = connect()(AddNote);

export default AddNote;