import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ExamList = ({exams, onDeleteExamClick}) => {
  return (
    <table className="w-full text-left" style={{borderCollapse: 'collapse'}}>
      <tbody>
      <tr>
        <td className="p-2 text-grey-darkest">Name</td>
        <td className="p-2 text-grey-darkest">Description</td>
        <td className="p-2 text-grey-darkest">Edit</td>
        <td className="p-2 text-grey-darkest">Remove</td>
      </tr>
      {exams.map(exam =>
        <tr className="hover:bg-grey-light" key={exam.id}>
          <td className="text-grey-darker p-2">{exam.name}</td>
          <td className="text-grey-darker p-2">{exam.description}</td>
          <td className="text-grey-darker p-2">{exam.questions.length}</td>
          <td className="text-grey-darker p-2"><Link className="text-blue no-underline"
                                                     to={`/exams/${exam.id}`}>Edit</Link></td>
          <td className="text-grey-darker p-2">
            <span className="text-red no-underline" onClick={e => onDeleteExamClick(e, exam)}>Remove</span>
          </td>
        </tr>
      )}
      </tbody>
    </table>
  )
}

ExamList.propTypes = {
  exams: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired).isRequired
  }).isRequired).isRequired,
  onDeleteExamClick: PropTypes.func.isRequired
}

export default ExamList