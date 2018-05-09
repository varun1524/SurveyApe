import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionComponent from './questioncomponent';
import * as API from './../../api/API';
import {bindActionCreators} from 'redux';
import {updateSurvey,updateSurveyNameDate, changePublishState} from './../../actions/survey';
import Spinner from 'react-spinkit';

import './../../stylesheets/createsurvey/questiondashboard.css';

class QuestionDashboard extends Component {

    constructor() {

        super();
        console.log("constructor questiondashboard");
        this.state = {

        };
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
        console.log("[QuestionDashboard] publishSurvey() Survey Data: ",this.props.survey);
        //console.log(JSON.stringify(this.props.survey));
        API.publishSurvey(this.props.survey.survey_id)
        .then((response)=>{
          if(response.status === 200){
              // console.log("[questiondashboard] publishSurvey successful");

              response.json().then((data)=>{
                  console.log("[QuestionDashboard] Save Survey publish to database after api call",data);
                  let str = this.props.survey.ispublished?"unpublished":"published";
                  alert("Survey "+ str +" successfully !!!");
                  this.props.changePublishState();
              });
          }

        }).catch((error)=>{
          alert("Failed to publish !!!");
          console.log("[QuestionDashboard] publish() error",error);
        })


    }

    saveSurvey(){
        console.log("[QuestionDashboard] saveSurvey() Survey Data: ",this.props.survey);
        //console.log(JSON.stringify(this.props.survey));
        API.updateSurvey(this.props.survey).then((response)=>{
            console.log(response.status);
            if(response.status === 200){
              response.json().then((data)=>{
                  console.log("[QuestionDashboard] Save Survey to database after api call",data);
                  alert("Survey Saved successfully !!!")
                  this.props.updateSurvey(data);
              });
            }else{
                alert("Failed to save survey !!!")
            }

        });
    }

    // getPublishandSave(){
    //     if(this.props.survey.questions.length>0) {
    //         return (
    //             <div>
    //                 <button type="button" className="save-survey-button" onClick={() => {
    //                     this.saveSurvey()
    //
    //                 }}>Save
    //                 </button>
    //                 <button type="button" className="publish-survey-button" onClick={() => {
    //                     this.publishSurvey()
    //
    //                 }}>Publish
    //                 </button>
    //             </div>
    //         );
    //     }
    // }

    componentDidMount(){
        console.log("componentDidMount question dashboard",this.props.param);
        if(this.props.param.hasOwnProperty("survey_id")){
            API.getSurveyById(this.props.param.survey_id).then((response)=>{
                console.log("componentDidMount fetch survey by id status: ", response.status);
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

    closeSurvey(){

    }

    render () {
        console.log("render questiondashboard data ",this.props.survey)

        return(
            <div>
                {/*<Spinner name="ball-spin-fade-loader" color="coral"/>*/}
                <div className="survey-name-p">

                    {this.props.survey.survey_name}
                    <span className="survey-type-span">[{this.props.survey.survey_type}]</span>

                    <span className="end-survey-date-label">{this.props.survey.end_date}</span>
                    <span className="end-survey-date-label">Survey End Date:</span>

                    <input type="date" className="end-survey-datepicker" onChange={(event)=>{
                        let payload ={
                            survey_name:this.props.survey.survey_name,
                            survey_type:this.props.survey.survey_type,
                            end_date:event.target.value
                        }

                        this.props.updateSurveyNameDate(payload);
                    }}/>

                    <button type="button" className="save-survey-button-sample" onClick={() => {this.publishSurvey()}}>{this.props.survey.ispublished?"Unpublish":"Publish"}</button>
                    <button type="button" className="save-survey-button-sample" hidden={!this.props.survey.iseditable} onClick={() => {this.saveSurvey()}}>Save</button>
                    <button type="button" className="save-survey-button-sample"  hidden={(this.props.survey.end_date && this.props.survey.end_date.length >0)}
                            onClick={() => {
                                console.log("[questiondashboard] Close button clicked")
                                this.closeSurvey()
                            }}
                    >Close</button>

                </div>

                {/*<div className="survey-name-p">{this.state.survey.survey_name} <span className="survey-type-span">[{this.state.survey.survey_name}]</span></div>*/}
                {this.displayQuestionComponent()}
                {/*{this.getPublishandSave()}*/}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapstoprops questiondashboard",state.survey);
    return{
        survey: state.survey,
        questions: state.survey.questions,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateSurvey: updateSurvey,
        changePublishState:changePublishState,
        updateSurveyNameDate:updateSurveyNameDate
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDashboard);
