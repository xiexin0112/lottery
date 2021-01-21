import { createStore } from 'vuex'

declare const window: Window & { qimoClientId: any }

const storagePlugin = store => {
  const userInfo = JSON.parse(localStorage.getItem('l-userInfo') || '{}')
  const first = sessionStorage.getItem('l-first') || ''
  if (userInfo.userId) {
    store.state.userInfo = userInfo
    window.qimoClientId = {
      userId: userInfo.mobile,
      customField: {
        userId: userInfo.userId,
        mobile: userInfo.mobile
      }
    }
  }

  if (first) {
    store.state.first = false
  }

  store.subscribe((mutation) => {
    if (mutation.type === 'USER_INFO') {
      localStorage.setItem('l-userInfo', JSON.stringify(mutation.payload))
    }
    if (mutation.type === 'FIRST') {
      sessionStorage.setItem('l-first', '111')
    }
  })
}

export default createStore({
  state: {
    pageTitle: 'lottery',
    ajaxFlag: 0,
    first: true,
    userInfo: {
      inverstcode: '',
      qrcode: '',
      userId: '',
      username: ''
    }
  },
  mutations: {
    FIRST (state, payload) {
      state.first = payload
    },
    USER_INFO (state, payload) {
      state.userInfo = payload
      window.qimoClientId = {
        userId: payload.mobile,
        customField: {
          userId: payload.userId,
          mobile: payload.mobile
        }
      }
    },
    AJAX_FLAG (state, ajaxFlag) {
      state.ajaxFlag = ajaxFlag
    },
    PAGE_TITLE (state, pageTitle) {
      state.pageTitle = pageTitle
    }
  },
  actions: {
  },
  plugins: [storagePlugin]

})
