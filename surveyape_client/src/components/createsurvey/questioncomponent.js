import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../../stylesheets/createsurvey/questioncomponent.css';
import {bindActionCreators} from "redux";
import {addQuestion, editQuestion,editOption, addOption} from "../../actions/survey";
import {Glyphicon} from "react-bootstrap";
import StarRatingComponent from 'react-star-rating-component';

class QuestionComponent extends Component {

    constructor() {
        super();
        this.state = {
            rating: 0
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

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
                </div>
           );
        }
        else {
            return(
                <div>
                    <button type="button" className="add-option-button-yes-no" onClick={()=>{this.addOptionView()}}></button>
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

                <div className="remove-glyphicon-question">
                    <span onClick={() => {console.log("cross")}}><Glyphicon glyph="remove"/></span>
                </div>

                {this.getAddButtonView()}

            </div>
        );
    }

    getOptionView(){
        if(this.props.question_type === "CheckBox"){
           return(
               <div>
                   {
                       this.props.questions[this.props.index_id].options.map((option, id) => {
                           console.log("[QuestionComponent] getOptionView() ")
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
                                       <span onClick={() => {console.log("cross")}}><Glyphicon glyph="remove"/></span>
                                   </div>
                               </div>
                           )
                       })
                   }
               </div>);
        }
        else if(this.props.question_type === "RadioGroup"){
            return(
                <div>
                    {
                        this.props.questions[this.props.index_id].options.map((option, id) => {

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
                                        <span onClick={() => {console.log("cross")}}><Glyphicon glyph="remove"/></span>
                                    </div>
                                </div>
                            )
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
                                        <span onClick={() => {console.log("cross")}}><Glyphicon glyph="remove"/></span>
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
                                           placeholder="Enter option here"
                                           value=""

                                    />
                                    <div className="remove-glyphicon-option">
                                        <span onClick={() => {console.log("cross")}}><Glyphicon glyph="remove"/></span>
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
        console.log(this.props.index_id)
        console.log(this.props.question_type)
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
        editQuestion : editQuestion,
        addOption: addOption,
        editOption:editOption
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);