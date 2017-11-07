import { ADD_QUESTION, UPDATE_QUESTION, LOAD_QUESTIONS, DESTROY_QUESTION } from './questionTypes'
import QuestionApi from '../services/QuestionApi'

export const createQuestionSuccess = question => ({
  type: ADD_QUESTION,
  question
})

export const updateQuestionSuccess = question => ({
  type: UPDATE_QUESTION,
  question
})

export const destroyQuestionSuccess = question => ({
  type: DESTROY_QUESTION,
  question
})

export const updateQuestion = question => {
  return async dispatch => {
    return QuestionApi.createOrUpdate(question)
      .then(savedQuestion => {
        question.id === undefined
          ? dispatch(createQuestionSuccess(savedQuestion))
          : dispatch(updateQuestionSuccess(savedQuestion))
      })
  }
}

export const destroyQuestion = question => {
  return async dispatch => {
    return QuestionApi.destroy(question)
      .then(res => dispatch(destroyQuestionSuccess(question)))
  }
}