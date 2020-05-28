import { combineReducers } from 'redux';
const initialState = {
	user: {  // 用户管理
		list: [],
		total: 0,
        currentPage: 1,
        pageSize:10,
		queryStr: ''
	},
};

export const actionTypes = {
	GET_AUTH_USER_LIST: 'GET_AUTH_USER_LIST', //获取用户列表
};



export default combineReducers({
	
})
