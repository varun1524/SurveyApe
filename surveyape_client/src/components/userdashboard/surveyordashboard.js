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
                <div className="surveys-created-by-me">Surveys created by me</div>

                <div>
                    {this.displayAllSurveys()}
                </div>


            </div>
        )
    }

}

export default surveyordashboard;