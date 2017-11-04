import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateQuestion } from './../../actions/questionActions'

class QuestionForm extends Component {
  state = {
    form: {
      question: '123',
      answers: ['hello', 'world']
    }
  }

  handleSave = e => {
    e.preventDefault()
    this.props.dispatch(updateQuestion(this.state.form))
  }

  handleChange = event => {
    const {name, value} = event.target
    const previousForm = this.state.form;

    this.setState({form: Object.assign(previousForm, {[name]: value})})
  }

  handleListChange = (event, listIndex) => {
    const {name, value} = event.target
    const previousForm = this.state.form

    const listValues = this.state.form[name];
    listValues[listIndex] = value;

    this.setState({form: Object.assign(previousForm, {[name]: listValues})})
  }

  render () {
    console.log(this.state.form);
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
                id="questions-input" type="text" placeholder="The best question here" name="question"
                value={this.state.form.question} onChange={this.handleChange}/>
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <section className="flex justify-between mb-4">
                <p className="inline-block text-grey-darker font-bold">Answers</p>
                <button
                  className="bg-indigo hover:bg-indigo-dark text-white rounded no-underline block py-3 px-4 ml-2 text-xs">
                  Add Answer
                </button>
              </section>
              {this.state.form.answers.map((answer, index) => {
                return <section className="w-full flex mt-3" key={index}>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="grid-password" type="text" placeholder="An possible answer" name="answers"
                    value={this.state.form.answers[index]} onChange={e => this.handleListChange(e, index)}/>

                  <button
                    className="bg-red hover:bg-red-dark text-white rounded no-underline block py-3 px-4 ml-2 text-xs"><i
                    className="material-icons text-md">delete</i></button>
                </section>
              })}

            </div>
          </div>

          <button type="submit"
                  className="bg-green hover:bg-green-dark text-white p-2 mb-2 rounded no-underline inline-block text-md">
            Create
          </button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  questions: state.questions
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)