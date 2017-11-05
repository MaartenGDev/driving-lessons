import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import QuestionList from '../../components/question/QuestionList'
import { destroyQuestion } from '../../actions/questionActions'

class QuestionPage extends Component {
  deleteQuestion = (e, question) => {
    const {dispatch} = this.props

    dispatch(destroyQuestion(question))
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      questions: Object.assign({}, nextProps.questions),
    })
  }

  render () {
    const questions = this.props.questions
    return (
      <section className="container mx-auto mt-6 bg-white shadow-md rounded p-4">
        <Link to="questions/add"
              className="bg-green hover:bg-green-dark text-white p-2 mb-2 rounded no-underline inline-block text-sm">Create
          Question</Link>

        <h3 className="my-4 ml-0 font-normal">Questions</h3>

        <QuestionList questions={questions} onDeleteQuestionClick={this.deleteQuestion}/>
      </section>
    )
  }
}

QuestionPage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired).isRequired
  }).isRequired).isRequired
}

const mapStateToProps = (state, ownProps) => ({
  questions: state.questions
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage)