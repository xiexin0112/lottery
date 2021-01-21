<template>
  <van-search v-model="value" placeholder="Search for goods" />
  <goods-list class="goods-content" :goodsList="list"></goods-list>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import GoodsList from './components/GoodsList.vue'
import { fetchGoods } from '@/api/goods'

export default defineComponent({
  components: { GoodsList },
  async setup () {
    const list = reactive([] as any[])
    const { rows } = await fetchGoods('')
    list.push(...rows)

    return {
      list
    }
  }

})
</script>

<style lang="less" scoped>
.sidebar {
  padding-top: 15px;
}

.goods-content {
  flex: 1;
}
</style>
