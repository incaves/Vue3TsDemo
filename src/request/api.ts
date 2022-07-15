import service from '.'
import { LoginFormInt } from '@/type/login'
// 登陆接口
// 进行规范
export function login(data: LoginFormInt) {
  return service({
    url: '/login',
    method: 'POST',
    data,
  })
}
// 商品列表
export function getGoodsList() {
  return service({
    url: '/getGoodsList',
    method: 'GET',
  })
}
// 用户列表
export function getUserList() {
  return service({
    url: '/getUserList',
    method: 'GET',
  })
}
// 角色列表
export function getRoleList() {
  return service({
    url: '/getRoleList',
    method: 'GET',
  })
}
