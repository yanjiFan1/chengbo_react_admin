import { get, post ,Recruit} from '../tools';
// 接口统一管理

export default {
	addRole : (query) => post({url: Recruit+ '/role/addOrEdit',data:query}),// 新增或编辑角色
}
