<template>

<van-search v-model="value" type="search" placeholder="Search for goods" @search="routerPush('search')" />

  <div class="flex">
    <van-sidebar v-model="activeKey" @change="onChange" class="sidebar">
      <van-sidebar-item :title="item.title" v-for="(item, index) in searchList" :key="index"></van-sidebar-item>
    </van-sidebar>

    <goods-list size="small" class="goods-content" :goodsList="searchList[activeKey].list"></goods-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { search } from './const'
import GoodsList from './components/GoodsList.vue'
import { fetchGoods } from '@/api/goods'

export default defineComponent({
  components: { GoodsList },
  async setup () {
    const searchList = reactive(search)
    const activeKey = ref(0)
    const value = ref('')

    const load = async (index) => {
      const type = index + 1
      if (searchList[index].loaded) {
        return false
      }
      const { rows } = await fetchGoods(type)
      searchList[index].list.push(...rows)
      searchList[index].loaded = true
    }

    const onChange = (index) => {
      load(index)
    }

    load(0)

    return {
      value,
      activeKey,
      searchList,
      onChange

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
