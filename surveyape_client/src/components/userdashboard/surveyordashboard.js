import React, {Component} from 'react';
import MySurvey from './mysurvey';

import '../../stylesheets/userdashboard/surveyordashboard.css';

class surveyordashboard extends Component {

    constructor() {
        super();
        this.state = {
            created_surveys : []
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            created_surveys : this.props.created_surveys
        });
    }

    displayAllSurveys() {
        console.log("surveyordash - displayAllSurveys : ", this.props.created_surveys);
        return this.props.created_surveys.map((survey) => {
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
                <h3>Surveys created by me</h3>

                {this.displayAllSurveys()}

            </div>
        )
    }

}

export default surveyordashboard;