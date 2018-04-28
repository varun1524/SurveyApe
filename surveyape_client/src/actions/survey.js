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