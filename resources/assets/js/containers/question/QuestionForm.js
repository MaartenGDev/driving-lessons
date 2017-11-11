import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CORRECT, INCORRECT, NOT_VALIDATED } from './questionAnswerTypes'

class QuestionForm extends Component {
  state = {
    question: Object.assign({}, this.props.question)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      question: Object.assign({}, nextProps.question),
    })
  }

  handleChange = event => this.setQuestionState(event, event.target.value)
  handleListChange = (event, listIndex) => {
    const {name, value} = event.target
    const listValues = [...this.state.question[name]]

    listValues[listIndex] = {...listValues[listIndex], value: value, status: NOT_VALIDATED}

    this.setQuestionState(event, listValues)
  }

  setQuestionState = ({target}, value) => {
    const {name} = target
    const previousForm = this.state.question

    this.setState({question: {...previousForm, [name]: value}})
  }

  addAnswer = e => {
    const question = {...this.state.question}
    question.answers = [...question.answers, {value: '', status: NOT_VALIDATED}]

    this.setState({question})
  }

  destroyAnswer = (e, index) => {
    const answers = this.state.question.answers.filter((x, i) => i !== index)
    this.setState({question: {...this.state.question, answers}})
  }

  getBorderForValidationState (type) {
    switch (type) {
      case CORRECT:
        return 'border-2 border-green-lighter'
      case INCORRECT:
        return 'border-2 border-red-lighter'
      case NOT_VALIDATED:
        return 'border border-grey-lighter'
      default:
        return 'border border-grey-lighter'
    }
  }

  render () {
    const {value, answers} = this.state.question

    return (
      <form className="w-full" onSubmit={e => this.props.handleSubmit(e, this.state.question)}>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block text-grey-darker text font-bold mb-2" htmlFor="questions-input">
              Question
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="questions-input" type="text" placeholder="The best question here" name="value"
              value={value} onChange={this.handleChange} disabled={!this.props.questionIsEditable}/>
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
                disabled={this.props.answersAreDisabled}
              >
                Add Answer
              </button>
            </section>
            {answers.map((answer, index) => {
              return <section className="w-full flex mt-3" key={index}>
                <input
                  className={`appearance-none block w-full bg-grey-lighter text-grey-darker ${this.getBorderForValidationState(answer.status)} rounded py-3 px-4`}
                  type="text" placeholder="An possible answer" name="answers"
                  value={answer.value} onChange={e => this.handleListChange(e, index)} disabled={this.props.answersAreDisabled}/>

                <button
                  className="bg-red hover:bg-red-dark text-white rounded no-underline block py-3 px-4 ml-2 text-xs"
                  type="button" onClick={e => this.destroyAnswer(e, index)} disabled={this.props.answersAreDisabled}>
                  <i className="material-icons text-md">delete</i>
                </button>
              </section>
            })}

          </div>
        </div>

        <button type="submit"
                className="bg-green hover:bg-green-dark text-white p-2 mb-2 rounded no-underline inline-block text-md">
          {this.props.submitLabel}
        </button>
      </form>
    )
  }
}

QuestionForm.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  questionIsEditable: PropTypes.bool.isRequired,
  answersAreDisabled: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    value: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired).isRequired
  }).isRequired,
}

export default QuestionForm