import * as types from '../actions/actionTypes';

const notes = (state = [], action) => {
    switch (action.type) {
        case types.ADD_NOTE:
            return [...state,
                Object.assign({}, action.note)
            ];
        default:
            return state;
    }
};

export default notes;