import React, { Component } from 'react';
import * as API from './../../api/API';
import { Route, withRouter, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {generateSurveyForm, createSurveyResponse} from './../../actions/surveyresponse';
import {login_success} from './../../actions/login'
import uuidv4 from "uuid";
import QuestionComponent from './questioncomponent';
import Header from './../header';
import '../../stylesheets/surveyresponse/surveyresponse.css'

class SurveyResponse extends Component {

    constructor(){
        super();
        this.state={
            readOnly : false,
            loggedIn : false,
            sendcopy : false,
            email : "",
            emailcolor : "red"
        }
    }

    validateSession = (()=>{
        API.validateSession().then((response)=>{
            if(response.status===200){
                response.json().then((data)=>{
                    console.log("[SurveyResponse] ValidateSession: ", data);
                    this.setState({
                        ...this.state,
                        loggedIn : true,
                        email : data.email
                    });
                    this.props.login_success(data);
                });
            }
            else if(response.status===404){
                console.log("[SurveyResponse] ValidateSession user not logged in");
                this.setState({
                    ...this.state,
                    loggedIn : false
                });
            }
            else {
                alert("[SurveyResponse] Error while checking session existance");
            }
        });
    });

    componentDidMount(){
        this.validateSession();

        console.log("SurveyResponse params: ", this.props.match.params);
        if(this.props.match.params.hasOwnProperty("survey_id")){
            console.log(this.props.match.params);
            console.log("[surveyresponse] param hasProperty survey_id :", this.props.match.params.hasOwnProperty("survey_id"));
            API.getSurveyById(this.props.match.params.survey_id).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log("[SurveyResponse]", data);
                        if(data.ispublished){
                            this.props.generateSurveyForm(data);
                            this.createSurveyResponse();
                        }
                        else{
                            alert("Survey is not published");
                            this.props.handlePageChange("/")
                        }
                    });
                }
                else if(response.status===404){
                    alert("Error 404 in getSurveyById")
                }
                else if(response.status===400){
                    alert("Error 400 in getSurveyById")
                }
            });
        }
        else if(this.props.match.params.hasOwnProperty("response_id")){
            API.getSurveyAndResponseByResponseId(this.props.match.params.response_id).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log("getSurveyAndResponseByResponseId: ", data);
                        if(data.ispublished){
                            this.props.generateSurveyForm(data.survey);
                            this.props.createSurveyResponse(data);
                            this.setReadOnly(data);
                        }
                        else{
                            alert("Survey is not published");
                            this.props.handlePageChange("/")
                        }
                    });
                }
                else if(response.status===404){
                    alert("Error 404 in getSurveyAndResponseByResponseId")
                }
                else if(response.status===400){
                    alert("Error 400 in getSurveyAndResponseByResponseId")
                }
            });
        }
        //Closed Survey
        else if(this.props.match.params.hasOwnProperty("cresponse_id")){
            API.getSurveyAndResponseByResponseId(this.props.match.params.cresponse_id).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log("getSurveyAndResponseByResponseId: ", data);
                        if(data.ispublished){
                            this.props.generateSurveyForm(data.survey);
                            this.props.createSurveyResponse(data);
                            this.setReadOnly(data);
                        }
                        else{
                            alert("Survey is not published");
                            this.props.handlePageChange("/")
                        }
                    });
                }
                else if(response.status===203){
                    alert("Error 203 in User not authorized to access this survey");
                    this.props.handlePageChange("/login");
                }
                else if(response.status===404){
                    alert("Error 404 in Response Not Found");
                    this.props.handlePageChange("/login");
                }
                else if(response.status===400){
                    alert("Error 400 in getSurveyAndResponseByResponseId");
                    this.props.handlePageChange("/");
                }
            });
        }
        //Open Survey
        else if(this.props.match.params.hasOwnProperty("oresponse_id")){
            API.getSurveyAndResponseByResponseId(this.props.match.params.response_id).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log("getSurveyAndResponseByResponseId: ", data);
                        if(data.ispublished){
                            this.props.generateSurveyForm(data.survey);
                            this.props.createSurveyResponse(data);
                            this.setReadOnly(data);
                        }
                        else{
                            alert("Survey is not published");
                            this.props.handlePageChange("/")
                        }
                    });
                }
                else if(response.status===404){
                    alert("Error 404 in getSurveyAndResponseByResponseId")
                }
                else if(response.status===400){
                    alert("Error 400 in getSurveyAndResponseByResponseId")
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

    verifyIsSurveyPublisher = ((data)=>{
        if(data.ispublished){

        }
    });

    createSurveyResponse = (()=>{
        this.survey_response.response_id = uuidv4();
        this.survey_response.email = this.props.user.email;
        this.survey_response.survey.survey_id = this.props.match.params.survey_id;
        this.survey_response.responses = [];
        console.log("Created Survey Response: " , this.survey_response);
        this.props.createSurveyResponse(this.survey_response);
    });

    generateSurveyForm = (()=> {
        console.log("SurveyResponse generateSurveyForm: ", this.props.survey);
        return(
            this.props.survey.questions.map((question, index) => {
                return (
                    <QuestionComponent
                        question_type={question.question_type}
                        index_id={index}
                        readOnly = {this.state.readOnly}
                        isLoggedIn = {this.state.isLoggedIn}
                    />
                )
            })
        )
    });

    setReadOnly = ((data)=>{
        console.log("[SurveyResponse] setVisibility: ", data);
        let end_date_time = new Date(data.survey.end_date);
        let current_date_time = new Date();
        console.log("[SurveyResponse] Date difference: ", current_date_time>end_date_time);
        if(data.issubmitted || current_date_time>end_date_time){
            this.setState({
                ...this.state,
                readOnly : true
            })
        }
    });

    submitSurvey = (()=>{
        if(this.state.sendcopy && this.state.isLoggedIn===false && (this.state.email===undefined || this.state.email===null || this.state.email==="")){
            alert("Please provide email id")
        }
        else {
            let regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log("[SurveyResponse] email veriication result: " + regex_email.test(this.state.email.toLowerCase()));

            if(!regex_email.test(this.state.email.toLowerCase())){
                document.getElementById('emailError').innerHTML='Email is invalid';
                document.getElementById('emailError').onfocus = true;
            }
            else {
                API.submitSurveyResponse({
                    response_id:this.props.survey_response.response_id,
                    email: this.state.email,
                    sendcopy: this.state.sendcopy
                }).then((response) => {
                    if (response.status === 200) {
                        response.json().then((data)=>{
                            console.log("[SurveyResponse submitSurveyResponse: Succesful]", data);
                            // this.props.createSurveyResponse(data);
                            alert("Survey Submission Successful");
                            this.props.handlePageChange("/");
                        });
                        this.setState({
                            ...this.state,
                            is_response_disabled : true
                        })
                    }
                    else if (response.status === 404) {
                        alert("Error 404 submitting survey response")
                    }
                    else {
                        alert("Error "+response.status+"submitting Survey Response");
                    }
                });
            }
        }
    });

    showSubmitForm= (()=>{
        if(!this.state.readOnly){
            let regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return (
                <div align="center">
                    <div>
                        Email:
                        <input type="text" value={this.state.email}
                               disabled={this.state.loggedIn}
                               style={{color:this.state.emailColor}}
                               onChange={(event)=>{
                                   this.setState({
                                       ...this.state,
                                       email : event.target.value,
                                       emailColor : regex_email.test(this.state.email) ? 'black' : 'Red'
                                   })
                               }}
                        />
                        <span id="emailError" style={{color:this.state.emailColor}}></span>
                    </div>
                    <div>
                        <input type="checkbox" className="option-"
                               defaultChecked={false}
                               onChange={(event)=>{
                                   console.log("QuestionComponent: ", event.target.checked);
                                   this.setState({
                                       ...this.state,
                                       sendcopy : event.target.checked
                                   })
                               }}
                        /> I want to receive confirmation email
                    </div>
                    <button type="button" className="survey-response-submit-button"
                            onClick={()=> {
                                this.submitSurvey()
                            }}
                    >
                        Submit
                    </button>
                </div>
            )
        }
    });

    render() {
        return (
            <div className="">
                <Header
                    // loggedIn = {true}
                    handlePageChange = {this.handlePageChange}
                />
                <div className="survey-response-main-div">
                    Survey ID: {this.props.survey.survey_id}<br/>
                    Survey Name: {this.props.survey.survey_name}
                    {this.generateSurveyForm()}
                    <br/>
                    <br/>

                    <div>
                        {this.showSubmitForm()}
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("SurveyResponse state: ", state);
    return{
        survey: state.survey_surveyresponse.survey,
        survey_response : state.survey_surveyresponse.survey_response,
        user : state.user.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            createSurveyResponse: createSurveyResponse,
            generateSurveyForm : generateSurveyForm,
            login_success: login_success
        }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyResponse));
