import React, {Component} from 'react';
import * as API from './../../api/API';

import '../../stylesheets/userdashboard/mysurvey.css';
import {Glyphicon} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {update_surveyor_dashboard} from "../../actions/login";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ShareSurveyModal from 'react-modal';

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.4)'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        color                 : 'black',
        padding               : '0px',
        alignContent          : 'center',
        width                 : '50%',
        height                : '60%'
    }
};

class mysurvey extends Component {

    constructor() {
        super();
        this.state = {
            shareSurveyModalOpen : false,
            surveyee_emails : ""
        }

        this.openShareSurveyModal = this.openShareSurveyModal.bind(this);

    }

    openShareSurveyModal() {
        console.log("[mysurvey] openShareSurveyModal props : ", this.props);
        this.setState({
            ...this.state,
            shareSurveyModalOpen : true
        })
    }

    closeShareSurveyModal() {
        this.setState({
            ...this.state,
            shareSurveyModalOpen : false
        })
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
                }else if(response.status === 409){
                  console.log(response.json())
                    alert("Can not delete survey, as it has been shared with users !!!")
                }else{

                }

            }).catch((error)=>{
                console.log("[mysurvey] delete survey error ",error)
                alert("Failed to delete survey try again later !!!");
        })
    }

    shareSurvey() {
        console.log("[mysurvey] share_survey()");

        let payload = {
            survey_id : this.props.survey_json.survey_id,
            emailIds : this.state.surveyee_emails
        };

        console.log("[mysurvey] shareSurvey() payload : ", payload);

        API.shareSurvey(payload)
            .then((response) => {
                response.json().then((data) => {
                    console.log("[mysurvey] shareSurvey API message", data.message);
                });
        });
    }

    openStats() {
        console.log("[mysurvey] this.props.survey_json.survey_id)", this.props.survey_json.survey_id);
        this.props.handlePageChange("/surveystats/"+this.props.survey_json.survey_id);
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
                        Survey Type : <strong>{this.props.survey_json.survey_type}</strong>
                    </div>
                </div>


                <span className="mysurvey-actions">
                    <span onClick={() => {this.editSurvey(this.props.survey_json.survey_id)}}><Glyphicon glyph="pencil"/></span>
                    <span onClick={() => {this.deleteSurvey(this.props.survey_json.survey_id)}}><Glyphicon glyph="trash"/></span>
                    <span onClick={() => {this.openShareSurveyModal()}}><Glyphicon glyph="share"/></span>
                    <span onClick={() => {this.openStats(this.props.survey_json.survey_id)}}><Glyphicon glyph="stats"/></span>
                </span>

                <ShareSurveyModal
                    isOpen={this.state.shareSurveyModalOpen}
                    onAfterOpen={this.openShareSurveyModal}
                    onRequestClose={this.closeShareSurveyModal}
                    style={customStyles}
                >
                    <div className="modal-header">
                        <span className="close" onClick={() => {this.closeShareSurveyModal()}}>&times;</span>
                        <h3>SHARE SURVEY</h3>
                    </div>
                    <div className="modal-body">

                        <label className="share-survey-labels">Survey Name :</label>
                        <p className="share-survey-details">{this.props.survey_json.survey_name}</p>

                        <label className="share-survey-labels">Survey Type :</label>
                        <p className="share-survey-details">{this.props.survey_json.survey_type}</p>

                        {/*<label>End Date</label>*/}

                        <textarea name="share-survey-textarea"
                                  id="share-survey-textarea"
                                  cols="30"
                                  rows="7"
                                  onChange={(event)=>{this.state.surveyee_emails = event.target.value;}}
                                  placeholder="Please type in the email addresses separated by comma"
                        ></textarea>

                        <input type="button" className="share-survey-submit" value="Submit" onClick={()=>{this.shareSurvey()}}/>

                        <input type="button" className="share-survey-cancel" value="Cancel" onClick={()=>{this.closeShareSurveyModal()}}/>
                    </div>
                </ShareSurveyModal>
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
