import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionComponent from './questioncomponent';
import * as API from './../../api/API';
import {bindActionCreators} from 'redux';
import {updateSurvey,updateSurveyNameDate, changePublishState, closeSurvey,saveEndDate} from './../../actions/survey';
import Spinner from 'react-spinkit';

import {alert_types} from '../../config/alert_types';
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../config/alertConfig";

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
                  showAlert("Survey " + str + " successfully !!!", alert_types.SUCCESS, this);
                  // alert("Survey "+ str +" successfully !!!");
                  this.props.changePublishState();
              });
          }

        }).catch((error)=>{
            showAlert("Failed to publish !!!", alert_types.ERROR, this);
            // alert("Failed to publish !!!");
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
                  showAlert("Survey Saved successfully !!!", alert_types.SUCCESS, this);
                  // alert("Survey Saved successfully !!!")
                  this.props.updateSurvey(data);
              });
            }else{
                showAlert("Failed to save survey !!!", alert_types.ERROR, this);
                // alert("Failed to save survey !!!")
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
                    showAlert("Survey not found for given id", alert_types.ERROR, this);
                    // alert("Survey not found for given id");
                }
                else if(response.status===400) {
                    showAlert("Error while fetching survey by id", alert_types.ERROR, this);
                    // alert("Error while fetching survey by id");
                }
            });
        }
    }

    closeSurvey(){
        API.closeSurvey(this.props.survey.survey_id)
            .then((response)=>{
                if(response.status === 200){
                    response.json().then((data)=>{
                        showAlert("Survey Closed successfully !!!", alert_types.SUCCESS, this);
                        console.log("[QuestionDashboard] closeSurvey() after server response data: ",data);
                        this.props.closeSurvey(data);
                    });


                }else{
                    showAlert("Failed to close the survey !!!", alert_types.ERROR, this);
                    // alert("Failed to close the survey !!!");
                }

            }).catch((error)=>{

        })

    }

    saveEndDate(end_date){
        console.log("[QuestionDashboard] saveEndDate() end_date: ",end_date);
        API.saveEndDate(this.props.survey.survey_id,end_date)
            .then((response)=>{
                if(response.status === 200){
                    response.json().then((data)=>{
                        console.log("[QuestionDashboard] saveEndDate() after server response data: ",data);
                        this.props.saveEndDate(data)
                    });
                }
            })
    }

    render () {
        console.log("render questiondashboard data ",this.props.survey)
        let display_end_date = this.props.survey.end_date?new Date(this.props.survey.end_date).toDateString():"";
        return(
            <div>
                {/*<Spinner name="ball-spin-fade-loader" color="coral"/>*/}
                <div className="survey-name-p">

                    <span className="survey_name_span">{this.props.survey.survey_name}</span>
                    <span className="survey-type-span">[{this.props.survey.survey_type}]</span>

                    <span className="end-survey-date-label">{display_end_date}</span>
                    <span className="end-survey-date-label">End Date:</span>

                    <input type="date" className="end-survey-datepicker" onChange={(event)=>{
                        // let payload ={
                        //     survey_name:this.props.survey.survey_name,
                        //     survey_type:this.props.survey.survey_type,
                        //     end_date:event.target.value
                        // }

                        //this.props.updateSurveyNameDate(payload);
                        this.saveEndDate(event.target.value)
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
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
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
        saveEndDate:saveEndDate,
        closeSurvey:closeSurvey,
        changePublishState:changePublishState,
        updateSurveyNameDate:updateSurveyNameDate
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDashboard);
