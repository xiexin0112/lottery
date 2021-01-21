import request from '@/utils/request'
import store from '@/store'

// 查询当前bet
export function fetchBetInfo () {
  return request({
    url: '/system/betInfo/findNewBet',
    method: 'post',
    data: {
      type: 1
    }
  })
}

// 查询bet列表
export function fetchBetList (data) {
  return request({
    url: '/system/betInfo/findBetInfoByPage',
    method: 'post',
    data
  })
}

export function createOrder (data: {}) {
  return request({
    url: '/system/sumOrderInfo/createOrderInfo',
    method: 'post',
    data: {
      userId: store.state.userInfo.userId,
      ...data
    }
  })
}

export function fetchOrderList (data: {}) {
  return request({
    url: '/system/betInfo/findBetInfoByPage',
    method: 'post',
    data: {
      userId: store.state.userInfo.userId,
      request: data
    }
  })
}

export function fetchWinBetOrderList (data: {}) {
  return request({
    url: '/system/betInfo/findMyWinBet',
    method: 'post',
    data: {
      userId: store.state.userInfo.userId,
      request: data
    }
  })
}
export function fetchMyBetOrderList (data: {}) {
  return request({
    url: '/system/betInfo/findMyBet',
    method: 'post',
    data: {
      userId: store.state.userInfo.userId,
      request: data

    }
  })
}
