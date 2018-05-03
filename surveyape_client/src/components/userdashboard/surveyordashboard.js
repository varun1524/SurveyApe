import React, {Component} from 'react';
import MySurvey from './mysurvey';

import '../../stylesheets/userdashboard/surveyordashboard.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class surveyordashboard extends Component {



    displayAllSurveys() {
        console.log("[surveyordashboard] - displayAllSurveys : ", this.props.userdashboardDetail.created_surveys);
        return this.props.userdashboardDetail.created_surveys.map((survey) => {
            return (
                <MySurvey
                    survey_json = {survey}
                    handlePageChange = {this.props.handlePageChange}
                />
            )
        })
    }

    render() {
        return (
            <div className="surveyordashboard">
                <div className="surveys-created-by-me">Surveys created by me</div>

                <div>
                    {this.displayAllSurveys()}
                </div>


            </div>
        )
    }

}

function mapStateToProps(state) {
    console.log("[surveyordashboard mapstoProps() state:",state.user);
    return {
        userdashboardDetail:state.user
    };
}


export default withRouter(connect(mapStateToProps, null)(surveyordashboard));

