import {actionTypes} from "./actionTypes";

export function addQuestion(question_type) {
    return {
        type: actionTypes.ADD_QUESTION,
        question_type
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