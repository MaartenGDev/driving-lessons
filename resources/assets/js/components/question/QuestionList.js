import React from 'react'
import PropTypes from 'prop-types'

const QuestionList = ({questions}) => {
  const onQuestionClick = () => {}
  return (
    <table className="w-full text-left" style={{borderCollapse: 'collapse'}}>
      <tbody>
      <tr className="hover:bg-grey-light">
        <td className="p-2 font-bold">Question</td>
        <td className="p-2 font-bold">Answer count</td>
        <td className="p-2 font-bold">Edit</td>
        <td className="p-2 font-bold">Remove</td>
      </tr>
      {questions.map(question =>
        <tr className="hover:bg-grey-light" key={question.id}>
          <td className="p-2">{question.value}</td>
          <td className="p-2">{question.answers.length}</td>
          <td className="p-2"><span className="text-blue">Edit</span> </td>
          <td className="p-2"><span className="text-red">Remove</span></td>
        </tr>
      )}
      </tbody>
    </table>
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
  }).isRequired).isRequired
}

export default QuestionList