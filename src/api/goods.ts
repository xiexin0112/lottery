
import request from '@/utils/request'
import store from '@/store'

export function fetchBanner () {
  return request({
    url: '/system/bannerInfo/findAllBannerInfo',
    method: 'post'
  })
}

// 首页
export function fetchGoodsList () {
  return request({
    url: '/system/goodsInfo/findIndexGoods',
    method: 'post'
  })
}

export function fetchDetail (params) {
  return request({
    url: '/system/goodsInfo/findGoodsById',
    method: 'get',
    params
  })
}

export function fetchGoods (goodsType) {
  return request({
    url: '/system/goodsInfo/findGoodsByTye',
    method: 'post',
    data: {
      goodsType,
      request: {
        pageSize: 20,
        pageNum: 1
      }
    }
  })
}
