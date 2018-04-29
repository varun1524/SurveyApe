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

    render() {
        return (
            <div className="mysurvey">
                <h3>{this.props.survey_json.survey_name} created on {this.props.survey_json.survey_type}</h3>
                {/*<span className="mysurvey-actions">*/}
                    {/*<Glyphicon glyph="pencil"/>*/}
                    {/*<Glyphicon glyph="trash"/>*/}
                    {/*<Glyphicon glyph="share"/>*/}
                {/*</span></h3>*/}
                <button type="button" onClick={() => {
                    this.editSurvey(this.props.survey_json.survey_id)
                }}>Edit</button>
            </div>
        )
    }

}

export default mysurvey;