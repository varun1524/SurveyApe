import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addQuestion,updateSurvey} from '../../actions/survey';
import UploadModal from 'react-modal';
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
        height                : '60%'
    }


};
class QuestionSidebar extends Component {

    constructor() {
        super();
        this.state = {
            uploadModalOpen:false,
            upload_data:{}
        }
        this.openUploadModal = this.openUploadModal.bind(this);
        //this.setUploadData = this.setUploadData.bind(this);
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
        let payload ={}
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
              }]
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

    render() {

        return(

            <div className="QuestionSidebar">
                <div className="sidenav">
                    {this.renderQuestionTypes()}
                    <a key="upload_json_button" href = "#" onClick={()=>{this.openUploadModal()}}>Upload Questions</a>
                    <hr/>
                    <a key="upload_json_button" href = "#" onClick={()=>{}}>Export Survey</a>
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
                                       className="option-image-choose-file"
                                />
                                <button className ="verify-success-modal-button-close" onClick={() => {
                                    this.closeUploadModal()
                                }}>
                                    Close
                                </button>
                                <button className ="verify-success-modal-button-close" onClick={() => {
                                    this.uploadQuestionJson()
                                }}>
                                    Upload
                                </button>
                            </div>

                        </div>
                    </UploadModal>
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
