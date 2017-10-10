import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as questionActions from '../../actions/questionActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Container from '../../components/common/Container';
import QuestionList from '../../components/question/QuestionList';

class QuestionPage extends Component {
    onQuestionClick = () => {
        console.log('clicked');
    }
    render() {
        const questions = this.props.questions;

        return (
            <section>
                <Container>
                    <Link to="questions/add">Create Question</Link>
                </Container>

                <QuestionList questions={questions} onQuestionClick={this.onQuestionClick} />
            </section>
        );
    }
}

QuestionPage.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    }).isRequired).isRequired
};

const mapStateToProps = (state, ownProps) => ({
    questions: state.questions
});


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(questionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);