import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Header from '../header';
import * as API from "../../api/API";
import {bindActionCreators} from "redux";
import {login_success} from "../../actions/login";
import {createSurveyResponse, generateSurveyForm} from "../../actions/surveyresponse";
import '../../stylesheets/statistics/StatisticsDashboard.css';

import {connect} from "react-redux";

class StatisticsDashboard extends Component {

    constructor(){
        super();
        this.state = {

        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        console.log("[StatisticsDashboard] render", this.props.survey);

        return (
            <div className="StatisticsHome">
                <Header
                    handlePageChange = {this.props.handlePageChange}
                    loggedIn = {true}
                />
                <div className="statistics-dashboard-question-label">
                    <h4><strong>Question_1</strong></h4>
                </div>

                <div className="statistics-dashboard-graph-div">

                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    console.log("[SurveyDashboard] state: ", state);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatisticsDashboard));
