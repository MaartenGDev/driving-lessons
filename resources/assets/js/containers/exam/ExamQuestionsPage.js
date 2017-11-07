import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import QuestionList from '../../components/question/QuestionList'
import { destroyQuestion } from '../../actions/questionActions'

class ExamQuestionsPage extends Component {
  state = {
    exam: this.props.exam
  }
  deleteQuestion = (e, question) => {
    const {dispatch} = this.props

    dispatch(destroyQuestion(question))
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      exam: nextProps.exam
    })
  }

  render () {
    const {exam} = this.state;
    const {name, description} = exam;

    return (
      <section className="container mx-auto mt-6 bg-white shadow-md rounded p-4">
        <h2 className="font-normal">Exam {name}</h2>
        <p className="text-grey font-normal">{description}</p>

        <Link to="questions/add"
              className="bg-green hover:bg-green-dark text-white p-2 mt-6 rounded no-underline inline-block text-sm">Create
          Question</Link>

        <h3 className="my-4 ml-0 font-normal">Questions</h3>

        <QuestionList exam={exam} onDeleteQuestionClick={this.deleteQuestion}/>
      </section>
    )
  }
}

const buildExam = () => ({
  id: undefined,
  name: '',
  description: '',
  questions: []
})

const mapStateToProps = (state, ownProps) => {
  const examId = parseInt(ownProps.match.params.id)
  const exam = state.exams.find(x => x.id === examId)

  return {
    exam: exam === undefined
      ? buildExam()
      : exam
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ExamQuestionsPage)