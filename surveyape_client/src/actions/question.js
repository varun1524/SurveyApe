import {actionTypes} from "./actionTypes";

export const chooseQuestion = (question_type) => {
    // console.log("The question type is : " + question_type.question_type);
    return {
        type: actionTypes.SELECT_QUESTION,
        question_type: question_type
    }
};