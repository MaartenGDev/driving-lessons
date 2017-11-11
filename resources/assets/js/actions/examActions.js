import { LOAD_EXAMS, ADD_EXAM, UPDATE_EXAM, DESTROY_EXAM } from './examTypes'
import ExamApi from '../services/ExamApi'

export const createExamSuccess = exam => ({
  type: ADD_EXAM,
  exam
})

export const updateExamSuccess = exam => ({
  type: UPDATE_EXAM,
  exam
})

export const destroyExamSuccess = exam => ({
  type: DESTROY_EXAM,
  exam
})
export const loadExamsSuccess = exams => ({
  type: LOAD_EXAMS,
  exams
})

export const loadExams = () => {
  return async dispatch => {
    return ExamApi.all()
      .then(bier => dispatch(loadExamsSuccess(bier)))
  }
}

export const updateExam = exam => {
  return async dispatch => {
    return ExamApi.createOrUpdate(exam)
      .then(savedExam => {
        exam.id === undefined
          ? dispatch(createExamSuccess(savedExam))
          : dispatch(updateExamSuccess(savedExam))
      })
  }
}

export const destroyExam = exam => {
  return async dispatch => {
    return ExamApi.destroy(exam)
      .then(res => dispatch(destroyExamSuccess(exam)))
  }
}