import {actionTypes} from "../actions/actionTypes";
import uuidv4 from "uuid";

const survey_data = {
    survey_id:"",
    survey_name: "",
    survey_type:"",
    end_date:"",
    ispublished:false,
    questions:[]
};

const survey = (state = survey_data, action)=>
{
    switch (action.type) {
        case actionTypes.CREATE_SURVEY :
            console.log("CREATE_SURVEY reducer", action.data);

            return Object.assign({},state,{
                survey_id:action.data.survey_id,
                survey_name:action.data.survey_name,
                survey_type:action.data.survey_type,
                end_date:action.data.end_date,
                create_date:action.create_date,
                questions:action.data.questions
            });
        case actionTypes.ADD_QUESTION :
            console.log("ADD_QUESTION reducer",action.question_type);
            let add_questions = state.questions;
            add_questions.push(action.data);
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
                option_id:uuidv4(),
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

        case actionTypes.UPDATE_SURVEY:
            console.log("Update Survey Reducer Action UPDATE_SURVEY ", action.data);

            return Object.assign({},state,{
                survey_id:action.data.survey_id,
                survey_name:action.data.survey_name,
                survey_type:action.data.survey_type,
                end_date:action.data.end_date?new Date(action.data.end_date).toISOString().slice(0,10):action.data.end_date,
                create_date:action.data.create_date,
                ispublished:action.data.ispublished,
                questions:action.data.questions
            });

        case actionTypes.UPDATE_SURVEY_NAME_DATE:
            console.log("UPDATE_SURVEY_NAME_DATE  survey reducer", action.data);
            //state = action.data;
            return Object.assign({},state,{
                survey_name:action.data.survey_name,
                end_date:action.data.end_date}
            );
        default :
            return state;
    }
};

export default survey;
