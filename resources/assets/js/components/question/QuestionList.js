import React from 'react'
import PropTypes from 'prop-types'
import Question from './Question'

const QuestionList = ({questions, onQuestionClick}) => {
  console.log(questions)

  return (
    <section>
      {questions.map(question => {
        return <Question
          key={question.id}
          value={question.value}
          answers={question.answers}
          onClick={() => onQuestionClick(question.id)}
        />
      })}
    </section>
  )
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired).isRequired
  }).isRequired).isRequired,
  onQuestionClick: PropTypes.func.isRequired
}

export default QuestionList