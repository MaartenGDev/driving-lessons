import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionForm from '../question/QuestionForm'
import Numbers from '../../helpers/Numbers'
import QuestionApi from '../../services/QuestionApi'

class PracticeExamPage extends Component {
  state = {
    exam: Object.assign({}, this.props.exam),
    currentQuestion: this.props.currentQuestion,
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
    this.setState({currentQuestion: this.getNextQuestion(this.state.exam.questions, this.state.completedQuestionIds)})
  }

  validateQuestion = (e, question) => {
    e.preventDefault()
    QuestionApi.validate(question).then(res => {
      const hasProvidedCorrectAnswers = res.failedFields.length === 0

      if (hasProvidedCorrectAnswers) {
        this.setState({completedQuestionIds: [...this.state.completedQuestionIds, question.id]})
      }

      this.tryLoadNextQuestion();
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
    let question = questions[Numbers.getRandomNumber(0, possibleQuestions.length - 1)]
    return Object.assign(question, {answers: [{value: ''}]})
  }

  render () {
    const {exam, currentQuestion, completedQuestionIds} = this.state
    const {questions} = exam;

    console.log(exam);
    const hasQuestionsLeft = currentQuestion !== undefined && questions.length !== completedQuestionIds.length

    return (
      <section className="container mx-auto">
        <section className="mt-6 bg-white shadow-md rounded p-4">
          <p><b>Score: </b>{questions.length - completedQuestionIds.length}/{questions.length} questions left</p>
        </section>
        <section className="mt-6 bg-white shadow-md rounded p-4">
          {hasQuestionsLeft
            ? <QuestionForm question={currentQuestion} handleSubmit={this.validateQuestion} submitLabel={'Next'}
                          questionIsEditable={false}/>
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
  answers: [{value: ''}]
})


const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const exam = state.exams.find(x => x.id === parseInt(id))

  return {
    exam: exam || {questions: []},
    currentQuestion: buildEmptyQuestion(),
    completedQuestionIds: []
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(PracticeExamPage)