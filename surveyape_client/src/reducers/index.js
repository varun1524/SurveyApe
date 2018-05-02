import {combineReducers} from 'redux';
import getUser from './login';
import questionTypes from './question_types';
import questionReducer from './question_reducer';
import survey from './survey';
import survey_response from './survey_response';

const allReducers = combineReducers({
    //insert reducer name here to combine
    // openissues :Openissues,
    user : getUser,
    questionTypes: questionTypes,
    questionReducer: questionReducer,
    survey: survey,
    survey_response : survey_response
});

export default allReducers;