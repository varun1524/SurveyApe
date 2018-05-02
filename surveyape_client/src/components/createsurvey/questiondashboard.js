import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionComponent from './questioncomponent';
import * as API from './../../api/API';
import {bindActionCreators} from 'redux';
import {updateSurvey} from './../../actions/survey';
import Spinner from 'react-spinkit';

class QuestionDashboard extends Component {

    constructor() {

        super();
        console.log("constructor questiondashboard");
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

    publishSurvey(){
        console.log("publishSurvey() Survey Data: ",this.props.survey);
        console.log(JSON.stringify(this.props.survey));

    }

    saveSurvey(){

        console.log("saveSurvey() Survey Data: ",this.props.survey);
        console.log(JSON.stringify(this.props.survey));
        API.updateSurvey(this.props.survey).then((response)=>{
            console.log(response.status);
            response.json().then((data)=>{
                console.log(data);
                this.props.updateSurvey(data);
            });
        });
    }

    getPublishandSave(){
        if(this.props.survey.questions.length>0){
            return(
                <div>
                    <div>
                        <button type="button" onClick={()=>{this.saveSurvey()

                        }}>Save</button>
                    </div>
                    <div>
                        <button type="button" onClick={()=>{this.publishSurvey()

                        }}>Publish</button>
                    </div>
                </div>
            );
        }
    }

    componentDidMount(){
        console.log(this.props.param);
        if(this.props.param.hasOwnProperty("survey_id")){
            API.getSurveyById(this.props.param.survey_id).then((response)=>{
                console.log("fetch survey by id status: ", response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        this.props.updateSurvey(data);
                    });
                }
                else if(response.status===404){
                    alert("Survey not found for given id");
                }
                else if(response.status===400) {
                    alert("Error while fetching survey by id");
                }
            });
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
            <div>
                {/*<Spinner name="ball-spin-fade-loader" color="coral"/>*/}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateSurvey: updateSurvey
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDashboard);
