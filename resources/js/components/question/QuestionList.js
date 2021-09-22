import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { shorten } from '../../helpers/text'

const QuestionList = ({exam, onDeleteQuestionClick}) => {
  const {questions} = exam;
  return (
    <table className="w-full text-left" style={{borderCollapse: 'collapse'}}>
      <tbody>
      <tr>
        <td className="p-2 text-gray-800">Question</td>
        <td className="p-2 text-gray-800">Answer count</td>
        <td className="p-2 text-gray-800">Edit</td>
        <td className="p-2 text-gray-800">Remove</td>
      </tr>
      {questions.map(question =>
        <tr className="hover:bg-gray-200" key={question.id}>
          <td className="text-gray-500 p-2">{shorten(question.value, 60) }</td>
          <td className="text-gray-500 p-2">{question.answers.length}</td>
          <td className="text-gray-500 p-2"><Link className="text-blue-700 no-underline"
                                                     to={`/exams/${exam.id}/questions/${question.id}/edit`}>Edit</Link></td>
          <td className="text-gray-500 p-2"><span className="text-red-700 no-underline"
                                                     onClick={e => onDeleteQuestionClick(e, question)}>Remove</span>
          </td>
        </tr>
      )}
      </tbody>
    </table>
  )
}

QuestionList.propTypes = {
  exam: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired).isRequired
    }).isRequired).isRequired,
  }).isRequired,
  onDeleteQuestionClick: PropTypes.func.isRequired
}

export default QuestionList
