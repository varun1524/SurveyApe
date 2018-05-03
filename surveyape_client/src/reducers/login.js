import {actionTypes} from "../actions/actionTypes";

const userdata = {
    user:{},
    created_surveys:[],
    requested_surveys:[]
};

const user = (state = userdata, action)=>
{
    switch (action.type) {

        case actionTypes.LOGIN_SUCCESS :
            console.log("[user reducer] LOGIN_SUCCESS data",action.data);
            return Object.assign({},state,{
                user:action.data
            })
        case actionTypes.UPDATE_SURVEYOR_DASHBOARD :
            console.log("[user reducer]  UPDATE_SURVEYOR_DASHBOARD data created_surveys:",action.created_surveys);
            return Object.assign({},state,{
                created_surveys:action.created_surveys,
                requested_surveys:action.requested_surveys
            })
        default :
            return state;
    }
};

export default user;