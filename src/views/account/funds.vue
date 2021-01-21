<template>
  <van-list
    v-model:loading="state.loading"
    :finished="state.finished"
    finished-text="no more"
    loading-text="loading"
    @load="onLoad"
  >
    <van-cell-group>
      <van-cell v-for="item in list" :key="item">
          <div class="flex">
            <div>{{ item.detail }}</div>
            <div v-if="item.subtract !='0.000'" class="bold">-{{ toNum(item.subtract || 0) }}</div>
            <div v-else class="bold green">+{{ item.addition || 0 }}</div>
          </div>
          <div class="flex gray small">
            <div>{{ item.createTime }}</div>
            <div>{{ item.balance || 0 }}</div>
          </div>
      </van-cell>
    </van-cell-group>
  </van-list>
</template>

<script lang='ts'>
import { defineComponent, reactive, nextTick } from 'vue'
import { fetchFunds } from '@/api/account'
interface AjaxList {
  rows: [];
}

export default defineComponent({
  async setup () {
    const state = reactive({
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 20
    })
    const list = reactive([])

    const onLoad = async function () {
      state.loading = true
      const data = await fetchFunds({
        pageNum: state.pageNum,
        pageSize: state.pageSize
      })
      const rows: [] = data.rows
      if (rows.length < state.pageSize) {
        state.finished = true
      } else {
        state.pageNum++
      }
      list.push(...rows)
      setTimeout(() => {
        state.loading = false
      }, 10)
    }

    return {
      state,
      list,
      onLoad
    }
  }
})

</script>

<style lang="less" scoped>
  .flex {
    justify-content: space-between;
  }

</style>
