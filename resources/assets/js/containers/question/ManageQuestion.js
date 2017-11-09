import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateQuestion } from './../../actions/questionActions'
import QuestionForm from './QuestionForm'
import { updateExam } from '../../actions/examActions'

class ManageQuestion extends Component {
  state = {
    exam: this.props.exam,
    question: Object.assign({}, this.props.question)
  }

  componentWillReceiveProps (nextProps) {
    const {exam, question} = nextProps

    this.setState({ exam, question })
  }

  handleSubmit = (e, question) => {
    e.preventDefault()
    const {exam} = this.state
    this.props.dispatch(updateQuestion(question))

    const updatedQuestionsForExam = [...exam.questions.filter(x => x.id !== parseInt(question.id)), question]

    this.props.dispatch(updateExam(Object.assign({}, exam, {questions: updatedQuestionsForExam})));
    this.props.history.push(`/exams/${exam.id}/questions`)
  }

  render () {
    const hasBeenSaved = this.state.question.id !== undefined

    return (
      <section className="container mx-auto mt-6 bg-white shadow-md rounded p-4">
        <QuestionForm question={this.state.question} handleSubmit={this.handleSubmit}
                      submitLabel={hasBeenSaved ? 'Update' : 'Create'} questionIsEditable={true}/>
      </section>
    )
  }
}

const buildQuestion = exam => ({
  id: undefined,
  exam_id: exam !== undefined ? exam.id : undefined,
  value: '',
  answers: [{value: ''}]
})

const mapStateToProps = (state, ownProps) => {
  const {id, questionId} = ownProps.match.params
  const exam = state.exams.find(x => x.id === parseInt(id))

  const question = exam === undefined
    ? undefined
    : exam.questions.find(x => x.id === parseInt(questionId))

  return {
    exam,
    question: question || buildQuestion(exam)
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageQuestion)