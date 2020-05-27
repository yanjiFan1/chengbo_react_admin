import { takeEvery} from 'redux-saga/effects'
import { actionsTypes as global } from '../reducer/index'
import { actionTypes } from '../reducer/auth'
import { paginationData, callbackFn, receiveData } from './commonSaga'
import ax from '../axios/index'
const http = ax.ats.auth;

const sagaActions = {
	
}

const ACTION_SAGA = {
    
}

// 监听页面请求
function* watchFetch() {
	yield takeEvery(Object.keys(ACTION_SAGA), fetchData);
}

// 匹配操作方法
function* fetchData(action) {
	yield call(ACTION_SAGA[action.type], action);
}

export default function* rootSaga() {
	yield all(
		[
            fork(watchFetch),
		]
	);
}
