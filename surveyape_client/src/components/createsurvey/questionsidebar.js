import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addQuestion} from '../../actions/survey';
import QuestionComponent from './questioncomponent';
import QuestionDashboard from './questiondashboard';

import '../../stylesheets/createsurvey/questionsidebar.css';

class QuestionSidebar extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    renderQuestionTypes() {
        return this.props.questionTypes.map((question_type) => {
            return(
                    <a key={question_type.id} href = "#" onClick={() => this.props.addQuestion(question_type.question_type)}>{question_type.question_type}</a>
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
        questionTypes: state.questionTypes
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addQuestion: addQuestion}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSidebar);