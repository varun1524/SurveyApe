import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {chooseQuestion} from '../actions/question';
import QuestionComponent from './QuestionComponent';
import QuestionDashboard from './QuestionDashboard';

import '../stylesheets/QuestionSidebar.css';

class QuestionSidebar extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    renderQuestionTypes() {
        return this.props.state.questionTypes.map((question) => {
            return(
                    <a key={question.id} href = "#" onClick={() => this.props.chooseQuestion(question)}>{question.question_type}</a>
            )
        });
    }

    render() {

        return(

            <div className="QuestionSidebar">
                <div className="sidenav">
                    {this.renderQuestionTypes()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({chooseQuestion: chooseQuestion}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSidebar);