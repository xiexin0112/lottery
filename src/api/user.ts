import request from '@/utils/request'

export function register (data) {
  return request({
    url: '/system/user/addUser',
    method: 'post',
    data: {
      deptId: '1',
      deptIds: '1',
      inverstNum: '0',
      level: '1',
      roleId: '2',
      status: '1',
      ...data
    }
  })
}

export function sendSMS (data) {
  return request({
    url: '/system/smsInfo/sendSMS',
    method: 'post',
    data
  })
}

export function login (params) {
  return request({
    url: '/system/user/login',
    method: 'get',
    params
  })
}

export function loginSuccess (params) {
  return request({
    url: '/system/user/loginSuccess',
    method: 'get',
    params
  })
}

export function updatePassword (data) {
  return request({
    url: '/system/user/updateUserPassword',
    method: 'post',
    data
  })
}
