import {actionTypes} from "../actions/actionTypes";
import uuidv4 from "uuid";
import {question_types} from './../config/question_types';

const survey_response = {
    response_id: "",
    survey:{
        survey_id:""
    },
    email : "",
    responses:[]
};

const temp = {
    response_id:"uuid",
    survey : {
        survey_id: "778d9f88-b7a0-4004-9c8f-0e102683f8c0"
    },
    email:"esdicis@jsdn.com",
    responses: [
        {
            question:{
                question_id:"sdjcds"
            },
            answer_id:"uuid",
            answer_value: 126
        }
    ]
};


const survey = (state = survey_response, action)=>
{
    switch (action.type) {
        case actionTypes.CREATE_SURVEYRESPONSE:
            console.log("Update Survey Response: ", action.data);
            return Object.assign({},state,{
                response_id : action.data.response_id,
                survey:{
                    survey_id : action.data.survey.survey_id
                },
                email : action.data.email,
                responses : action.data.responses
            });
        case actionTypes.UPDATE_SURVEYRESPONSE:
        // console.log("Update Survey Response: ", action.data);
        // state = action.data;
        // return Object.assign({},state,{
        //     survey:action.data
        // });
        case actionTypes.UPDATE_QUESTIONS_IN_RESPONSE:
            console.log("Update Questions in Response: ", action.data);
            let responses1 = state.responses;
            responses1.push(action.data);
            return Object.assign({},state,{
                responses : responses1
            });
        case actionTypes.UPDATE_ANSWER:
            console.log("Update Answer: ", action.data);
            let responses2 = updateResponseAnswer(action.data, state.responses);
            return Object.assign({},state,{
                responses : responses2
            });
        default:
            return state;
    }
};

export function updateResponseAnswer(data, rec_responses){
    let responses = rec_responses;
    let questionExists = false;
    console.log("Update Response Answer", data, responses);
    switch(data.question.question_type) {
        case question_types.CHECKBOX:
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
            break;
        default:
            break;
    }
    return responses;
}

export default survey;
