import {actionTypes} from "./actionTypes";

export function createSurveyResponse(data) {
    return {
        type: actionTypes.CREATE_SURVEYRESPONSE,
        data
    }
}

export function updateSurveyResponse(data) {
    return {
        type: actionTypes.UPDATE_SURVEYRESPONSE,
        data
    }
}

export function updateAnswer(data) {
    return {
        type: actionTypes.UPDATE_ANSWER,
        data
    }
}

export function updateQuestionsInSurveyResponse(data) {
    return {
        type: actionTypes.UPDATE_QUESTIONS_IN_RESPONSE,
        data
    }
}

export function generateSurveyForm(data) {
    return {
        type: actionTypes.CREATE_SURVEY,
        data
    }
}
