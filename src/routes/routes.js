// 路由
export const routes = [
	{
		name: "登录模块",
		link: "/login",
		component: 'Login',
	},
	{
		name: "首页",
		link: "/index",
		component: 'Index',
	},
	{
		name: "配置管理",
		link: "/configuration",
		sub: [{
			name: "用户管理",
			link: "/configuration/user",
			component: 'User',
		},{
			name: "角色管理",
			link: "/configuration/role",
			component: 'Role',
		},{
			name: "菜单管理",
			link: "/configuration/menu",
			component: 'Menu',
		}]
	},
	{
		name: "小程序",
		link: "/alipay",
		component: 'Alipay',
	},
	{
		name: "第四页",
		link: "/four",
		component: 'Four',
  	},
]
