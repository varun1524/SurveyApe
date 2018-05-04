import {actionTypes} from "../actions/actionTypes";
import {question_types} from "./../config/question_types";

const survey_surveyresponse = {
    survey : {
        survey_id:"",
        survey_name: "",
        survey_type:"",
        questions:[]
    },
    survey_response : {
        response_id: "",
        survey:{
            survey_id : ""
        },
        email : "",
        responses:[]
    }

};

const response = (state = survey_surveyresponse, action)=>
{
    switch (action.type) {
        case actionTypes.CREATE_SURVEYRESPONSE:
            console.log("Survey_Response: Create SurveyResponse: ", action.data);
            return Object.assign({},state,{
                survey_response : action.data
            });
        case actionTypes.UPDATE_ANSWER:
            console.log("Survey_Response: Update answer ", action.data);
            let sur_response = state.survey_response;
            sur_response.responses = updateResponseAnswer(action.data, state.survey_surveyresponse.responses);
            return Object.assign({},state,{
                // ...state.survey_response,
                survey_response : sur_response
            });
        case actionTypes.CREATE_SURVEY:
            console.log("Survey_Response: CREATE_SURVEY: ", action.data);

            return Object.assign({},state,{
                survey : action.data
            });
        default:
            return state;
    }
};


export default response;

export function updateResponseAnswer(data, rec_responses){
    let responses = rec_responses;
    let questionExists = false;
    console.log("Update Response Answer", data, responses);
    switch(data.question.question_type) {
        /*case question_types.CHECKBOX:
            let response = {
                question : {
                    question_id : data.question.question_id
                },
                answer_id : uuidv4(),
                answer_value : data.answer_value
            };
            if(data.check){
                responses.push(response);
            }
            else {
                let index = 0;
                for(let i = 0; i<responses.length; i++){
                    if(responses[i].question.question_id===data.question.question_id
                        &&
                        responses[i].answer_value===data.answer_value){
                        responses.splice(i, 1);
                        console.log("checkbox delete : ", responses);
                        break;
                    }
                    index++;
                }
            }
            break;
        case question_types.RADIOGROUP:
        case question_types.DROPDOWN:
            responses.map((res)=>{
                if(res.question.question_id===data.question.question_id){
                    questionExists = true;
                    res.answer_value = data.answer_value
                }
            });
            if(!questionExists){
                let res = {
                    question : {
                        question_id : data.question.question_id
                    },
                    answer_id : uuidv4(),
                    answer_value : data.answer_value
                };
                responses.push(res);
            }
            break;*/
        case question_types.SHORTANSWER:
            responses.map((res)=>{
                if(res.question.question_id===data.question.question_id){
                    questionExists = true;
                    res.answer_value = data.answer_value
                }
            });
            break;
        default:
            break;
    }
    return responses;
}