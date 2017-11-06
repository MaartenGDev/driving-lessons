import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as examActions from '../../actions/examActions'
import ExamForm from './ExamForm'

class ManageExam extends Component {
  state = {
    exam: Object.assign({}, this.props.exam)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      exam: Object.assign({}, nextProps.exam),
    })
  }

  handleSubmit = (e, exam) => {
    e.preventDefault()

    this.props.actions.updateExam(exam);
    this.props.history.push('/exams')
  }

  render () {
    return (
      <section className="container mx-auto mt-6 bg-white shadow-md rounded p-4">
        <ExamForm exam={this.state.exam} handleSubmit={this.handleSubmit}/>
      </section>
    )
  }
}

const buildExam = () => ({
  id: undefined,
  name: '',
  description: ''
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
  actions: bindActionCreators(examActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageExam)