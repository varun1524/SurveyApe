import React, {Component} from 'react';

import '../../stylesheets/userdashboard/myresponse.css';

class myresponse extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="myresponse">

                <div className="myresponse-details">
                    <div className="surveyee-dashboard-survey-name">
                        Survey Name : <strong>Survey_1</strong>
                    </div>

                    <div className="surveyee-dashboard-survey-type">
                        Survey Type : <strong>Survey_Type</strong>
                    </div>
                </div>

                <h3>{this.props.survey_json.survey.survey_name}</h3>

            </div>
        )
    }

}

export default myresponse;
