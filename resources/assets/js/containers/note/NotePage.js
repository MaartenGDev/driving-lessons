import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as noteActions from '../../actions/noteActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Container from '../../components/common/Container';
import NoteList from '../../components/note/NoteList';

class NotePage extends Component {
    onNoteClick = () => {
        console.log('clicked');
    }
    render() {
        const notes = this.props.notes;

        return (
            <section>
                <Container>
                    <Link to="notes/add">Create Note</Link>
                </Container>

                <NoteList notes={notes} onNoteClick={this.onNoteClick} />
            </section>
        );
    }
}

NotePage.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    }).isRequired).isRequired
};

const mapStateToProps = (state, ownProps) => ({
    notes: state.notes
});


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(noteActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);