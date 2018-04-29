import {actionTypes} from "./actionTypes";

export function addQuestion(data) {
    return {
        type: actionTypes.ADD_QUESTION,
        data
    }
}

export function editQuestion(data) {
    return {
        type: actionTypes.EDIT_QUESTION,
        data
    }
}

export function addOption(data) {
    return {
        type: actionTypes.ADD_OPTIONS,
        data
    }
}

export function editOption(data) {
    return {
        type: actionTypes.EDIT_OPTIONS,
        data
    }
}

export function createSurvey(data) {
    return {
        type: actionTypes.CREATE_SURVEY,
        data
    }
}

export function updateSurvey(data) {
    return {
        type: actionTypes.UPDATE_SURVEY,
        data
    }
}