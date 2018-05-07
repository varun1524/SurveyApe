import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Header from '../header';
import * as API from "../../api/API";
import {bindActionCreators} from "redux";
import {login_success} from "../../actions/login";
import {createSurveyResponse, generateSurveyForm} from "../../actions/surveyresponse";
import '../../stylesheets/statistics/StatisticsHome.css';

import {connect} from "react-redux";

class StatisticsHome extends Component {

    constructor(){
        super();
        this.state = {

        };
    }

    componentWillMount(){

    }

    componentDidMount(){
        API.validateSession().then((response)=>{
            if(response.status===200){
                response.json().then((data)=>{
                    console.log("[StatisticsHome] ValidateSession: ", data);
                    this.setState({
                        ...this.state,
                        loggedIn : true,
                        email : data.email
                    });
                    this.props.login_success(data);
                });
            }
            else if(response.status===404){
                console.log("[StatisticsHome] ValidateSession user not logged in");
                this.setState({
                    ...this.state,
                    loggedIn : false
                });
            }
            else {
                alert("[StatisticsHome] Error while checking session existence");
            }
        });

        console.log("StatisticsHome params: ", this.props.match.params);

        if(this.props.match.params.hasOwnProperty("survey_id")){
            console.log(this.props.match.params);
            console.log("[surveyresponse] param hasProperty survey_id :", this.props.match.params.hasOwnProperty("survey_id"));
            API.getSurveyById(this.props.match.params.survey_id).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log("[StatisticsHome] getSurveyById API response : ", data);
                        this.props.generateSurveyForm(data);
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
    }

    getQuestionComponent() {
        return(
            <div className="statistics-question-component">

                <div className="statistics-question-label">
                    What is the capital of United States?
                </div>

                <button type="button" className="statistics-question-button" onClick={() => {
                    // question id is hardcoded here
                    {this.props.handlePageChange("/surveystats/" + this.props.survey.survey_id + "/" + "1234");}
                }}>Check Stats</button>
            </div>

        )
    }

    render() {
        console.log("[StatisticsHome] render", this.props.survey);

        return (
            <div className="StatisticsHome">
                <Header
                    handlePageChange = {this.props.handlePageChange}
                    loggedIn = {true}
                />
                <div className="welcome-user">
                    <h4>The Survey Id is : <strong>survey_id_number</strong></h4>
                </div>

                <div className="statistics-dashboard">
                    <div className="statistics-dashboard-header">
                        <span className="statistics-survey_name">Survey_Name</span>
                        <span className="statistics-survey-type">[survey_type]</span>

                        <span className="statistics-date-label"><span style={{'font-size' : '14px'}}>Survey End Date: </span><strong>06/10/2018</strong></span>
                        <span className="statistics-date-label"><span style={{'font-size' : '14px'}}>Survey Start Date: </span><strong>06/05/2018</strong></span>

                        <div className="statistics-block-1">
                            <div className="no-of-participants">Number of Participants</div>
                            <span className="no-of-participants-count">30</span>
                        </div>

                        <div className="statistics-block-2">
                            <div className="no-of-participants">Participation Rate</div>
                            <span className="no-of-participants-count">50 %</span>
                        </div>

                    </div>

                    {this.getQuestionComponent()}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatisticsHome));
