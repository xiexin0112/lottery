<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item ,index) in detail.pictureUrl" :key="index">
      <van-image
        class="banner"
        fit="cover"
        :src="`http://www.winshopping.in/${item}`"
      />
    </van-swipe-item>
  </van-swipe>
  <div class="goods-info content">
    <div class="title">{{ detail.goodsName }}</div>
    <div class="pric"><span class="gray">Price：</span><span class="green large">₹{{ detail.price }}</span></div>
    <div class="gray">Quantity：{{ detail.quantity }}</div>
  </div>

  <div class="goods-content">
    <div class="title">Product Detail</div>
    <img class="img" v-for="(item ,index) in detail.pictureUrl" :key="index" :src="`http://www.winshopping.in/${item}`" alt="">
  </div>

  <van-action-bar>
    <van-action-bar-icon icon="shop-o" text="Home" @click="routerPush('home')" />
    <van-action-bar-icon icon="cart-o" text="Cart" @click="login" />
    <van-action-bar-icon icon="star" text="Like" color="#ff5000" @click="login"/>
    <van-action-bar-button type="warning" text="Add To Cart" @click="login"/>
    <van-action-bar-button type="danger" text="Buy Now" @click="login"/>
  </van-action-bar>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { fetchDetail } from '@/api/goods'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({

  async setup () {
    const $route = useRoute()
    const $router = useRouter()

    const data = await fetchDetail({ Id: $route.query.id })
    const detail = reactive(data)

    const store = useStore()

    return {
      detail
    }
  }

})
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 375px;
  display: block;
}

.goods-info {
  padding: 15px;

  .title {
    font-size: 16px;
  }

  .pric {
    margin-top: 10px;
  }
}

.goods-content {
  padding-bottom: 50px;

  .title {
    padding: 15px 15px;
    font-size: 16px;
    font-weight: bold;
    color: #666;

    &::before {
      content: '';
      width: 4px;
      height: 18px;
      background: #07c15f;
      display: inline-block;
      margin-right: 10px;
      vertical-align: -4px;
    }
  }
}

.submit-action {
  background: rgba(255, 255, 255, 0.6);
  padding: 10px 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.submit {
  border-radius: 30px;
  height: 30px;
}
</style>
