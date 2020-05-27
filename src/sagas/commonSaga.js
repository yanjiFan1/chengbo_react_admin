
import {put, call, fork, all, takeEvery, takeLatest, cancel, take} from 'redux-saga/effects'
import ac from '../axios/index'
import { actionsTypes as global } from '../reducer/index'
const http = ac.ats.common;
const sagaActions = {
	getaaaa: 'getaaaa',// 查询数据
}

const ACTION_SAGA = {
	[sagaActions.getaaaa]: queryaaaa, // 查询数据
}

// 监听页面请求
function* watchFetch() {
	yield takeEvery(Object.keys(ACTION_SAGA), fetchData);
}

// 匹配操作方法
function* fetchData(action) {
	yield call(ACTION_SAGA[action.type], action);
}

// 公共数据保存方法
export function* receiveData(http, action, type) {
	let res = {};
	try {
		res = yield call(http, action.params);
		if(res && res.code === 200) {
			yield put({
				type: type || global.RECEIVE_GLOBAL_DATA,
				name: action.name || 'list',
                data: Array.isArray(res.data) ?
                        (res.data || []) :
                        (typeof res.data ==='boolean'? res.data: res.data|| {})
			})
		}
	} catch (error) {
		return error
	} finally {
		action.callback && action.callback(res);
		return res;
	}
}

// 回调函数方法
export function* callbackFn(http, action) {
	let res = {};
	try {
		res = yield call(http, action.params);
	} catch (error) {
		res = error.data || {};
		return error
	} finally {
		action.callback && action.callback(res);
		return res;
	}
}

// 函数请求异常处理，适用于请求参数需要处理的函数
export function* wrapFn(http, action) {
	try {
		return yield call(http, action.params);
	} catch (error) {
		return error
	} finally {
		// return res;
	}
}

// 分页数据查询
export function* paginationData(http, action, type) {
	yield put({ type: global.FETCH_START });
	let res = {};
	yield put({
		type: type || global.RECEIVE_GLOBAL_DATA,
		name: action.name || 'list',
		data: []
	})
	try {
		let { params } = action,
		pagination = { currentPage: 1, pageSize: 10 };// 默认分页参数
		params = { ...pagination, ...params };
		res = yield call(http, params);
		if(res && res.code === 200){
			let data = res.data || {};
			// 保存列表数据
			yield put({
				type: type || global.RECEIVE_GLOBAL_DATA,
				name: action.name || 'list',
				data: data.list || []
			})

			// 保存分页数据
			yield put({
                type: global.RECEIVE_GLOBAL_DATA,
                name: 'pagination',
                data: {
					total: data.total || 0,
					currentPage: params.currentPage || 1,
					pageSize: params.pageSize || 10,
				}
            })
		}
		return res;
	} catch (error) {
		return error
	} finally {
		action.callback && action.callback(res);
        yield put({ type: global.FETCH_END });
    }
}

// 查询数据
function* queryaaaa(action) {
	yield call(receiveData, http.getOptionsById, action);
}

export default function* rootSaga() {
	yield fork(watchFetch);
}
