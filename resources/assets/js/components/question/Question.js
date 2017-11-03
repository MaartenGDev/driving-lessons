import React from 'react'
import PropTypes from 'prop-types'

const Question = ({value, answers}) => {
  return (
    <section>
      <h1>{value}</h1>
      <p>{answers.join(', ')}</p>
    </section>
  )
}

Question.propTypes = {
  value: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired
  }).isRequired).isRequired,
}

export default Question