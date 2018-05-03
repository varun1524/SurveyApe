import React, {Component} from 'react';
import * as API from './../../api/API';

import '../../stylesheets/userdashboard/mysurvey.css';
import {Glyphicon} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {update_surveyor_dashboard} from "../../actions/login";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class mysurvey extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    editSurvey(survey_id) {
        console.log("[mysurvey] editSurvey() survey id ",survey_id);
        this.props.handlePageChange("/home/createsurvey/" + survey_id);
    }

    deleteSurvey(survey_id) {
        console.log("[mysurvey] deleteSurvey() server request survey_id ", survey_id);
        //this.props.handlePageChange("/home");

        API.deleteSurvey(survey_id)
            .then((response)=>{
                if(response.status === 200){
                    response.json().then((data)=>{
                        console.log(data);
                        console.log("[mysurvey] deleteSurvey() server response data ", data);
                        //this.props.handlePageChange("/home/createsurvey");
                        this.props.update_surveyor_dashboard(data.created_surveys,data.requested_surveys);
                    })
                }

            }).catch((error)=>{
                console.log("[mysurvey] delete survey error ",error)
                alert("Failed to delete survey try again later !!!");
        })
    }

    shareSurvey(survey_id) {
        console.log("[mysurvey] share_survey() clicked for ", survey_id);
        // this.props.handlePageChange("/home/createsurvey/" + survey_id);
    }

    render() {
        console.log("[mysurvey] render" );
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


function mapDispatchToProps(dispatch) {
    return bindActionCreators({update_surveyor_dashboard: update_surveyor_dashboard}, dispatch)
}



export default withRouter(connect(null, mapDispatchToProps)(mysurvey));

