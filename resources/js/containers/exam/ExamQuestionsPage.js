import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import QuestionList from '../../components/question/QuestionList'
import {destroyQuestion} from '../../actions/questionActions'

class ExamQuestionsPage extends Component {
    state = {
        exam: this.props.exam
    }
    deleteQuestion = (e, question) => {
        const {dispatch} = this.props

        dispatch(destroyQuestion(question))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            exam: nextProps.exam
        })
    }

    render() {
        const {exam} = this.state;
        const {name, description} = exam;

        return (
            <section className="container mx-auto mt-6 bg-white shadow-lg rounded p-4">
                        <h2 className="font-bold">Exam {name}</h2>
                        <p className="text-gray-700 font-normal">{description}</p>

                    <Link to="questions/add"
                          className="bg-green-600 hover:bg-green-800 text-white p-2 mt-6 rounded no-underline inline-block text-sm">Add
                        Question</Link>
                <h3 className="my-4 ml-0 font-bold">Questions</h3>

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
