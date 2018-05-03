import React, {Component} from 'react';
import MyResponse from './myresponse';

import '../../stylesheets/userdashboard/surveyeedashboard.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class surveyeedashboard extends Component {



    displayAllSurveys() {
        return this.props.userdashboardDetail.requested_surveys.map((survey) => {
            return (
                <MyResponse survey_json = {survey}/>
            )
        })
    }

    render() {
        return (
            <div className="surveyeedashboard">
                <h3>Surveys for me</h3>

                {this.displayAllSurveys()}
            </div>
        )
    }

}


function mapStateToProps(state) {
    console.log("[SurveyDashboard mapstoProps() state:",state.user);
    return {
        userdashboardDetail:state.user
    };
}


export default withRouter(connect(mapStateToProps, null)(surveyeedashboard));

