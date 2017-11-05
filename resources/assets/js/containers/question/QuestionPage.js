import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as questionActions from '../../actions/questionActions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import QuestionList from '../../components/question/QuestionList'

class QuestionPage extends Component {
  render () {
    const questions = this.props.questions
    return (
      <section className="container mx-auto mt-6 bg-white shadow-md rounded p-4">
        <Link to="questions/add"
              className="bg-green hover:bg-green-dark text-white p-2 mb-2 rounded no-underline inline-block text-sm">Create
          Question</Link>

        <h3 className="my-4 ml-0 font-normal">Questions</h3>

        <QuestionList questions={questions} />
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
  dispatch,
  actions: bindActionCreators(questionActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage)