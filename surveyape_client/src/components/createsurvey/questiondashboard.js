import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionComponent from './questioncomponent';

class QuestionDashboard extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    displayQuestionComponent() {
        console.log("In displayQuestionComponent");
        console.log(this.props.state.questionReducer);

        return this.props.state.questionReducer.map((question) => {
            return(
                <QuestionComponent question_type = {question.question_type}/>
            )
        });
    }

    render () {
        if(!this.props.state.questionReducer) {
            console.log("questionReducer null");
            return (
                <div>questionReducer null</div>
            )
        }
        return(
            <div className="QuestionDashboard">
                {this.displayQuestionComponent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        state: state
    }
}

export default connect(mapStateToProps)(QuestionDashboard);