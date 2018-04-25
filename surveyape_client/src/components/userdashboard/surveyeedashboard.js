import React, {Component} from 'react';
import MyResponse from './myresponse';

import '../../stylesheets/userdashboard/surveyeedashboard.css';

class surveyeedashboard extends Component {

    constructor() {
        super();
        this.state = {
            survey_list: [
                {"survey_name" : "Survey_1", "creation_date" : "04/22/2018"},
                {"survey_name" : "Survey_2", "creation_date" : "04/21/2018"},
                {"survey_name" : "Survey_3", "creation_date" : "04/20/2018"}
            ]
        }
    }

    displayAllSurveys() {
        return this.state.survey_list.map((survey) => {
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

export default surveyeedashboard;