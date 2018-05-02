import React, {Component} from 'react';

import '../../stylesheets/userdashboard/mysurvey.css';
import {Glyphicon} from "react-bootstrap";

class mysurvey extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    editSurvey(survey_id) {
        this.props.handlePageChange("/home/createsurvey/" + survey_id);
    }

    deleteSurvey(survey_id) {
        console.log("delete_icon clicked for ", survey_id);
        // this.props.handlePageChange("/home/createsurvey/" + survey_id);
    }

    shareSurvey(survey_id) {
        console.log("share_survey clicked for ", survey_id);
        // this.props.handlePageChange("/home/createsurvey/" + survey_id);
    }

    render() {
        return (
            <div className="mysurvey">


                <div className="mysurvey-details">
                    <div className="surveyor-dashboard-survey-name">
                        Survey Name : <strong>{this.props.survey_json.survey_name}</strong>
                    </div>

                    <div className="surveyor-dashboard-survey-type">
                        Survey Type: <strong>{this.props.survey_json.survey_type}</strong>
                    </div>

                </div>


                <span className="mysurvey-actions">
                    <span onClick={() => {this.editSurvey(this.props.survey_json.survey_id)}}><Glyphicon glyph="pencil"/></span>
                    <span onClick={() => {this.deleteSurvey(this.props.survey_json.survey_id)}}><Glyphicon glyph="trash"/></span>
                    <span onClick={() => {this.shareSurvey(this.props.survey_json.survey_id)}}><Glyphicon glyph="share"/></span>
                </span>
                {/*<button type="button" onClick={() => {*/}
                    {/*this.editSurvey(this.props.survey_json.survey_id)*/}
                {/*}}>Edit</button>*/}
            </div>
        )
    }

}

export default mysurvey;