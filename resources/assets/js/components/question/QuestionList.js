import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const QuestionList = ({questions}) => {
  const onQuestionClick = () => {}
  return (
    <table className="w-full text-left" style={{borderCollapse: 'collapse'}}>
      <tbody>
      <tr className="hover:bg-grey-light">
        <td className="p-2 text-grey-darkest">Question</td>
        <td className="p-2 text-grey-darkest">Answer count</td>
        <td className="p-2 text-grey-darkest">Edit</td>
        <td className="p-2 text-grey-darkest">Remove</td>
      </tr>
      {questions.map(question =>
        <tr className="hover:bg-grey-light" key={question.id}>
          <td className="text-grey-darker p-2">{question.value}</td>
          <td className="text-grey-darker p-2">{question.answers.length}</td>
          <td className="text-grey-darker p-2"><Link className="text-blue" to={"/questions/" + question.id}>Edit</Link> </td>
          <td className="text-grey-darker p-2"><span className="text-red">Remove</span></td>
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