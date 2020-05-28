import { takeEvery } from 'redux-saga/effects'
import { actionTypes } from '../reducer/user'
import { paginationData, callbackFn, receiveData } from './commonSaga'
// import ax from '../axios/index'
// const http = ax.ats.user;

const sagaActions = {
    GET_USER_INFO: 'GET_USER_INFO', // 查询所有用户
    POST_USER_DELETE: 'POST_USER_DELETE', // 删除用户
    POST_USER_LOGIN: 'POST_USER_LOGIN', // 用户登录
    POST_USER_REGISTERED: 'POST_USER_REGISTERED' // 用户注册
}

const ACTION_SAGA = {
    [sagaActions.GET_USER_INFO]: getUserInfo,
    [sagaActions.POST_USER_DELETE]: postUserDelete,
    [sagaActions.POST_USER_LOGIN]: postUserLogin,
    [sagaActions.POST_USER_REGISTERED]: postUserRegistered,
}

// 监听页面请求
function* watchFetch() {
	yield takeEvery(Object.keys(ACTION_SAGA), fetchData);
}

// 匹配操作方法
function* fetchData(action) {
	yield call(ACTION_SAGA[action.type], action);
}

// 查询所有用户
function* getUserInfo(action) {
	let { params } = action;
	params.deptIds && (params.deptIds = params.deptIds.join(','));// 所属部门
    // yield call(paginationData, http.getUserInfo, action, actionTypes.STORE_USER_INFO);
}

// 删除用户
function* postUserDelete(action) {
	// yield call(callbackFn, http.postUserDelete, action);
}

// 用户登录
function* postUserLogin(action) {
	// yield call(callbackFn, http.postUserLogin, action);
}

// 用户注册
function* postUserRegistered(action) {
	// yield call(callbackFn, http.postUserRegistered, action);
}

export default function* rootSaga() {
	// yield all(
	// 	[
	// 		fork(watchFetch)
	// 	]
	// );
}
