import {combineReducers} from 'redux'

const initialState = {};

export const actionTypes = {
    GET_USER_INFO: 'GET_USER_INFO', // 查询所有用户
    POST_USER_DELETE: 'POST_USER_DELETE', // 删除用户
    POST_USER_LOGIN: 'POST_USER_LOGIN', // 用户登录
    POST_USER_REGISTERED: 'POST_USER_REGISTERED', // 用户注册

    STORE_USER_INFO: 'STORE_USER_INFO' // 保存所有用户信息
};

// 查询所有用户
export const getUserInfo = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_INFO:
            return{
               ...state, [action.name]: action.data
            }
        default:
            return {...state};
    }
}

// 删除用户
export const postUserDelete = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_USER_DELETE:
            return{
               ...state, [action.name]: action.data
            }
        default:
            return {...state};
    }
}

// 用户登录
export const postUserLogin = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_USER_LOGIN:
            return{
               ...state, [action.name]: action.data
            }
        default:
            return {...state};
    }
}

// 用户注册
export const postUserRegistered = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_USER_REGISTERED:
            return{
               ...state, [action.name]: action.data
            }
        default:
            return {...state};
    }
}

// 保存用户信息
export const user1 = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_USER_INFO:
            return{
               ...state, [action.name]: action.data
            }
        default:
            return {...state};
    }
}

const user = combineReducers({
    getUserInfo, // 用户信息
    postUserDelete, // 删除用户
    postUserLogin, // 用户登录
    postUserRegistered, // 用户注册
    user1
});

export default user
