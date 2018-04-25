import React, {Component} from 'react';

import '../../stylesheets/userdashboard/mysurvey.css';
import {Glyphicon} from "react-bootstrap";

class mysurvey extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="mysurvey">
                <h3>{this.props.survey_json.survey_name} created on {this.props.survey_json.creation_date}
                <span className="mysurvey-actions">
                    <Glyphicon glyph="pencil"/>
                    <Glyphicon glyph="trash"/>
                    <Glyphicon glyph="share"/>
                </span></h3>
            </div>
        )
    }

}

export default mysurvey;