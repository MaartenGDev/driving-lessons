import * as types from '../actions/actionTypes'

const questions = (state = [], action) => {
  switch (action.type) {
    case types.ADD_QUESTION:
      return [...state,
        Object.assign({}, action.question)
      ]
    case types.UPDATE_QUESTION:
      return [...state.filter(question => question.id !== action.question.id), action.question]
    case types.DESTROY_QUESTION:
      return [...state.filter(question => question.id !== action.question.id)]
    case types.LOAD_QUESTIONS: {
      return action.questions;
    }
    default:
      return state
  }
}

export default questions