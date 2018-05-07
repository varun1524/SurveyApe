import React, {Component} from 'react';

import '../../stylesheets/userdashboard/myresponse.css';

class myresponse extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        console.log("[myresponse] render this.props : ", this.props.requested_survey_json);
        return (
            <div className="myresponse">

                <div className="myresponse-details">
                    <div className="surveyee-dashboard-survey-name">
                        Survey Name : <strong>{this.props.requested_survey_json.survey.survey_name}</strong>
                    </div>

                    <div className="surveyee-dashboard-survey-type">
                        Survey Type : <strong>{this.props.requested_survey_json.survey.survey_type}</strong>
                    </div>


                </div>
                <button type="button" className="take-survey-button" onClick={
                    ()=>{this.props.handlePageChange("/surveyresponse/"+this.props.requested_survey_json.response_id)}
                }>{this.props.requested_survey_json.issubmitted?"View Your Response":"Take Survey"}</button>
            </div>
        )
    }

}

export default myresponse;
