import React from 'react'
import PropTypes from 'prop-types'
import Note from './Note'


const NoteList = ({notes, onNoteClick}) => {
  return (
    <section>
      {notes.map(note => {
        return <Note
          key={note.id}
          {...note}
          onClick={() => onNoteClick(note.id)}
        />
      })}
    </section>
  )
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onNoteClick: PropTypes.func.isRequired
}

export default NoteList