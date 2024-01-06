/**
 * 公共基础请求模块
 */

import request from '../util/request'

// 登录方法
export const doLogin = (user: any) => {
  const data = {
    "uName": user.username,
    "uPassword": user.password,
  }
  return request({
    method: 'post',
    headers: {
      token: false
    },
    url: '/users/login',
    data: data
  })
}

// 注册方法
export const doRegister = (data: any) => {
  return request({
    method: 'post',
    headers: {
      token: false
    },
    url: '/users/register',
    data: data
  })
}
