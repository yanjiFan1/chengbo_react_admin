

import { fork, select, take, call, put, takeEvery } from 'redux-saga/effects'
import commonSaga from './commonSaga'
import auth from './authSaga'
import user from './userSaga'

export default function* rootSaga() {
    // yield fork(watchAndLog); // 观察者模式
    yield fork(commonSaga) // 公共
    yield fork(auth);   // 权限
    yield fork(user);   // 用户信息
}

