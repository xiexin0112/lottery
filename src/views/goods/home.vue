<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item ,index) in state.bannerList" :key="index">
      <img class="banner" :src="`http://www.winshopping.in/${item.pictureUrl}`">
    </van-swipe-item>
  </van-swipe>

  <van-notice-bar
    left-icon="volume-o"
    color="#07c15f"
    background="#fff"
    text="Welcome to winshopping, I wish you a happy shopping, and there will be gifts for consulting customer service."
  />
  <goods-list class="goods-content" :goodsList="state.goodsList"></goods-list>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { fetchBanner, fetchGoodsList } from '@/api/goods'
import { useRouter } from 'vue-router'
import GoodsList from './components/GoodsList.vue'

export default defineComponent({
  components: { GoodsList },
  async setup () {
    const state = reactive({
      bannerList: [],
      goodsList: [] as any[]
    })

    state.bannerList = await fetchBanner()

    const listArray = await fetchGoodsList()
    const { first, second, third } = listArray[0]

    state.goodsList.push(...first, ...second, ...third)

    return {
      state
    }
  }

})
</script>

<style lang="less" scoped>
  .banner {
    width: 100%;
    height: 180px;
    display: block;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 15px;
  }

  .goods {
    width: 48%;
    background: #fff;
    margin: 5px 0;
    border-radius: 5px;

    .hd {
      width: 100%;
      height: 165px;
      display: block;
    }

    .bd {
      padding: 5px 10px;
      font-size: 12px;
      color: #666;
      line-height: 1.6;
      // text-align: center;
    }

    .fd {
      padding-bottom: 10px;
    }
  }
</style>
