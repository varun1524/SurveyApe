import {combineReducers} from 'redux';
import getUser from './login';
import questionTypes from './question_types';
import questionReducer from './question_reducer';

const allReducers = combineReducers({
    //insert reducer name here to combine
    // openissues :Openissues,
    user : getUser,
    questionTypes: questionTypes,
    questionReducer: questionReducer
});

export default allReducers;