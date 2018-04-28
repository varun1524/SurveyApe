import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionComponent from './questioncomponent';

class QuestionDashboard extends Component {

    constructor() {

        super();
        console.log("constructor questiondashboard")
        this.state = {

        }
    }


    displayQuestionComponent() {
        // console.log("In displayQuestionComponent");
        // console.log(this.props.state.questionReducer);

        return this.props.survey.questions.map((question, index) => {
            return(
                <QuestionComponent question_type = {question.question_type} index_id ={index}/>
            )
        });
    }

    getPublishandSave(){
        if(this.props.survey.questions.length>0){
            return(
                <div>
                    <div>
                        <button type="button">Save</button>
                    </div>
                    <div>
                        <button type="button">Publish</button>
                    </div>
                </div>
            );
        }



    }



    render () {
        console.log("render questiondashboard")
        // if(!this.props.state.questionReducer) {
        //     console.log("questionReducer null");
        //     return (
        //         <div>Empty div</div>
        //     )
        // }
        return(
            <div className="QuestionDashboard">
                {this.displayQuestionComponent()}
                {this.getPublishandSave()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapstoprops questiondashboard",state.survey)
    return{
        survey: state.survey
    }
}

export default connect(mapStateToProps)(QuestionDashboard);