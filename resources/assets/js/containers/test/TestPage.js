import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionForm from '../question/QuestionForm'
import Numbers from '../../helpers/Numbers'
import QuestionApi from '../../services/QuestionApi'

class TestQuestion extends Component {
  state = {
    questions: [],
    currentQuestion: {
      value: '',
      answers: [{value: ''}]
    },
    completedQuestionIds: []
  }

  componentWillReceiveProps (nextProps) {
    const nextQuestion = this.getNextQuestion(nextProps.questions, this.state.completedQuestionIds)

    this.setState({
      questions: nextProps.questions,
      currentQuestion: nextQuestion,
      completedQuestionIds: this.state.completedQuestionIds
    })
  }

  loadNextQuestion = () => {
    this.setState({currentQuestion: this.getNextQuestion(this.state.questions, this.state.completedQuestionIds)})
  }

  validateQuestion = (e, question) => {
    e.preventDefault()
    QuestionApi.validate(question).then(res => {
      const hasProvidedCorrectAnswers = true || res.failedFields.length === 0

      if (hasProvidedCorrectAnswers) {
        this.setState({completedQuestionIds: [...this.state.completedQuestionIds, question.id]})
      }

      this.tryLoadNextQuestion();
    })
  }

  tryLoadNextQuestion = () => {
    const hasQuestionsLeft = this.state.questions.length !== this.state.completedQuestionIds.length

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
    const {currentQuestion, questions, completedQuestionIds} = this.state
    const hasQuestionsLeft = this.state.questions.length !== this.state.completedQuestionIds.length

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

const mapStateToProps = (state, ownProps) => {
  return {
    questions: state.questions
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(TestQuestion)