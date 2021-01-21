<template>
<van-nav-bar
  fixed
  :title="pageTitle"
  left-text="Back"
  left-arrow
  @click-left="onClickLeft"
  v-show="!showTab"
/>
<div class="page-container" :class="{ paddingTop: !showTab, paddingBottom: showTab }">
  <router-view v-slot="{ Component }">
    <suspense>
      <component :is="Component" />
    </suspense>
  </router-view>
</div>

<van-tabbar v-model="active" v-show="showTab" active-color="#07c15f">
  <van-tabbar-item icon="wap-home" @click="routerPush('home')">home</van-tabbar-item>
  <van-tabbar-item icon="service" @click="service" onclick="qimoChatClick()">service</van-tabbar-item>
  <van-tabbar-item icon="manager" @click="routerPush('account')">my</van-tabbar-item>
</van-tabbar>

</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    const active = ref(0)
    const store = useStore()
    const $router = useRouter()
    const $route = useRoute()

    const pageTitle = computed(() => {
      return store.state.pageTitle
    })

    watch($route, () => {
      const tabList = ['home', '', 'account']
      const index = tabList.indexOf($route.name as string)
      active.value = index
    },
    {
      immediate: true
    })

    const showTab = computed(() => {
      return $route.meta.showTab
    })

    const onClickLeft = function () {
      $router.back()
    }

    const service = function () {
      const tabList = ['home', '', 'account']
      const index = tabList.indexOf($route.name as string)
      active.value = index
    }

    return {
      active,
      pageTitle,
      onClickLeft,
      showTab,
      service
    }
  }

})

</script>

<style lang="less">
  .paddingBottom {
    padding-bottom: 50px;
  }

  .paddingTop {
    padding-top: 46px;
  }

  .van-nav-bar .van-icon,
  .van-nav-bar__text {
    color: #07c15f;
    font-weight: bold;
  }

  .van-button__content {
    border: none;
  }

  .van-stepper__input {
    width: 0.68rem;
  }
</style>
