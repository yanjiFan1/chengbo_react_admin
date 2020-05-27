import { combineReducers } from 'redux';
import * as type from '../action/type';
import auth from './auth' // 权限
import user from './user' // 用户中心

//import {fromJS} from 'immutable'
export const actionsTypes = {
    FETCH_START: "FETCH_START",
    FETCH_END: "FETCH_END",
	SET_MESSAGE: "SET_MESSAGE",
	RECEIVE_GLOBAL_DATA: 'RECEIVE_GLOBAL_DATA',// 保存数据
};

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};

const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.name]: handleData(state[action.name], action)
            };
        default:
            return {...state};
    }
};

export function reducer(state = {}, action) {
    switch (action.type) {
        case actionsTypes.FETCH_START:
            return {
                ...state, isFetching: true, ...action.payload
            };
        case actionsTypes.FETCH_END:
            return {
                ...state, isFetching: false, ...action.payload
            };
        case actionsTypes.SET_MESSAGE:
            return {
                ...state,
                isFetching: false,
                msg: action.msg
			};
		case actionsTypes.RECEIVE_GLOBAL_DATA:
			return {
				...state,
				[action.name]: action.data
			};
        default:
            return state
    }
}

export default combineReducers({
    global: reducer,
    auth, // 权限相关
    user
});
