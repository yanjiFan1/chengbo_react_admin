/**
 * 路由组件出口文件
 */
import Loadable from 'react-loadable';
import MyLoadingComponent from '@/components/common/Loading';

const load = (name,loader) => Loadable({
    name: name,
    loader: loader,
    loading: MyLoadingComponent,
})

const Index = load('首页',() => import('@/view/index/Index'))
const Login = load('登录',() => import('@/view/login/Login'))
const User = load('用户管理',() => import('@/view/auth/user/User'))
const Role = load('角色管理',() => import('@/view/auth/role/Role'))
const Menu = load('菜单管理',() => import('@/view/auth/menu/Menu'))
const Alipay = load('小程序',() => import('@/view/alipay/Alipay'))
const Four = load('four',() => import('@/view/four/Four'))

export default {
    Index,
    Login,
    User,
    Role,
    Menu,
    Alipay,
    Four
}
