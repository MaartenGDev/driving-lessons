import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as examActions from '../../actions/examActions'
import { bindActionCreators } from 'redux'
import ExamList from '../../components/exams/ExamList'
import { Link } from 'react-router-dom'

class ExamPage extends Component {
  state = {
    exams: this.props.exams
  }

  deleteExam = (e, exam) => {
    this.props.actions.destroyExam(exam)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      exams: nextProps.exams,
    })
  }

  render () {
    const {exams} = this.state

    return (<section className="container mx-auto mt-6 bg-white shadow-lg rounded p-4">
      <Link to="exams/add"
            className="bg-green-600 hover:bg-green-800 text-white p-2 mb-2 rounded no-underline inline-block text-sm">Create
        Exam</Link>

      <h3 className="my-4 ml-0 font-bold">Exams</h3>

      <ExamList exams={exams} onDeleteExamClick={this.deleteExam}/>
    </section>)
  }
}

const mapStateToProps = (state, ownProps) => ({
  exams: state.exams
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(examActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ExamPage)
