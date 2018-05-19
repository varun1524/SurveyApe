import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addQuestion,updateSurvey} from '../../actions/survey';
import UploadModal from 'react-modal';
import ExportSurveyModal from 'react-modal';
import * as API from './../../api/API';
import uuidv4 from 'uuid';
import '../../stylesheets/createsurvey/questionsidebar.css';
import {alert_types} from "../../config/alert_types";
import {showAlert} from "../../config/alertConfig";


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
class QuestionSidebar extends Component {

    constructor() {
        super();
        this.state = {
            uploadModalOpen: false,
            exportSurveyModalOpen: false,
            exportSurveyFileName: "",
            upload_data:{}
        }

        this.openUploadModal = this.openUploadModal.bind(this);
        this.openExportSurveyModal = this.openExportSurveyModal.bind(this);
        // this.closeUploadModal = this.closeUploadModal.bind(this);
        // this.setUploadData = this.setUploadData.bind(this);
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

    addQuestion(question_type){
        let payload ={};
        payload.question_id = uuidv4();
        payload.question_type = question_type;
        payload.question_text = "";
        if(question_type === "CheckBox" || question_type === "RadioGroup" || question_type === "DropDown"){
            payload.options = []
            this.props.addQuestion(payload)
        }else if(question_type === "YesNo"){
            payload.options = [{
                option_id:uuidv4(),
                option_type:"text",
                option_text:"Yes"},
                {
                    option_id:uuidv4(),
                    option_type:"text",
                    option_text:"No"
                }];
            this.props.addQuestion(payload);
        }else if(question_type === "ShortAnswer" || question_type === "DateTime" || question_type === "StarRating"){
            payload.options = [{
                option_id:uuidv4(),
                option_type:"text",
                option_text:""}]
            this.props.addQuestion(payload);
        }

    }

    renderQuestionTypes() {
        return this.props.questionTypes.map((question_type) => {
            return(
                <div>
                    <a key={question_type.id} href = "#" onClick={() => this.addQuestion(question_type.question_type)}>{question_type.question_type}</a>
                    <hr/>
                </div>
            )
        });
    }

    exportSurvey = (()=>{
        let fs = require("fs");
        //TODO: Implement Model to fetch file name
        // let file_name = prompt("Please Enter file name");
        console.log("[QuestionSidebar] exportSurvey filename", this.state.exportSurveyFileName);

        // let export_survey = {
        //     a: 1,
        //     b: 2,
        //     c: {
        //         x: 11,
        //         y: 22
        //     }
        // };

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
        download_Link.setAttribute('download', this.state.exportSurveyFileName + ".txt");
        download_Link.click();
    });

    render() {

        return(

            <div className="QuestionSidebar">
                <div className="sidenav">
                    {this.renderQuestionTypes()}
                    <a key="upload_json_button" href = "#" onClick={()=>{this.openUploadModal()}}>Upload Questions</a>
                    <hr/>
                    <a key="upload_json_button" href = "#" onClick={()=>{this.openExportSurveyModal()}}>Export Survey</a>
                    <hr/>

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
                                    Export Survey
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
                                           this.state.exportSurveyFileName = event.target.value
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
                                    Upload
                                </button>
                            </div>

                        </div>
                    </ExportSurveyModal>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("[Questionsidebar] mapStateToProps() survey: ",state.survey);
    return {
        questionTypes: state.questionTypes,
        survey:state.survey
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addQuestion: addQuestion,updateSurvey:updateSurvey}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSidebar);
