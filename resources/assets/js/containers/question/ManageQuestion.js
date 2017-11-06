import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateQuestion } from './../../actions/questionActions'
import QuestionForm from './QuestionForm'

class ManageQuestion extends Component {
  state = {
    question: Object.assign({}, this.props.question)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      question: Object.assign({}, nextProps.question),
    })
  }

  handleSubmit = (e, question) => {
    e.preventDefault()
    this.props.dispatch(updateQuestion(question))
    this.props.history.push('/questions')
  }

  render () {
    const hasBeenSaved = this.state.question.id !== undefined

    return (
      <section className="container mx-auto mt-6 bg-white shadow-md rounded p-4">
        <QuestionForm question={this.state.question} handleSubmit={this.handleSubmit} submitLabel={hasBeenSaved ? 'Update' : 'Create'} questionIsEditable={true}/>
      </section>
    )
  }
}

const buildQuestion = () => ({
  id: undefined,
  value: '',
  answers: [{value: ''}]
})

const mapStateToProps = (state, ownProps) => {
  const questionId = parseInt(ownProps.match.params.id)
  const question = state.questions.find(x => x.id === questionId)

  return {
    question: question === undefined
      ? buildQuestion()
      : question
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageQuestion)