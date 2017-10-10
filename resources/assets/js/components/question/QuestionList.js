import React from 'react'
import PropTypes from 'prop-types'
import Question from './Question'


const QuestionList = ({questions, onQuestionClick}) => {
  return (
    <section>
      {questions.map(question => {
        return <Question
          key={question.id}
          {...question}
          onClick={() => onQuestionClick(question.id)}
        />
      })}
    </section>
  )
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onQuestionClick: PropTypes.func.isRequired
}

export default QuestionList