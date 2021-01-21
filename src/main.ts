import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/flexible.js'
import '@/styles/index.less'
import { formatDate, toNiceNum } from '@/utils/tool.js'
import { Button, Stepper, Popup, Tab, Tabs, List, CellGroup, Cell, Field, CountDown, RadioGroup, Radio, NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Image as VanImage, Sidebar, SidebarItem, Search, ActionBar, ActionBarIcon, ActionBarButton, NoticeBar } from 'vant'

createApp(App)
  .mixin({
    methods: {
      formatDate: formatDate,
      toNum: toNiceNum,
      routerPush (name, query = {}) {
        this.$router.push({ name, query })
      },
      login () {
        if (!store.state.userInfo.userId) {
          this.$router.push({ name: 'login' })
        }
      }
    }
  })
  .use(store)
  .use(router)
  .use(Button).use(Stepper).use(Popup).use(Tab).use(Tabs).use(List)
  .use(CellGroup).use(Cell).use(Field).use(CountDown).use(RadioGroup).use(Radio).use(NavBar).use(Tabbar).use(TabbarItem)
  .use(Swipe).use(SwipeItem).use(VanImage).use(Sidebar).use(SidebarItem).use(Search).use(ActionBar).use(ActionBarButton).use(ActionBarIcon)
  .use(NoticeBar)
  .mount('#app')
