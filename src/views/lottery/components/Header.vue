<template>
  <div class="header flex content">
    <div>
      <div class="key small">Period</div>
      <div class="val green">{{ bet.period }}</div>
    </div>
    <div class="text-r">
      <div class="key small">{{ formatDate(bet.stopBetTime - 9000, 'YYYY-MM-DD hh:mm') }}</div>
      <div class="val green" v-show="bet.onSale===1">
        Betting <van-count-down class="countdown green" :time="(bet.countdown-30)*1000" format="mm:ss" :auto-start="false"/>
      </div>
      <div class="val" v-show="bet.onSale!==1">
        Opening<van-count-down class="countdown" :time="bet.countdown*1000" format="mm:ss" :auto-start="false"/>
      </div>
      <!-- <div class="val">Open{{  }}</div> -->
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, toRefs } from 'vue'
// import {}

interface Props {
  betInfo: {};
}

export default defineComponent({
  props: {
    betInfo: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
  name: 'Header',
  setup (props: Props) {
    const bet = toRefs(props).betInfo
    const getTime = (val) => {
      const date = new Date(val * 1000)
      return new Date(date + ' GMT+11:30')
    }
    return {
      bet,
      getTime
    }
  }
})

</script>

<style scoped lang="less">
  .header {
    justify-content: space-between;
    padding: 15px;

    .key {
      margin-bottom: 10px;
      color: #999;
    }

    .val {
      font-size: 16px;
      font-weight: bold;
      display: flex;
    }

    .countdown {
      margin-left: 5px;
      font-size: 16px;
    }
  }
</style>
