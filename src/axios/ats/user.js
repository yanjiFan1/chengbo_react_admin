/*
 *用户信息
 *author: yanji
 *date: 2019/11/12
*/ 


import { get, post ,Recruit} from '../tools';
// 接口统一管理

export default {
    getUserInfo : (query) => get({url: Recruit+ '/user/all', data:query}), // 查询所有用户
    postUserDelete : (query) => post({url: Recruit+ '/user/delete',data:query}), // 删除用户
    postUserLogin : (query) => post({url: Recruit+ '/user/all', data:query}), // 用户登录
    postUserRegistered : (query) => post({url: Recruit+ '/user/delete',data:query}), // 用户注册
}
