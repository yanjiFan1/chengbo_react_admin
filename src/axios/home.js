// 首页

import { get, post ,Recruit} from './tools';
// 接口统一管理

export default {
	getHomeList : (query) => get({ url: Recruit+ '/index/getHomeList',data:query }),// 获取首页列表
	getUser : (query) => post({ url: Recruit+ '/user/getUserInfo',data:query }),// 获取首页列表
}
