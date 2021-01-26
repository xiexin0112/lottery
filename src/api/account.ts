
import request from '@/utils/request'
import store from '@/store'

export function accountInfo () {
  return request({
    url: '/system/user/findUserAccount',
    method: 'get',
    params: {
      userId: store.state.userInfo.userId
    }
  })
}

export function fetchFunds (data) {
  return request({
    url: '/system/accountInfo/findUserAccountList',
    method: 'post',
    data: {
      request: data,
      userId: store.state.userInfo.userId
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

export function login (data) {
  return request({
    url: '/system/user/login',
    method: 'get',
    data
  })
}

export function featchRecharge (data) {
  return request({
    url: '/system/rechargeInfo/getPayOrderMessage',
    method: 'post',
    data
  })
}

export function recharge (data) {
  return request({
    url: '/system/rechargeInfo/entrypayu',
    method: 'post',
    data
  })
}

export function withdraw (data) {
  return request({
    url: '/system/withdrawInfo/initiateTransaction',
    method: 'post',
    data
  })
}

export function fetchRebate (data) {
  return request({
    url: '/system/rewardInfo/rewardInfoList',
    method: 'post',
    data: {
      request: data,
      userId: store.state.userInfo.userId
    }
  })
}

export function fetchEnvelope (data) {
  return request({
    url: '/system/envelopeInfo/getEnvelopeInfosByUserId',
    method: 'post',
    data: {
      request: data,
      userId: store.state.userInfo.userId
    }
  })
}

export function fetchInvite (data) {
  return request({
    url: '/system/user/findInvitationRecord',
    method: 'post',
    data: {
      request: data,
      userId: store.state.userInfo.userId
    }
  })
}

export function applyRebate () {
  return request({
    url: '/system/standRewardInfo/addStandRewardInfo',
    method: 'post',
    data: {
      userId: store.state.userInfo.userId,
      rewardRate: null,
      status: false
    }
  })
}
