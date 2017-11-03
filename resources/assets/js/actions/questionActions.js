import { ADD_QUESTION, UPDATE_QUESTION } from './actionTypes'
import QuestionApi from '../services/QuestionApi'

export const createQuestionSuccess = (question) => ({
  type: ADD_QUESTION,
  question
})

export const updateQuestionSuccess = (question) => ({
  type: UPDATE_QUESTION,
  question
})

export const updateQuestion = (question) => {
  return async (dispatch, getState) => {
    return QuestionApi.createOrUpdate(question)
      .then(savedQuestion => {
        question.id === undefined
          ? dispatch(createQuestionSuccess(savedQuestion))
          : dispatch(updateQuestionSuccess(savedQuestion))
      })
  }
}
