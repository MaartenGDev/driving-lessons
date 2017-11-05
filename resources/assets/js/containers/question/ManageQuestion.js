import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateQuestion } from './../../actions/questionActions'

class QuestionForm extends Component {
  state = {
    question: Object.assign({}, this.props.question)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      question: Object.assign({}, nextProps.question),
    })
  }

  handleSave = e => {
    e.preventDefault()
    this.props.dispatch(updateQuestion(this.state.question))
    this.props.history.push('/questions');
  }

  handleChange = event => this.setQuestionState(event, event.target.value)
  handleListChange = (event, listIndex) => {
    const {name, value} = event.target
    const listValues = this.state.question[name]
    listValues[listIndex] = Object.assign({}, listValues[listIndex], {value: value})

    this.setQuestionState(event, listValues)
  }

  setQuestionState = ({target}, value) => {
    const {name} = target
    const previousForm = this.state.question

    this.setState({question: Object.assign(previousForm, {[name]: value})})
  }

  addAnswer = e => {
    const question = {...this.state.question}
    question.answers = [...question.answers, {value: ''}]

    this.setState({question})
  }

  destroyAnswer = (e, index) => {
    const answers = this.state.question.answers.filter((x, i) => i !== index)
    this.setState({question: Object.assign({}, this.state.question, {answers})})
  }

  render () {
    const {value, answers} = this.state.question
    const hasBeenSaved = this.state.question.id !== undefined

    return (
      <section className="container mx-auto mt-6 bg-white shadow-md rounded p-4">
        <form className="w-full" onSubmit={this.handleSave}>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block text-grey-darker text font-bold mb-2" htmlFor="questions-input">
                Question
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="questions-input" type="text" placeholder="The best question here" name="value"
                value={value} onChange={this.handleChange}/>
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <section className="flex justify-between mb-4">
                <p className="inline-block text-grey-darker font-bold">Answers</p>
                <button
                  className="bg-indigo hover:bg-indigo-dark text-white rounded no-underline block py-3 px-4 ml-2 text-xs"
                  onClick={this.addAnswer}
                  type="button"
                >
                  Add Answer
                </button>
              </section>
              {answers.map((answer, index) => {
                return <section className="w-full flex mt-3" key={index}>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="grid-password" type="text" placeholder="An possible answer" name="answers"
                    value={answer.value} onChange={e => this.handleListChange(e, index)}/>

                  <button
                    className="bg-red hover:bg-red-dark text-white rounded no-underline block py-3 px-4 ml-2 text-xs"
                    type="button" onClick={e => this.destroyAnswer(e, index)}>
                    <i className="material-icons text-md">delete</i>
                  </button>
                </section>
              })}

            </div>
          </div>

          <button type="submit"
                  className="bg-green hover:bg-green-dark text-white p-2 mb-2 rounded no-underline inline-block text-md">
            {hasBeenSaved ? 'Update' : 'Create'}
          </button>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)