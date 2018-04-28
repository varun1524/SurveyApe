import {actionTypes} from "../actions/actionTypes";

const survey_data = {
    survey_name: "",
    survey_type:"",
    questions:[]
}

const survey = (state = survey_data, action)=>
{
    switch (action.type) {
        case actionTypes.CREATE_SURVEY :
            console.log("CREATE_SURVEY reducer");

            return Object.assign({},state,{
                survey_name:action.data.survey_name,
                survey_type:action.data.survey_type

            });
        case actionTypes.ADD_QUESTION :
            console.log("ADD_QUESTION reducer",action.question_type);
            let add_questions = state.questions;
            add_questions.push({
                question_text:"",
                question_type:action.data.question_type,
                options:action.data.options
            });
            return Object.assign({},state,{
                questions:add_questions
            });
        case actionTypes.EDIT_QUESTION :
            // action data will pass question index and text to be edited
            console.log("EDIT_QUESTION reducer",action.data);
            let edit_questions = state.questions;
            edit_questions[action.data.question_index].question_text = action.data.question_text;
            return Object.assign({},state, {
                questions: edit_questions
            });

        case actionTypes.ADD_OPTIONS :
            console.log("ADD_OPTIONS reducer",action.data.question_index);
            // action data will pass question index and option text value
            let edit_questions1 = state.questions;
            edit_questions1[action.data.question_index].options.push({
                option_type:"text",
                option_text:""
            });

            return Object.assign({},state,{
                questions:edit_questions1
            });

        case actionTypes.EDIT_OPTIONS :
            // action data will pass question index, option index and option text value
            console.log("EDIT_QUESTION reducer",action.data);
            let edit_questions2 = state.questions;
            edit_questions2[action.data.question_index].options[action.data.option_index].option_text =action.data.option_text;
            return Object.assign({},state,{
                questions:edit_questions2
            });
        default :
            return state;
    }
};

export default survey;