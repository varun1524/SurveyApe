import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../../stylesheets/createsurvey/questioncomponent.css';
import {bindActionCreators} from "redux";
import {addQuestion, editQuestion,editOption, addOption} from "../../actions/survey";

class QuestionComponent extends Component {


    addOptionView(){
        console.log("addOptionView question index: ",this.props.index_id );
        this.props.addOption({question_index:this.props.index_id})
    }

    editOptionText(option_text, option_index){
        let payload = {
            option_text:option_text,
            question_index:this.props.index_id,
            option_index:option_index
        };

        this.props.editOption(payload);
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
        if((this.props.question_type === "CheckBox") || (this.props.question_type === "RadioGroup") || (this.props.question_type === "DropDown")){
           return(
                <div>
                    <button type="button" className="add-option-button" onClick={()=>{this.addOptionView()}}>Add Option</button>
                </div>);

        }
    }

    getQuestionView(){
        return (
            <div>
                <div>
                    <input className="question-input-box" type="text" placeholder="Type your question here" onChange={(event) => {

                        this.editQuestionText(event.target.value);
                    }} defaultValue={this.props.questions[this.props.index_id].question_text}/>
                </div>

                <div>
                    {this.getAddButtonView()}
                </div>

            </div>
        );
    }

    getOptionView(){
        if(this.props.question_type === "CheckBox"){
           return(
                <div className="option-input-box">
                {
                    this.props.questions[this.props.index_id].options.map((option, id) => {

                        return(
                            <div>
                                <input type="checkbox" className="option-"/>
                                <input type="text"
                                       placeholder="Enter option here"
                                       defaultValue={option.value}
                                       onChange={(event)=>{this.editOptionText(event.target.value, id)}}
                                /></div>
                        )
                    })

                }
                </div>);
        }else if(this.props.question_type === "RadioGroup"){
            return( <div className="option-input-box">
                {
                    this.props.questions[this.props.index_id].options.map((option, id) => {

                        return(
                            <div>
                                <input type="radio" />
                                <input type="text"
                                       placeholder="Enter option here"
                                       defaultValue={option.option_text}
                                       onChange={(event)=>{this.editOptionText(event.target.value, id)}}
                                /></div>
                        )
                    })

                }

            </div>);

        }else if(this.props.question_type === "YesNo"){

            return(
                <div className="option-input-box">
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {

                            return(
                                <div>
                                    <input type="radio"/>
                                    <label >{option.option_text}</label>
                                </div>

                            )
                        })

                    }

                </div>
            );

        }else if(this.props.question_type === "ShortAnswer"){


            return(
                <div className="option-input-box" >
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {

                            return(
                                <div>
                                    Option
                                    <input type="text"
                                           placeholder="Enter option here"
                                           defaultValue={option.value}
                                           onChange={(event)=>{this.editOptionText(event.target.value, id)}}
                                    />
                                </div>
                            )
                        })

                    }

                </div>
            );

        }else if(this.props.question_type === "DateTime"){

            return(
                <div className="option-input-box">
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {

                            return(
                                <div>

                                    <input type="date"
                                    />
                                </div>
                            )
                        })

                    }

                </div>
            );

        }else if(this.props.question_type === "DropDown"){
            return(
                <div className="option-input-box">
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {

                            return(
                                <div>

                                    Option{id+1}
                                    <input type="text"
                                           placeholder="Enter option here"
                                           defaultValue={option.value}
                                           onChange={(event)=>{this.editOptionText(event.target.value, id)}}
                                    /></div>
                            )
                        })

                    }
                </div>);
        }else if(this.props.question_type === "StarRating"){
            return(
                <div className="option-input-box">
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {

                            return(
                                <div>
                                    <span className="glyphicon glyphicon-star"> *******</span>
                                </div>
                            )
                        })

                    }
                </div>);
        }

    }

    render() {
        console.log(this.props.index_id)
        console.log(this.props.question_type)
        console.log("this.props.questions[this.props.index_id].options",this.props.questions[this.props.index_id].options)

            return(
                <div className="QuestionComponent">
                    <div className="component_div">


                            <div className="question-div">
                                Question:
                                {this.getQuestionView()}

                            </div>

                            <div className="option-div">
                                {this.getOptionView()}
                            </div>


                    </div>
                </div>
            );


    }
}

function mapStateToProps(state) {
    console.log("questioncomponent : mapStateToProps",state.survey.questions);

    return {
        questions: state.survey.questions,
        survey:state.survey
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addQuestion: addQuestion,
        editQuestion : editQuestion,
        addOption: addOption,
        editOption:editOption
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);