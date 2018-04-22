import {actionTypes} from '../actions/actionTypes';
// import question_list from "./question_list";

// const question_list = [];

const question_reducer = (state = [], action) => {

    switch(action.type) {
        case actionTypes.SELECT_QUESTION:
            // console.log(action.question_type);
            state.push(action.question_type);
            // return action.question_type;
            break;
    }

    // console.log(state);
    return state;
}

export default question_reducer;