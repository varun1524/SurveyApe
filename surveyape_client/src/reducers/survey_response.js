import {actionTypes} from "../actions/actionTypes";

const survey_response = {
    response_id: "",
    survey:{
        survey_id:""
    },
    email : "",
    responses:[]
};

const response = (state = survey_response, action)=>
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
        default:
            return state;
    }
};


export default response;