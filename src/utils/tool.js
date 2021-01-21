// 获取url的参数
/**
 * @功能名称: 工具类
 * @Date: 2020/5/15
 * @Author: cong.wei
 */
import { Toast } from 'vant'

export function getQuery (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return ''
}

export function moneyType () {
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  return language === 'zh' ? '¥' : '$'
}

export function single (goods) {
  if (!goods.sku && !goods.sideDish && !goods.taste) {
    return true
  }
  return false
}

// 链接正则
export const URL_REG = /^https?:\/\//i

/**
 * 分to元，保留两位小数
 */
export function toNum (value) {
  if (!value) {
    return '0.00'
  }

  if (isNaN(Number(value))) {
    return value
  }

  value = parseInt(value * 100)
  let result = value.toString()
  if (result.length < 3) {
    result = new Array(4 - result.length).join('0') + result
  }
  result = result.split('')
  result.splice(-2, 0, '.')
  result = result.join('')
  return result
}

/**
 * 转换分 to 元，保留两位小数，加千位分割符,接受正整型，或纯数字字符串
 * @param Sting|Number
 * @return String
 */
export function toNiceNum (value) {
  if (!value) {
    return '0.00'
  }

  if (isNaN(Number(value))) {
    return value
  }

  value = parseInt(value * 100)

  let perfix = ''

  if (value < 0) {
    value *= -1
    perfix = '-'
  }

  if (!/^\d+$/.test(value)) {
    return value
  }
  let result = value.toString()
  if (result.length < 3) {
    result = new Array(4 - result.length).join('0') + result
  }
  result = result.split('')
  result.splice(-2, 0, '.')
  result = result.join('').replace(/^\d+/, function (s) {
    return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  })
  return perfix + result
}

/**
 * 美化手机号 135 8888 8888
 */

export function phone (value) {
  return `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(-4)}`
}

/**
 * 美化手机号 135****8888
 */

export function maskMobile (value) {
  const t = String(value).trim()
  if (!(/^1\d{10}$/.test(t))) {
    return value
  } else {
    return t.substr(0, 3) + '****' + t.substr(-4)
  }
}

/**
 * 双位数字 小于10补0
 */
export const twodigit = val => {
  return `0${val}`.slice(-2)
}

/**
 * 日期格式化
 */
export const formatDate = (date, format) => {
  let formatStr = format || 'yyyy-MM-dd HH:mm:ss'
  date = date || new Date()
  if (typeof date === 'string') {
    formatStr = date
    date = new Date()
  }
  if (typeof date === 'number') {
    if (date.toString().length === 10) {
      date *= 1000
    }
    date = new Date(date)
  }
  let str = formatStr
  str = str.replace(/yyyy|YYYY/, date.getFullYear())
  str = str.replace(
    /yy|YY/,
    date.getYear() % 100 > 9
      ? (date.getYear() % 100).toString()
      : '0' + date.getYear() % 100
  )
  str = str.replace(/MM/, twodigit(date.getMonth() + 1))
  str = str.replace(/M/g, date.getMonth() + 1)
  str = str.replace(/dd|DD/, twodigit(date.getDate()))
  str = str.replace(/d|D/g, date.getDate())
  str = str.replace(/hh|HH/, twodigit(date.getHours()))
  str = str.replace(/h|H/g, date.getHours())
  str = str.replace(/mm/, twodigit(date.getMinutes()))
  str = str.replace(/m/g, date.getMinutes())
  str = str.replace(/ss|SS/, twodigit(date.getSeconds()))
  str = str.replace(/s|S/g, date.getSeconds())
  return str
}

// uuid生成获取
export class Uuid {
  static get () {
    return Storage.get('uuid')
  }

  static set (val) {
    Storage.set('uuid', val)
  }

  static create () {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
  }
}

// 去除null的字段，只考虑一级
export function rmNull (obj) {
  for (const key in obj) {
    (obj[key] === null || obj[key] === undefined) && delete obj[key]
  }
  return obj
}

/**
 * 校验数据格式
 */
export class Validater {
  constructor (rule) {
    const ruleMap = {}
    rule.forEach(item => {
      ruleMap[item.key] = item
    })
    this.rule = ruleMap
  }

  test (obj) {
    return new Promise((resolve, reject) => {
      for (const key in obj) {
        const verify = this.rule[key].verify || null
        const message = this.rule[key].tip
        const val = obj[key]
        if (!verify && val) {
          continue
        }
        if (!val || !verify(val)) {
          reject(Error({}))
          Toast({
            message,
            duration: 1500
          })
          break
        }
      }
      resolve()
    })
  }
}

// // 节流函数
// export function throttle (fn, time = 30) {
//   let timer = null
//   return function () {
//     const args = arguments
//     if (!timer) {
//       timer = setTimeout(() => {
//         timer = null
//         fn.apply(this, args)
//       }, time)
//     }
//   }
// }
