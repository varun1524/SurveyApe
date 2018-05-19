import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from './../../api/API';
import '../../stylesheets/createsurvey/questioncomponent.css';
import {bindActionCreators} from "redux";
import {addQuestion, editQuestion,editOption, addOption, updateSurvey} from "../../actions/survey";
import {Glyphicon} from "react-bootstrap";
import StarRatingComponent from 'react-star-rating-component';

import {alert_types} from '../../config/alert_types';
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../config/alertConfig";

class QuestionComponent extends Component {

    constructor() {
        super();
        this.state = {
            is_option_image : false
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    addOptionView(){
        console.log("addOptionView question index: ",this.props.index_id );
        this.props.addOption({question_index:this.props.index_id})
    }

    editOptionText(option_text, option_index, option_type="text"){
        let payload = {
            option_text:option_text,
            question_index:this.props.index_id,
            option_index:option_index,
            option_type:option_type
        };
        this.props.editOption(payload);
    }

    uploadImage(event, option_index){
        let file = event.target.files[0];
        let fileReader;
        console.log("[QuationComponent] handleFileUpload : ", file);
        fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        let index_id = this.props.index_id;
        let editopttion = this.props.editOption;
        fileReader.onload = function() {
            console.log(fileReader.result);
            let base64data = fileReader.result;
            console.log("[QuationComponent] handleFileUpload base64data: ", base64data);
            // console.log("[QuationComponent] handleFileUpload : ", this.state.is_option_image);
            let payload = {
                option_text:base64data,
                question_index:index_id,
                option_index:option_index,
                option_type:"image"
            };
            console.log("[QuationComponent] handleFileUpload :", payload);
            editopttion(payload);
        };

    }

    deleteOption(option){
        API.deleteOption(option,this.props.survey.survey_id)
            .then((response)=>{
                if(response.status === 200){
                    response.json().then((data)=>{
                        console.log("[QuestionComponent] deleteOption() ",data);
                        showAlert("Option deleted successfully !!!", alert_types.SUCCESS, this);
                        // alert("Option deleted successfully !!!");
                        this.props.updateSurvey(data);
                    });
                }else{
                    showAlert("Failed to deleted option !!!", alert_types.ERROR, this);
                    // alert("Failed to deleted option !!!");
                    console.log("[QuestionComponent] Failed to delete Option")

                }
            }).catch((error)=>{
            showAlert("Failed to deleted option !!!", alert_types.ERROR, this);
            // alert("Failed to deleted option !!!");
            console.log("[QuestionComponent] Error",error)
        })
    }


    deletequestion(question_id){

        API.deleteQuestion(question_id,this.props.survey.survey_id)
            .then((response)=>{
                if(response.status === 200){
                    response.json().then((data)=>{
                        console.log("[QuestionComponent] deletequestion() ",data);
                        showAlert("Question deleted successfully !!!", alert_types.SUCCESS, this);
                        // alert("Question deleted successfully !!!");
                        this.props.updateSurvey(data);
                    });
                }else{
                    showAlert("Failed to deleted question !!!", alert_types.ERROR, this);
                    // alert("Failed to deleted question !!!");
                    console.log("[QuestionComponent] Failed to delete question")

                }
            }).catch((error)=>{
            showAlert("Failed to deleted question !!!", alert_types.ERROR, this);
            // alert("Failed to deleted question !!!");
            console.log("[QuestionComponent] Error",error)
        })
    }

    editQuestionText(question_text){
        console.log(this.props.index_id,"  question_text ",question_text );
        let payload = {
            question_text:question_text,
            question_index:this.props.index_id,
        };

        this.props.editQuestion(payload);
    }

    getAddButtonView(){
        if((this.props.question_type === "CheckBox") || (this.props.question_type === "RadioGroup")){
            return(
                <div>

                    {/*<div className="remove-glyphicon-question">*/}
                    {/*<span onClick={() => {*/}
                    {/*this.deletequestion(this.props.questions[this.props.index_id].question_id)*/}
                    {/*}}><Glyphicon glyph="remove"/></span>*/}
                    {/*</div>*/}

                    <button type="button" className="add-option-button" onClick={()=>{this.addOptionView()}}>Add Option</button>
                    <div className="add-image-option-button">
                        <input type="checkbox" id="cbOptionImage"
                               onChange={(event) => {
                                   this.setState({
                                       ...this.state,
                                       is_option_image: event.target.checked
                                   })
                               }}/>
                        <label className="image-option-label">Image Option</label>
                    </div>
                    <button type="button"
                            className="delete-option-button"
                            onClick={()=>{this.deletequestion(this.props.questions[this.props.index_id].question_id)}}>Delete</button>
                </div>
            );
        }
        else if(this.props.question_type === "DropDown"){
            return(
                <div>

                    {/*<div className="remove-glyphicon-question">*/}
                    {/*<span onClick={() => {*/}
                    {/*this.deletequestion(this.props.questions[this.props.index_id].question_id)*/}
                    {/*}}><Glyphicon glyph="remove"/></span>*/}
                    {/*</div>*/}

                    <button type="button" className="add-option-button" onClick={()=>{this.addOptionView()}}>Add Option</button>
                    <button type="button" className="add-image-option-button-dd" onClick={()=>{this.addOptionView()}}></button>
                    <button type="button"
                            className="delete-option-button"
                            onClick={()=>{this.deletequestion(this.props.questions[this.props.index_id].question_id)}}>Delete</button>
                </div>
            );
        }
        else {
            return(
                <div>

                    {/*<div className="remove-glyphicon-question">*/}
                    {/*<span onClick={() => {*/}
                    {/*this.deletequestion(this.props.questions[this.props.index_id].question_id)*/}
                    {/*}}><Glyphicon glyph="remove"/></span>*/}
                    {/*</div>*/}
                    <button type="button" className="add-option-button-yes-no" onClick={()=>{this.addOptionView()}}/>
                    <button type="button" className="add-image-option-button-dd" onClick={()=>{this.addOptionView()}}/>
                    <button type="button"
                            className="delete-option-button"
                            onClick={()=>{this.deletequestion(this.props.questions[this.props.index_id].question_id)}}>Delete</button>
                </div>
            );
        }
    }

    getQuestionView(){
        return (
            <div className="get-question-view-div">

                <input className="question-input-box" type="text" placeholder="Type your question here" onChange={(event) => {
                    this.editQuestionText(event.target.value);
                }} defaultValue={this.props.questions[this.props.index_id].question_text}/>

                {this.getAddButtonView()}

            </div>
        );
    }


    getOptionView(){
        if(this.props.question_type === "CheckBox"){
            console.log("[questioncomponent] is_option_type: " , this.state);
            console.log("[questioncomponent] is_option_type: " , this.state.is_option_image);
            return(
                <div>
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {
                            console.log("[QuestionComponent] getOptionView() ", option.option_type);
                            if(this.state.is_option_image || option.option_type==="image"){
                                return(
                                    <div className="option-input-box">
                                        <input type="checkbox"
                                               className="option-type"/>

                                        <input type="file"
                                               onChange={((event)=>{this.uploadImage(event, id)})}
                                               className="option-image-choose-file"
                                        />

                                        <span className="remove-glyphicon-option" onClick={() => {
                                            this.deleteOption(option.option_id)
                                        }}><Glyphicon glyph="remove"/></span>

                                        <div className="option-actual-image-div">
                                            <img src={option.option_text}
                                                 height="150"
                                                 width="150"
                                                 className="option-actual-image"
                                                 alt="Please select appropriate image"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return(
                                    <div className="option-input-box">
                                        <input type="checkbox" className="option-type"/>
                                        <input type="text"
                                               className="option-text-box"
                                               placeholder="Enter option here"
                                               defaultValue={option.option_text}
                                               onChange={(event)=>{this.editOptionText(event.target.value, id)}}
                                        />
                                        <div className="remove-glyphicon-option">
                                <span onClick={() => {
                                    this.deleteOption(option.option_id)
                                }}><Glyphicon glyph="remove"/></span>
                                        </div>
                                    </div>
                                )
                            }

                        })
                    }
                </div>);
        }
        else if(this.props.question_type === "RadioGroup"){
            return(
                <div>
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {
                            console.log("[QuestionComponent] getOptionView() ", option.option_type);
                            if(this.state.is_option_image || option.option_type==="image"){
                                return(

                                    <div className="option-input-box">
                                        <input type="radio"
                                               className="option-type"/>

                                        <input type="file"
                                               onChange={((event)=>{this.uploadImage(event, id)})}
                                               className="option-image-choose-file"
                                        />

                                        <span className="remove-glyphicon-option" onClick={() => {
                                            this.deleteOption(option.option_id)
                                        }}><Glyphicon glyph="remove"/></span>

                                        <div className="option-actual-image-div">
                                            <img src={option.option_text}
                                                 height="150"
                                                 width="150"
                                                 className="option-actual-image"
                                                 alt="Please select appropriate image"
                                            />
                                        </div>
                                    </div>

                                    // <div className="option-input-box">
                                    //     <input type="radio" className="option-type"/>
                                    //     <img src={option.option_text} height="150" width="150"/>
                                    //     <input type="file" onChange={((event)=>{this.uploadImage(event, id)})}/>
                                    //     <div className="remove-glyphicon-option">
                                    //        <span onClick={() => {
                                    //            this.deleteOption(option.option_id)
                                    //        }}><Glyphicon glyph="remove"/></span>
                                    //     </div>
                                    // </div>
                                )
                            }
                            else {
                                return(
                                    <div className="option-input-box">
                                        <input type="radio" className="option-type"/>
                                        <input type="text"
                                               className="option-text-box"
                                               placeholder="Enter option here"
                                               defaultValue={option.option_text}
                                               onChange={(event)=>{this.editOptionText(event.target.value, id)}}
                                        />
                                        <div className="remove-glyphicon-option">
                                        <span onClick={() => {
                                            this.deleteOption(option.option_id)
                                        }}><Glyphicon glyph="remove"/></span>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>);

        }
        else if(this.props.question_type === "DropDown"){
            return(
                <div>
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {

                            return(
                                <div className="option-input-box">

                                    <label className="option-type-dropdown">Option{id+1}</label>
                                    <input type="text"
                                           className="option-text-box-dropdown"
                                           placeholder="Enter option here"
                                           defaultValue={option.option_text}
                                           onChange={(event)=>{this.editOptionText(event.target.value, id)}}
                                    />
                                    <div className="remove-glyphicon-option">
                                        <span onClick={() => {
                                            this.deleteOption(option.option_id)
                                        }}><Glyphicon glyph="remove"/></span>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>);
        }
        else if(this.props.question_type === "YesNo"){

            return(
                <div>




                    <div className="option-input-box">
                        <input type="radio" className="option-type"/>
                        <label className="option-text-box-radio">YES</label>
                    </div>
                    <div className="option-input-box">
                        <input type="radio" className="option-type"/>
                        <label className="option-text-box-radio">NO</label>
                    </div>

                </div>
            );

        }
        else if(this.props.question_type === "ShortAnswer"){


            return(
                <div>
                    {
                        //this.props.questions[this.props.index_id].options.map((option, id) => {

                        //  return(
                        <div className="option-input-box">
                            <label className="option-type-dropdown">Option</label>
                            <input type="text"
                                   className="option-text-box-dropdown"
                                   placeholder="This is a sample input box for user input"
                                   value=""
                                   disabled={true}
                            />
                            <div className="remove-glyphicon-option">
                                <span></span>
                            </div>
                        </div>
                        //)
                        //})

                    }

                </div>
            );

        }
        else if(this.props.question_type === "DateTime"){

            return(
                <div className="option-input-box">

                    <div>
                        <input type="date" className="option-text-box" value=""/>
                        <div className="remove-glyphicon-option">
                            <span></span>
                        </div>
                    </div>




                </div>
            );

        }
        else if(this.props.question_type === "StarRating"){
            return(
                <div className="option-input-box">
                    {
                        // this.props.questions[this.props.index_id].options.map((option, id) => {

                        // return(
                        <div className="option-input-box">
                            <label className="option-type-dropdown">Rating</label>
                            {/*<input type="number"*/}
                            {/*className="option-text-box-dropdown"*/}
                            {/*placeholder="Enter your rating here"*/}
                            {/*defaultValue={option.value}*/}
                            {/*onChange={(event)=>{this.editOptionText(event.target.value, id)}}*/}
                            {/*/>*/}
                            {/*<div className="remove-glyphicon-option">*/}
                            {/*<span onClick={() => {console.log("cross")}}><Glyphicon glyph="remove"/></span>*/}
                            {/*</div>*/}
                            <div className="option-type-star">
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={this.state.rating}
                                    // onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>


                        </div>
                        // )
                        // })

                    }
                </div>);
        }

    }

    render() {
        console.log(this.props.index_id);
        console.log(this.props.question_type);
        console.log("this.props.questions[this.props.index_id].options",this.props.questions[this.props.index_id].options)

        console.log("rating", this.state.rating);
        return(
            <div className="QuestionComponent">
                <div className="component_div">

                    <div className="question-div">
                        {/*<div className="question-label">Question:</div>*/}
                        {this.getQuestionView()}

                    </div>

                    <div className="option-div">
                        {this.getOptionView()}
                    </div>

                </div>
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
            </div>
        );


    }
}

function mapStateToProps(state) {
    console.log("questioncomponent : mapStateToProps",state.survey);
    console.log("questioncomponent : mapStateToProps",state.survey.questions);

    return {
        questions: state.survey.questions,
        survey:state.survey
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addQuestion: addQuestion,
        updateSurvey: updateSurvey,
        editQuestion : editQuestion,
        addOption: addOption,
        editOption:editOption
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);
