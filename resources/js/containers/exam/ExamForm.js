import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ExamForm extends Component {
  state = {
    exam: Object.assign({}, this.props.exam)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      exam: Object.assign({}, nextProps.exam),
    })
  }

  handleChange = ({target}) => {
    const {name, value} = target
    const previousForm = this.state.exam

    this.setState({exam: Object.assign(previousForm, {[name]: value})})
  }

  render () {
    const hasBeenSaved = this.state.exam.id !== undefined
    const {name, description} = this.state.exam

    return (
      <form className="w-full" onSubmit={e => this.props.handleSubmit(e, this.state.exam)}>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block text-gray-700 text font-bold mb-2" htmlFor="input-name">
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4"
              id="input-name" type="text" placeholder="Exam name" name="name"
              value={name} onChange={this.handleChange}/>
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block text-gray-700 text font-bold mb-2" htmlFor="input-description">
              Description
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4"
              id="input-description" type="text" placeholder="Exam description" name="description"
              value={description} onChange={this.handleChange}/>
          </div>
        </div>

        <button type="submit"
                className="bg-green-600 hover:bg-green-800 text-white p-2 mb-2 rounded no-underline inline-block text-md">
          {hasBeenSaved ? 'Update' : 'Create'}
        </button>
      </form>
    )
  }
}

ExamForm.propTypes = {
  exam: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default ExamForm
