import { connect } from 'react-redux'
import QuestionList from './QuestionList'
import React, { Component } from 'react'

class QuestionPage extends Component {
  render () {
    const {questions} = this.props

    return (
        <section>
          <h1>Questions</h1>
          <QuestionList questions={questions} />
        </section>
      )
  }
}

const mapStateToProps = (state, ownProps) => ({
  questions: state.questions,
})

export default connect(mapStateToProps)(QuestionPage)