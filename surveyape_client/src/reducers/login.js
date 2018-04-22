import {actionTypes} from "../actions/actionTypes";

const userdata = [];

const user = (state = userdata, action)=>
{
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS :
            console.log(action);
            state = action.data;
            return state;
        default :
            return state;
    }
};

export default user;