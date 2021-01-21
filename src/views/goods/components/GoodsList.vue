<template>
  <div class="goods-list" :class="{ small: size==='small' }" >
    <div class="goods"  v-for="(item, index) in list" :key="index" @click="routerPush('detail', { id: item.id })">
      <img class="hd" :src="`http://www.winshopping.in/${item.pictureUrl1}`" alt="">
      <div class="bd text-line-2 center">{{ item.goodsName }}</div>
      <div class="fd green center">₹{{ item.price }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

interface Props {
  goodsList: {};
}

export default defineComponent({
  props: {
    goodsList: {
      type: Object,
      default () {
        return {}
      }
    },
    size: {
      type: String,
      default: 'normal'
    }
  },

  async setup (props: Props) {
    const list = toRefs((props)).goodsList
    return {
      list
    }
  }

})
</script>

<style lang="less" scoped>
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

.small {
  .hd {
    height: 128px;
  }
}
</style>
