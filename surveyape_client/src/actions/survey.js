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


export function updateSurveyNameDate(data) {
    return {
        type: actionTypes.UPDATE_SURVEY_NAME_DATE,
        data
    }
}
export function changePublishState() {
    return {
        type: actionTypes.CHANGE_SURVEY_PUBLISH_STATE

    }
}

export function closeSurvey(data) {
    return {
        type: actionTypes.CLOSE_SURVEY,
        data

    }
}

export function saveEndDate(data) {
    return {
        type: actionTypes.SAVE_END_DATE,
        data

    }
}

export function deleteQuestion(data) {
    return {
        type: actionTypes.DELETE_QUESTION,
        data

    }
}

export function deleteOption(data) {
    return {
        type: actionTypes.DELETE_OPTION,
        data

    }
}

