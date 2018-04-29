import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addQuestion} from '../../actions/survey';
import QuestionComponent from './questioncomponent';
import QuestionDashboard from './questiondashboard';
import uuidv4 from 'uuid';
import '../../stylesheets/createsurvey/questionsidebar.css';

class QuestionSidebar extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    addQuestion(question_type){
        let payload ={}
        payload.question_id = uuidv4();
        payload.question_type = question_type;
        payload.question_text = "";
        if(question_type === "CheckBox" || question_type === "RadioGroup" || question_type === "DropDown"){
            payload.options = []
            this.props.addQuestion(payload)
        }else if(question_type === "YesNo"){
            payload.options = [{
                option_id:uuidv4(),
                option_type:"text",
                option_text:"Yes"},
                {
                  option_id:uuidv4(),
                  option_type:"text",
                  option_text:"No"
              }]
            this.props.addQuestion(payload);
        }else if(question_type === "ShortAnswer" || question_type === "DateTime" || question_type === "StarRating"){
            payload.options = [{
                option_id:uuidv4(),
                option_type:"text",
                option_text:""}]
            this.props.addQuestion(payload);
        }

    }

    renderQuestionTypes() {
        return this.props.questionTypes.map((question_type) => {
            return(
                    <a key={question_type.id} href = "#" onClick={() => this.addQuestion(question_type.question_type)}>{question_type.question_type}</a>
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
