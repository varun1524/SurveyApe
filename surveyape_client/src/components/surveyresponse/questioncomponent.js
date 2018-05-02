import React, { Component } from 'react';
import * as API from './../../api/API';
import { Route, withRouter, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateAnswer} from './../../actions/surveyresponse';

class QuestionComponent extends Component {

    response = {
        question : {
            question_id:""
        },
        answer_value : ""
    };

    findAnwer = ((question_id, option)=>{
        console.log(this.props.survey_response.responses);
        this.props.survey_response.responses.map((res)=>{
            if(res.question.question_id===question_id){
                if(res.answer_value === option.option_id){
                    console.log("found answer: ", true);
                    return true;
                }
            }
        });
        console.log("Not found answer: ", false);
        return false;
    });

    getQuestionView(){
        return (
            <div>
                <input className="question-input-box" type="text"
                       placeholder="Type your question here"
                       onChange={(event) => {
                           this.editQuestionText(event.target.value);
                       }}
                       disabled="true"
                       defaultValue={this.props.questions[this.props.index_id].question_text}
                />
            </div>
        );
    }

    getOptionView(){
        if(this.props.question_type === "CheckBox"){
            return(
                <div className="option-input-box">
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {
                            let question_id = this.props.questions[this.props.index_id].question_id;
                            return(
                                <div>
                                    <input type="checkbox" className="option-"
                                           value={option.option_id}
                                           onChange={(event)=>{
                                               console.log(event.target.checked, id, question_id);
                                               this.response.check = event.target.checked;
                                               this.response.answer_value = event.target.value;
                                               this.response.question = this.props.questions[this.props.index_id];
                                               this.props.updateAnswer(this.response);
                                           }}
                                    /> {option.option_text}
                                </div>
                            )
                        })
                    }
                </div>);
        }
        else if(this.props.question_type === "RadioGroup"){
            return( <div className="option-input-box">
                {
                    this.props.questions[this.props.index_id].options.map((option, id) => {
                        let question_id = this.props.questions[this.props.index_id].question_id;
                        return(
                            <div>
                                <input type="radio" radioGroup={question_id} name={question_id}
                                       selected={this.findAnwer(question_id, option)}
                                       defaultValue={option.option_id}
                                       onChange={(event)=>{
                                           console.log(event.target.checked, id, question_id, event.target.value);
                                           this.response.answer_value = event.target.value;
                                           this.response.question = this.props.questions[this.props.index_id];
                                           this.props.updateAnswer(this.response);
                                       }}
                                />
                                {option.option_text}
                            </div>
                        )
                    })
                }
            </div>);
        }
        else if(this.props.question_type === "DropDown"){
            return(
                <div className="option-input-box">
                    <select onChange={(event)=>{
                        //TODO: Put Check for Select
                        let question_id = this.props.questions[this.props.index_id].question_id;
                        console.log(event.target.value, question_id);
                        this.response.answer_value = event.target.value;
                        this.response.question = this.props.questions[this.props.index_id];
                        this.props.updateAnswer(this.response);
                    }}>
                        <option>Select</option>
                        {
                            this.props.questions[this.props.index_id].options.map((option, id) => {
                                return(
                                    <option value={option.option_id}>
                                        {option.option_text}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>);
        }
        else if(this.props.question_type === "YesNo"){

            return(
                <div className="option-input-box">
                    {/*{
                        this.props.questions[this.props.index_id].options.map((option, id) => {
                            return(
                                <div>
                                    <input type="radio"/>
                                    <label >{option.option_text}</label>
                                </div>
                            )
                        })
                    }*/}
                    <div>
                        <input type="radio" name={this.props.questions[this.props.index_id].question_id}
                               onChange={(event)=>{
                                   console.log(event.target.checked, event.target.name, event.target.value);
                                   this.response.answer_value = event.target.value;
                                   this.response.question = this.props.questions[this.props.index_id];
                                   this.props.updateAnswer(this.response);
                               }}
                        />
                        <label >YES</label>
                        <input type="radio" name={this.props.questions[this.props.index_id].question_id}
                               onChange={(event)=>{
                                   console.log(event.target.checked, event.target.name, event.target.value);
                                   this.response.answer_value = event.target.value;
                                   this.response.question = this.props.questions[this.props.index_id];
                                   this.props.updateAnswer(this.response);
                               }}
                        />
                        <label >NO</label>
                    </div>
                </div>
            );
        }
        else if(this.props.question_type === "ShortAnswer"){
            return(
                <div className="option-input-box" >
                    {/*{
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
                    }*/}
                    <div>
                        Option
                        <input type="text"
                               placeholder="Enter option here"
                               defaultValue="TODO:"
                               onBlur={(event)=>{
                                   console.log("On Blur: ", event.target.value);
                                   console.log(event.target.checked, event.target.name, event.target.value);
                                   this.response.answer_value = event.target.value;
                                   this.response.question = this.props.questions[this.props.index_id];
                                   this.props.updateAnswer(this.response);
                               }}
                        />
                    </div>
                </div>
            );
        }
        else if(this.props.question_type === "DateTime"){
            return(
                <div className="option-input-box">
                    {/*{*/}
                    {/*this.props.questions[this.props.index_id].options.map((option, id) => {*/}
                    {/*return(*/}
                    {/*<div>*/}
                    {/*<input type="date"/>*/}
                    {/*</div>*/}
                    {/*)*/}
                    {/*})*/}
                    {/*}*/}
                    <div>
                        <input type="date" onChange={(event)=>{
                            console.log("On Change: ", event.target.value);
                            console.log(event.target.checked, event.target.name, event.target.value);
                            this.response.answer_value = event.target.value;
                            this.response.question = this.props.questions[this.props.index_id];
                            this.props.updateAnswer(this.response);
                        }}/>
                    </div>
                </div>
            );
        }
        else if(this.props.question_type === "StarRating"){
            return(
                <div className="option-input-box">
                    <div>
                        <span className="glyphicon glyphicon-star"> *******</span>
                        <input type="number" onChange={(event)=>{
                            console.log("On Change: ", event.target.value);
                            console.log(event.target.checked, event.target.name, event.target.value);
                            this.response.answer_value = event.target.value;
                            this.response.question = this.props.questions[this.props.index_id];
                            this.props.updateAnswer(this.response);
                        }}/>
                    </div>
                </div>);
        }
    }

    componentDidMount(){
        console.log("Did mount called");
    }

    componentWillUpdate(){
        // console.log("Will mount called");
        //TODO: API Request can be made here for saving a response
    }

    render() {
        console.log("Question Index: ", this.props.index_id);
        console.log("Question Type: ", this.props.question_type);
        console.log("this.props.questions[this.props.index_id].options",this.props.questions[this.props.index_id].options)
        console.log("Responses: ", JSON.stringify(this.props.survey_response));
        console.log("Responses: ", this.props.survey_response);
        console.log("Questions: ",this.props.questions);
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
    console.log("mapstoprops Survey Response: ", state);
    return{
        survey: state.survey,
        questions: state.survey.questions,
        survey_response:state.survey_response
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            updateAnswer:updateAnswer
        }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionComponent));
