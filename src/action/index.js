/**
 * Created by yanji on 2019/10/17.
 */
import * as type from './type';
import * as http from '../axios/index';

const requestData2 = category => ({
    type: type.REQUEST_DATA,
    category
});

// 动态创建action
const sendRequest = ({funcName, ...rest}) => ({
    type: type[funcName],
	...rest
})

export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});

/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData2(stateName));
    return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};

// 触发action
export const requestData = ({ funcName, ...rest }) => dispatch => {
    dispatch(sendRequest({funcName, ...rest}));
}
