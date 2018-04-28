import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../../stylesheets/createsurvey/questioncomponent.css';
import {bindActionCreators} from "redux";
import {addQuestion, editQuestion,editOption, addOption} from "../../actions/survey";

class QuestionComponent extends Component {

    constructor() {
        super();
        this.state = {
            question : {
                "question-id" : "",
                "question-type" : "",
                "question-text" : "",
                "options" : [
                    {
                        "type" : "checkbox",
                        "optionvalue":""
                    }
                ]
            }
        }
    }



    addOptionView(){
        console.log("addOptionView question index: ",this.props.index_id )
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
        console.log(this.props.index_id,"  question_text ",question_text )
        let payload = {
            question_text:question_text,
            question_index:this.props.index_id,
        };

        this.props.editQuestion(payload);
    }

    render() {
        console.log(this.props.index_id)
        console.log(this.props.question_type)
        console.log("this.props.questions[this.props.index_id].options",this.props.questions[this.props.index_id].options)
        if(this.props.question_type === 'Checkbox') {
            return(
                <div className="QuestionComponent">
                    <div className="component_div">
                        <form>
                            Question:

                            <div style={{width:"100%"}}>
                                <div className="question-input-box">

                                    <input type="text" placeholder="Type your question here" onChange={(event) => {

                                        this.editQuestionText(event.target.value);
                                    }} defaultValue={this.props.questions[this.props.index_id].question_text}/>
                                </div>

                                <div className="add-option-button">
                                    <button type="button" onClick={()=>{this.addOptionView()}}>Add Option</button>
                                </div>
                            </div>

                            <div className="option-input-box">
                                {
                                    this.props.questions[this.props.index_id].options.map((option, id) => {

                                       return(
                                           <div>
                                           <input type="checkbox" />
                                           <input type="text"
                                                  placeholder="Enter option here"
                                                  defaultValue={option.value}
                                                  onChange={(event)=>{this.editOptionText(event.target.value, id)}}
                                           /></div>
                                           )
                                    })

                                }

                            </div>


                        </form>
                    </div>
                </div>
            );
        }
        else if(this.props.question_type === 'Radio Group') {
            return (
                <div className="QuestionComponent">
                    <div className="component_div">
                        <h3>{this.props.question_type}</h3>
                    </div>
                </div>
            );
        }
        else if(this.props.question_type === 'Dropdown') {
            return (
                <div className="QuestionComponent">
                    <div className="component_div">
                        <h3>{this.props.question_type}</h3>
                    </div>

                </div>
            );
        }
        else if(this.props.question_type === 'Yes No') {
            return (
                <div className="QuestionComponent">
                    <div className="component_div">
                        <form>
                            Question:
                            <input type="text" placeholder="Type your question here"/>
                            <label className="question-yes-no-radio-label">
                                <input type="radio" className="question-yes-no-radio-button" value="Yes"/>
                                Yes
                            </label>
                            <label className="question-yes-no-radio-label">
                                <input type="radio" className="question-yes-no-radio-button" value="No"/>
                                No
                            </label>
                        </form>
                    </div>
                </div>
            );
        }
        else if(this.props.question_type === 'Short Answer') {
            return (
                <div className="QuestionComponent">
                    <div className="component_div">
                        <form>
                            Question:
                            <input type="text" placeholder="Type your question here"/>
                            <input type="text" placeholder="Type your answer here"/>
                        </form>
                    </div>
                </div>
            );
        }
        else if(this.props.question_type === 'Date Time') {
            return (
                <div className="QuestionComponent">
                    <div className="component_div">
                        <form>
                            Question:
                            <input type="text" placeholder="Type your question here"/>
                            <input type="date"/>
                        </form>
                    </div>
                </div>
            );
        }
        else if(this.props.question_type === 'Star Rating') {
            return (
                <div className="QuestionComponent">
                    <div className="component_div">

                    </div>
                </div>
            );
        }
        else {
            console.log("questioncomponent : any other question")
        }
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