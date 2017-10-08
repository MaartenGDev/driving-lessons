import { ADD_NOTE } from './actionTypes';

let nextNoteId = 0;

export const addNote = (title, body) => ({
    type: ADD_NOTE,
    note: {
        id: nextNoteId++,
        title,
        body
    }
});