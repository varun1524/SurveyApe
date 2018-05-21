import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionComponent from './questioncomponent';
import * as API from './../../api/API';
import {bindActionCreators} from 'redux';
import {updateSurvey,updateSurveyNameDate, changePublishState, closeSurvey,saveEndDate} from './../../actions/survey';
import Spinner from 'react-spinkit';

import {alert_types} from '../../config/alert_types';
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../config/alertConfig";
import './../../stylesheets/createsurvey/questiondashboard.css';

import UploadModal from 'react-modal';
import ExportSurveyModal from 'react-modal';

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
        height                : '40%'
    }


};



class QuestionDashboard extends Component {

    constructor() {

        super();
        console.log("constructor questiondashboard");
        this.state = {
            uploadModalOpen: false,
            exportSurveyModalOpen: false,
            exportSurveyFileName: "",
            upload_data:{}
        };

        this.openUploadModal = this.openUploadModal.bind(this);
        this.openExportSurveyModal = this.openExportSurveyModal.bind(this);
    }

    openUploadModal(){
        this.setState({
            ...this.state,
            uploadModalOpen : true
        })
    }

    closeUploadModal() {
        this.setState({
            ...this.state,
            uploadModalOpen : false
        })
    }

    openExportSurveyModal(){
        this.setState({
            ...this.state,
            exportSurveyModalOpen : true
        })
    }

    closeExportSurveyModal() {
        this.setState({
            ...this.state,
            exportSurveyModalOpen : false
        })
    }

    setUploadData(file_content){
        console.log("[Questionsidebar] setUploadDate : ", file_content);

        this.state.upload_data.survey_id = this.props.survey.survey_id;
        this.state.upload_data.file_content = file_content;

    }

    onChaneUploadQuestion(event){
        let file = event.target.files[0];
        let fileReader;
        console.log("[Questionsidebar] uploadQuestionJson : ", file);
        fileReader = new FileReader();
        let superThis = this;
        fileReader.onload = function(event) {
            console.log("[Questionsidebar] onload ",event.target.result);
            superThis.setUploadData(event.target.result);
        };

        fileReader.readAsText(file);
        //upload_data.survey_id = this.props.survey.survey_id;

        //this.state.upload_data = upload_data;
        //console.log("[Questionsidebar] uploadQuestionJson :", this.state.upload_data);

    };

    uploadQuestionJson(){
        console.log("[Questionsidebar] uploadQuestionJson before api call upload data: ",this.state.upload_data);
        API.uploadQuestion(this.state.upload_data)
            .then((response)=>{
                if(response.status === 200){
                    response.json().then((data)=>{
                        console.log("Questionsidebar] uploadQuestionJson after api call data: ",data);

                        this.props.updateSurvey(data);
                        this.closeUploadModal();

                    });
                }

            }).catch((error)=>{
            console.log("[Questionsidebar] uploadQuestionJson Error after api call")
        })

    }

    exportSurvey = (()=>{
        console.log("[QuestionSidebar] exportSurvey filename", this.state.exportSurveyFileName);

        console.log("[QuestionSidebar] exportSurvey filename", this.state.exportSurveyFileName, this.state.exportSurveyFileName.match(/^[0-9a-zA-Z]+$/));
        if(this.state.exportSurveyFileName && this.state.exportSurveyFileName.trim().match(/^[0-9a-zA-Z]+[0-9a-zA-Z-_ ]*$/)){

            let export_survey = {
                file_name:this.state.exportSurveyFileName,
                questions:""
            };

            export_survey.questions = this.props.survey.questions;

            export_survey.questions.map((question)=>{
                if(question.hasOwnProperty("question_id")){
                    delete question.question_id;
                }
                if(question.hasOwnProperty("options")){
                    question.options.map((option=>{
                        if(option.hasOwnProperty("option_id")){
                            delete option.option_id;
                        }
                    }))
                }
            });


            console.log("[QuestionSidebar] exportSurvey sampleObject", JSON.stringify(export_survey));

            let data = new Blob([JSON.stringify(export_survey)], {type: 'text'});
            let csvURL = window.URL.createObjectURL(data);
            let download_Link = document.createElement('a');
            download_Link.href = csvURL;
            download_Link.setAttribute('download', this.state.exportSurveyFileName +".txt");
            download_Link.click();

            this.setState({
                ...this.state,
                exportSurveyFileName : ""
            })
        }
        else {
            showAlert("Invalid filename!!", alert_types.ERROR, this);
        }
        this.closeExportSurveyModal();
    });

    displayQuestionComponent() {
        // console.log("In displayQuestionComponent");
        // console.log(this.props.state.questionReducer);

        return this.props.survey.questions.map((question, index) => {
            return(
                <QuestionComponent question_type = {question.question_type} index_id ={index}/>
            )
        });
    }

    publishSurvey(){
        console.log("[QuestionDashboard] publishSurvey() Survey Data: ",this.props.survey);
        //console.log(JSON.stringify(this.props.survey));
        API.publishSurvey(this.props.survey.survey_id)
            .then((response)=>{
                if(response.status === 200){
                    // console.log("[questiondashboard] publishSurvey successful");

                    response.json().then((data)=>{
                        console.log("[QuestionDashboard] Save Survey publish to database after api call",data);
                        let str = this.props.survey.ispublished?"unpublished":"published";
                        showAlert("Survey " + str + " successfully !!!", alert_types.SUCCESS, this);
                        // alert("Survey "+ str +" successfully !!!");
                        this.props.changePublishState();
                    });
                }
                else if(response.status === 401){
                    showAlert("User not authorized to access current page. Please login", alert_types.INFO, this);
                    setTimeout((()=>{
                        this.props.handlePageChange("/login");
                    }),750);
                }

            }).catch((error)=>{
            showAlert("Failed to publish !!!", alert_types.ERROR, this);
            // alert("Failed to publish !!!");
            console.log("[QuestionDashboard] publish() error",error);
        })


    }

    saveSurvey(){
        console.log("[QuestionDashboard] saveSurvey() Survey Data: ",this.props.survey);
        //console.log(JSON.stringify(this.props.survey));
        API.updateSurvey(this.props.survey).then((response)=>{
            console.log(response.status);
            if(response.status === 200){
                response.json().then((data)=>{
                    console.log("[QuestionDashboard] Save Survey to database after api call",data);
                    showAlert("Survey Saved successfully !!!", alert_types.SUCCESS, this);
                    // alert("Survey Saved successfully !!!")
                    this.props.updateSurvey(data);
                });
            }
            else if(response.status ===401){
                showAlert("User not authorized to access current page. Please login", alert_types.INFO, this);
                setTimeout((()=>{
                    this.props.handlePageChange("/login");
                }),750);
            }
            else{
                showAlert("Failed to save survey !!!", alert_types.ERROR, this);
                // alert("Failed to save survey !!!")
            }

        });
    }

    // getPublishandSave(){
    //     if(this.props.survey.questions.length>0) {
    //         return (
    //             <div>
    //                 <button type="button" className="save-survey-button" onClick={() => {
    //                     this.saveSurvey()
    //
    //                 }}>Save
    //                 </button>
    //                 <button type="button" className="publish-survey-button" onClick={() => {
    //                     this.publishSurvey()
    //
    //                 }}>Publish
    //                 </button>
    //             </div>
    //         );
    //     }
    // }

    componentDidMount(){
        console.log("componentDidMount question dashboard",this.props.param);
        if(this.props.param.hasOwnProperty("survey_id")){
            API.getSurveyById(this.props.param.survey_id).then((response)=>{
                console.log("componentDidMount fetch survey by id status: ", response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        this.props.updateSurvey(data);
                    });
                }
                else if(response.status===404){
                    showAlert("Survey not found for given id", alert_types.ERROR, this);
                    // alert("Survey not found for given id");
                }
                else if(response.status===400) {
                    showAlert("Error while fetching survey by id", alert_types.ERROR, this);
                    // alert("Error while fetching survey by id");
                }
            });
        }
    }

    closeSurvey(){
        API.closeSurvey(this.props.survey.survey_id)
            .then((response)=>{
                if(response.status === 200){
                    response.json().then((data)=>{
                        showAlert("Survey Closed successfully !!!", alert_types.SUCCESS, this);
                        console.log("[QuestionDashboard] closeSurvey() after server response data: ",data);
                        this.props.closeSurvey(data);
                    });


                }else{
                    showAlert("Failed to close the survey !!!", alert_types.ERROR, this);
                    // alert("Failed to close the survey !!!");
                }

            }).catch((error)=>{

        })

    }

    saveEndDate(end_date){
        console.log("[QuestionDashboard] saveEndDate() end_date: ",end_date);
        API.saveEndDate(this.props.survey.survey_id,end_date)
            .then((response)=>{
                if(response.status === 200){
                    response.json().then((data)=>{
                        console.log("[QuestionDashboard] saveEndDate() after server response data: ",data);
                        this.props.saveEndDate(data)
                    });
                }
            })
    }

    render () {
        console.log("render questiondashboard data ",this.props.survey)
        let display_end_date = this.props.survey.end_date?new Date(this.props.survey.end_date).toDateString():"";
        return(
            <div>
                {/*<Spinner name="ball-spin-fade-loader" color="coral"/>*/}
                <div className="survey-name-p">

                    <span className="survey_name_span">{this.props.survey.survey_name}</span>
                    <span className="survey-type-span">[{this.props.survey.survey_type}]</span>

                    <span className="end-survey-date-label">{display_end_date}</span>
                    <span className="end-survey-date-label">End Date:</span>

                    <input type="date" className="end-survey-datepicker" onChange={(event)=>{
                        // let payload ={
                        //     survey_name:this.props.survey.survey_name,
                        //     survey_type:this.props.survey.survey_type,
                        //     end_date:event.target.value
                        // }

                        //this.props.updateSurveyNameDate(payload);
                        this.saveEndDate(event.target.value)
                    }}/>

                </div>

                <div className="survey-name-p-2">
                    <button type="button" className="save-survey-button-sample"
                            onClick={() => {this.publishSurvey()}}>{this.props.survey.ispublished?"Unpublish":"Publish"}
                    </button>
                    <button type="button" className="save-survey-button-sample"
                            hidden={!this.props.survey.iseditable}
                            onClick={() => {this.saveSurvey()}}
                    >
                        Save
                    </button>
                    <button type="button" className="save-survey-button-sample"  hidden={(this.props.survey.end_date && this.props.survey.end_date.length >0)}
                            onClick={() => {
                                console.log("[questiondashboard] Close button clicked");
                                this.closeSurvey()
                            }}
                    >
                        Close
                    </button>
                    <button type="button" className="save-survey-button-sample"
                            onClick={() => {this.openUploadModal()}}
                    >
                        Import Survey
                    </button>
                    <button type="button" className="save-survey-button-sample"
                            onClick={() => {this.openExportSurveyModal()}}
                    >
                        Export Survey
                    </button>

                </div>

                <UploadModal
                    isOpen={this.state.uploadModalOpen}
                    onAfterOpen={this.openUploadModal}
                    onRequestClose={this.closeUploadModal}
                    style={customStyles}
                >
                    <div className="modal-header">
                        <h3>Upload Questions</h3>
                    </div>
                    <div className="modal-body">
                        <div className="verify-modal-footer">
                            <input type="file"
                                   onChange={((event)=>{this.onChaneUploadQuestion(event)})}
                                   className="upload-question-choose-file"
                            />
                            <button className ="upload-question-modal-button-close" onClick={() => {
                                this.closeUploadModal()
                            }}>
                                Close
                            </button>
                            <button className ="upload-question-modal-button-upload" onClick={() => {
                                this.uploadQuestionJson()
                            }}>
                                Upload
                            </button>
                        </div>
                    </div>
                </UploadModal>

                <ExportSurveyModal
                    isOpen={this.state.exportSurveyModalOpen}
                    onAfterOpen={this.openExportSurveyModal}
                    onRequestClose={this.closeExportSurveyModal}
                    style={customStyles}
                >
                    <div className="modal-header">
                        <h3>Export Survey</h3>
                    </div>
                    <div className="modal-body">
                        <div className="verify-modal-footer">
                            <label className="export-survey-file-label">Please enter the file name :</label>
                            <input type="text"
                                   onChange={((event)=>{
                                       this.setState({
                                           ...this.state,
                                           exportSurveyFileName : event.target.value
                                       })
                                   })}
                                   className="upload-question-choose-file"
                            />
                            <button className ="upload-question-modal-button-close" onClick={() => {
                                this.closeExportSurveyModal()
                            }}>
                                Close
                            </button>
                            <button className ="upload-question-modal-button-upload" onClick={() => {
                                this.exportSurvey()
                            }}>
                                Export Survey
                            </button>
                        </div>

                    </div>
                </ExportSurveyModal>

                {/*<div className="survey-name-p">{this.state.survey.survey_name} <span className="survey-type-span">[{this.state.survey.survey_name}]</span></div>*/}
                {this.displayQuestionComponent()}
                {/*{this.getPublishandSave()}*/}
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapstoprops questiondashboard",state.survey);
    return{
        survey: state.survey,
        questions: state.survey.questions,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateSurvey: updateSurvey,
        saveEndDate:saveEndDate,
        closeSurvey:closeSurvey,
        changePublishState:changePublishState,
        updateSurveyNameDate:updateSurveyNameDate
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDashboard);
