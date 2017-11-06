import * as types from '../actions/examTypes'

const questions = (state = [], action) => {
  switch (action.type) {
    case types.ADD_EXAM:
      return [...state,
        Object.assign({}, action.exam)
      ]
    case types.UPDATE_EXAM:
      return [...state.filter(exam => exam.id !== action.exam.id), action.exam]
    case types.DESTROY_EXAM:
      return [...state.filter(exam => exam.id !== action.exam.id)]
    case types.LOAD_EXAMS: {
      return action.exams;
    }
    default:
      return state
  }
}

export default questions