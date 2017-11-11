import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionForm from '../question/QuestionForm'
import Numbers from '../../helpers/Numbers'
import { NOT_VALIDATED, CORRECT, INCORRECT } from '../question/questionAnswerTypes'

class PracticeExamPage extends Component {
  state = {
    exam: {...this.props.exam},
    hasValidatedQuestion: this.props.hasValidatedQuestion,
    currentQuestion: {...this.props.currentQuestion},
    completedQuestionIds: this.props.completedQuestionIds
  }

  componentWillReceiveProps (nextProps) {
    const nextQuestion = this.getNextQuestion(nextProps.exam.questions, [])

    this.setState({
      exam: nextProps.exam,
      currentQuestion: nextQuestion,
      completedQuestionIds: []
    })
  }

  loadNextQuestion = () => {
    this.setState({
      currentQuestion: this.getNextQuestion([...this.state.exam.questions], this.state.completedQuestionIds),
      hasValidatedQuestion: false,
    })
  }

  getAnswersWithStatuses = (originalQuestion, editedQuestion) => {
    const validAnswersForCurrentQuestion = originalQuestion.answers
    const providedAnswers = editedQuestion.answers

    const providedAnswersWithUpdatedValidationStatus = providedAnswers.map(answer => {
      const isValidAnswer = validAnswersForCurrentQuestion.find(x => x.value === answer.value) !== undefined

      return {...answer, status: isValidAnswer ? CORRECT : INCORRECT}
    })

    const missedAnswers = validAnswersForCurrentQuestion.reduce((acc, answer) => {
      if (!providedAnswers.find(x => x.value === answer.value)) {
        return [...acc, {...answer, status: NOT_VALIDATED}]
      }

      return acc
    }, [])

    return [...providedAnswersWithUpdatedValidationStatus, ...missedAnswers]
  }

  validateQuestion = (e, question) => {
    e.preventDefault()

    if (this.state.hasValidatedQuestion) {
      return this.tryLoadNextQuestion()
    }

    const {currentQuestion} = this.state
    const answersWithUpdatedValidationStatus = this.getAnswersWithStatuses(currentQuestion, question)
    const hasProvidedCorrectAnswers = answersWithUpdatedValidationStatus.filter(x => x.status !== CORRECT).length === 0

    this.setState({
      hasValidatedQuestion: true,
      currentQuestion: {...currentQuestion, answers: answersWithUpdatedValidationStatus},
      completedQuestionIds: [...this.state.completedQuestionIds, ...(hasProvidedCorrectAnswers ? [question.id] : [])]
    })
  }

  tryLoadNextQuestion = () => {
    const hasQuestionsLeft = this.state.exam.questions.length !== this.state.completedQuestionIds.length

    if (hasQuestionsLeft) {
      this.loadNextQuestion()
    }
  }

  getNextQuestion = (questions, completedQuestionIds) => {
    const possibleQuestions = questions.filter(x => !completedQuestionIds.includes(x.id))

    const question = possibleQuestions[Numbers.getRandomNumber(0, possibleQuestions.length - 1)]
    return {...question}
  }

  render () {
    const {exam, currentQuestion, completedQuestionIds, hasValidatedQuestion} = this.state
    const {questions} = exam

    const hasQuestionsLeft = currentQuestion !== undefined && questions.length !== completedQuestionIds.length
    const question = hasValidatedQuestion ? currentQuestion : {...currentQuestion, answers: [{value: ''}]}

    return (
      <section className="container mx-auto">
        <section className="mt-6 bg-white shadow-md rounded p-4">
          <p><b>Score: </b>{questions.length - completedQuestionIds.length}/{questions.length} questions left</p>
        </section>
        <section className="mt-6 bg-white shadow-md rounded p-4">
          {hasQuestionsLeft
            ? <QuestionForm question={question} handleSubmit={this.validateQuestion} submitLabel={hasValidatedQuestion ? 'Next Question' : 'Validate'}
                            questionIsEditable={false} answersAreDisabled={hasValidatedQuestion}/>
            : <p>No questions left</p>
          }
        </section>
      </section>
    )
  }
}

const buildEmptyQuestion = exam => ({
  id: undefined,
  value: '',
  answers: [{value: '', status: NOT_VALIDATED}]
})

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const exam = state.exams.find(x => x.id === parseInt(id))

  return {
    exam: exam || {questions: []},
    hasValidatedQuestion: false,
    currentQuestion: buildEmptyQuestion(),
    completedQuestionIds: []
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(PracticeExamPage)