import {combineReducers} from 'redux';
import getUser from './login';
import questionTypes from './question_types';
import questionReducer from './question_reducer';
import survey from './survey';

const allReducers = combineReducers({
    //insert reducer name here to combine
    // openissues :Openissues,
    user : getUser,
    questionTypes: questionTypes,
    questionReducer: questionReducer,
    survey: survey
});

export default allReducers;