<template>
<van-tabs :active="tab" sticky offset-top=".92rem">
  <van-tab v-for="(item, index) in recordList" :title="item.title" :key="index" :name="index+''">
    <van-list
      v-model:loading="item.loading"
      :finished="item.finished"
      finished-text="no more"
      loading-text="loading"
      @load="onLoad(index)"
    >
      <record :betList="item.list"></record>
    </van-list>
  </van-tab>
</van-tabs>

</template>

<script>
import { defineComponent, reactive, nextTick } from 'vue'
import Record from './components/Record'
import { records } from './const'
import { useRoute } from 'vue-router'
// import { fetchBetList } from '@/api/lottery'
import { fetchOrderList, fetchMyBetOrderList, fetchWinBetOrderList } from '@/api/lottery'

export default defineComponent({
  components: { Record },
  async setup () {
    const $route = useRoute()
    const tab = $route.query.tab || 0
    const recordList = reactive(records)

    const onLoad = async (name) => {
      let list = []
      recordList[name].loading = true
      if (name === 0) {
        list = await fetchOrderList(recordList[name].params)
      } else if (name === 1) {
        list = await fetchMyBetOrderList(recordList[name].params)
      } else if (name === 2) {
        list = await fetchWinBetOrderList(recordList[name].params)
      }
      list = list.rows
      if (list.length < recordList[name].params.pageSize) {
        recordList[name].finished = true
      } else {
        recordList[name].params.pageNum++
      }
      recordList[name].list.push(...list)
      nextTick(() => {
        recordList[name].loading = false/* 加载状态结束，可以触发loading加载 */
      })
    }

    return {
      tab,
      recordList,
      onLoad
    }
  }
})
</script>
