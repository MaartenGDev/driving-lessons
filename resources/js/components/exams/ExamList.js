import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ExamList = ({exams, onDeleteExamClick}) => {
    return (
        <table className="w-full text-left" style={{borderCollapse: 'collapse'}}>
            <tbody>
            <tr>
                <td className="p-2 text-gray-800">Name</td>
                <td className="p-2 text-gray-800">Description</td>
                <td className="p-2 text-gray-800">Question Amount</td>
                <td className="p-2 text-gray-800">Practice</td>
                <td className="p-2 text-gray-800">Manage Questions</td>
                <td className="p-2 text-gray-800">Edit</td>
                <td className="p-2 text-gray-800">Remove</td>
            </tr>
            {exams.map(exam => {
                const shortDescription = exam.description.length > 20
                    ? exam.description.substr(0, 20) + '...'
                    : exam.description;

                return (<tr className="hover:bg-gray-200" key={exam.id}>
                    <td className="text-gray-500 p-2">{exam.name}</td>
                    <td className="text-gray-500 p-2">{shortDescription}</td>
                    <td className="text-gray-500 p-2">{exam.questions.length}</td>

                    <td className="text-gray-500 p-2">
                        <Link className="text-indigo-700 no-underline" to={`/exams/${exam.id}/practice`}>Practice</Link>
                    </td>

                    <td className="text-gray-500 p-2">
                        <Link className="text-pink-700 no-underline" to={`/exams/${exam.id}/questions`}>Manage
                            Questions</Link>
                    </td>

                    <td className="text-gray-500 p-2">
                        <Link className="text-blue-700 no-underline" to={`/exams/${exam.id}/edit`}>Edit</Link>
                    </td>
                    <td className="text-gray-500 p-2">
                        <span className="text-red-700 no-underline"
                              onClick={e => onDeleteExamClick(e, exam)}>Remove</span>
                    </td>
                </tr>);
            })}
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
