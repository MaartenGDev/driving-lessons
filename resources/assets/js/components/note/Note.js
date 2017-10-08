import React from 'react';
import PropTypes from 'prop-types';


const Note = ({title, body}) => {
    return (
       <section>
           <h1>{title}</h1>
           <p>{body}</p>
       </section>
    );
};

Note.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

export default Note;