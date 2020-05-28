/**
 * http通用工具函数
 */

import axios from 'axios';
import { message } from 'antd';

axios.defaults.timeout = 10000;
//添加请求拦截器
axios.interceptors.request.use(config => {
	//在发送请求之前做某事，比如说 设置loading动画显示
	config.headers.returnUrl = window.location.href;
	return config
}, error => {
	//请求错误时做些事
	return Promise.reject(error)
})

//添加响应拦截器
axios.interceptors.response.use(response => {
	const data = response.data;
	if (data && data.code == 406) {
		window.location.replace('#/login');
	}
	if(data.code==402&&response.config.isLoop){
        return response
    }
	switch (data.code) { // 根据返回的code值来做不同的处理
		case 200:
			response.config.method != 'get' &&
				response.config.pop != false &&
				message.success(data.msg || '操作成功');
			return response
		case 400:
			return response
		default:
	}
	let err = {};
	err.data = data
	err.response = response
	throw err
}, (err) => {
	return Promise.reject(err)
})

export const Recruit = '/api'; // 统一网关设置

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({
		url,
		data,
		msg = '接口异常',
		headers
	}) =>
	axios.get(url, {
		params: data
	}, headers).then(res => res.data).catch(err => {
		errProcess(err, msg)
		return Promise.reject(err)
	});

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({
		url,
		data,
		msg = '接口异常',
		headers
	}) =>
	axios.post(url, data, headers).then(res => res.data).catch(err => {
		errProcess(err, msg)
		return Promise.reject(err)
	});


const errProcess = (err, msg) => {
	// 处理2种情况
	// status 直接出错的情况
	let code = 200
	if (err && err.response && err.response.status) {
		code = err.response.status;
	}
	if (err.data && err.data.code) {
		code = err.data.code;
		err.msg = err.data.msg
    }
	switch (code) {
		case 401:
			err.message = err.msg || `参数格式出错(401)`;
			break
		case 402:
			err.message = err.msg || `请求异常，给予提示即可(402)`;
			break
		case 403:
			err.message = err.msg || '拒绝访问(403)';
			break
		case 404:
			err.message = err.msg || `请求地址出错(404)`;
			break
		case 406:
			err.message = err.msg || '请重新登录(406)';
			break
		case 408:
			err.message = err.msg || '请求超时(408)';
			break
		case 410:
			err.message = err.msg || '参数错误(410)'
			break
		case 500:
            err.message = err.msg || '系统错误，请您稍后再试，若刷新后仍报错，请联系管理员~';
			break
		case 501:
			err.message = err.msg || '服务未实现(501)';
			break
		case 502:
			err.message = err.msg || '网关错误(502)';
			break
		case 503:
			err.message = err.msg || '服务不可用(503)'
			break
		case 504:
			err.message = err.msg || '网关超时(504)';
			break
		case 505:
			err.message = err.msg || 'HTTP版本不受支持(505)';
			break
		default:
	}
	message.error(err.message || msg);
}
