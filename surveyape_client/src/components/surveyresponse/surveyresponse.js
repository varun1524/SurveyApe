import React, { Component } from 'react';
import * as API from './../../api/API';
import { Route, withRouter, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateSurvey} from './../../actions/survey';
import {updateSurveyResponse, updateQuestionsInSurveyResponse, createSurveyResponse} from './../../actions/surveyresponse';
import uuidv4 from "uuid";
import QuestionComponent from './questioncomponent';
import Header from './../header';
import '/Users/rutvik/Desktop/Study/275/Projects/SurveyApe/surveyape_client/src/stylesheets/surveyresponse/surveyresponse.css'

class SurveyResponse extends Component {

    componentDidMount(){
        console.log("SurveyResponse params: ", this.props.match.params);
        if(this.props.match.params.hasOwnProperty("survey_id") && this.props.match.params.hasOwnProperty("response_id")){
            //TODO: save response and survey using one API Call to server
            /*API.getSurveyAndResponseById({
                survey_id : this.props.match.params.survey_id,
                response_id : this.props.match.params.response_id
            }).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log(data);
                        // this.props.updateSurvey(data);
                        this.props.updateSurvey(data.survey);
                        this.props.updateSurveyResponse(data.survey_response);
                    });
                }
                else if(response.status===404){

                }
                else if(response.status===400){

                }
            });*/
        }
        else if(this.props.match.params.hasOwnProperty("survey_id")){
            console.log(this.props.match.params);
            console.log("[surveyresponse] param hasProperty survey_id :", this.props.match.params.hasOwnProperty("survey_id"));

            API.getSurveyById(this.props.match.params.survey_id).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log(data);
                        this.props.updateSurvey(data);
                        // this.props.updateSurvey(data.survey);
                        // this.props.updateSurveyResponse(data.survey_response);
                        this.createSurveyResponse()
                    });
                }
                else if(response.status===404){

                }
                else if(response.status===400){

                }
            });
        }
    }

    survey_response = {
        response_id: "",
        survey:{
            survey_id:""
        },
        email : "",
        responses:[]
    };

    createSurveyResponse = (()=>{
        this.survey_response.response_id = uuidv4();
        this.survey_response.email = this.props.user.email;
        this.survey_response.survey.survey_id = this.props.match.params.survey_id;
        this.survey_response.responses = [];
        console.log("Created Survey Response: " , this.survey_response);
        this.props.createSurveyResponse(this.survey_response);
    });

    getSubmitSurvey = (() => {
        if(this.props.survey.questions.length>0){
            return(
                <div>
                    <div>
                        <button type="button" onClick={()=>{this.submitSurvey()}}>Submit</button>
                    </div>
                </div>
            );
        }
    });

    generateSurveyForm = (()=> {
        return(
            this.props.survey.questions.map((question, index) => {
                return (
                    <QuestionComponent question_type={question.question_type} index_id={index}/>
                )
            })
        )
    });

    render() {
        return (
            <div className="">
                <Header
                    // loggedIn = {true}
                />
                <div className="survey-response-main-div">
                    Survey ID: {this.props.survey_response.survey.survey_id}<br/>
                    Survey Name: {this.props.survey.survey_name}
                    {this.generateSurveyForm()}
                    {this.getSubmitSurvey()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapstoprops Survey Response: ", state);
    return{
        survey: state.survey,
        survey_response : state.survey_response,
        user : state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            updateSurvey: updateSurvey,
            updateSurveyResponse : updateSurveyResponse,
            updateQuestionsInSurveyResponse : updateQuestionsInSurveyResponse,
            createSurveyResponse : createSurveyResponse
        }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyResponse));
