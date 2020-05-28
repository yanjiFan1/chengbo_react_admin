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
const Alipay = load('小程序',() => import('@/view/alipay/Alipay'))
const Four = load('four',() => import('@/view/four/Four'))

export default {
    Index,
    Login,
    Alipay,
    Four
}
