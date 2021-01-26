<template>
  <div class="balls content">
    <div class="join_btn"
      :class="{ big: item.big, [item.color]: item.color, [item.dot]: item.dot, selected: item.selected}"
      v-for="(item, index) in ballList"
      :key="index"
      @click="selectBallHandle(index)"
    >
      {{ item.text || item.val }}</div>
  </div>
  <div class="plan-content content">
    <table class="plan-table">
      <tr class="key">
        <td>Selected</td>
        <td>Unit</td>
        <td>Copies</td>
        <td>Price</td>
      </tr>
      <tr class="val">
        <td>{{ selectText }}</td>
        <td>100</td>
        <td><van-stepper @change="stepperChangeHandle" v-model="times" theme="round" button-size="24" disable-input /></td>
        <td>{{ sumAmount }}</td>
      </tr>
    </table>
    <div class="random-content content">
      <div class="btn random-btn" @click="randomHandle">Random Lucky</div>
      <div
        :class="{ active: item.selected }"
        class="btn num-btn"
        v-for="(item, index) in randomList"
        @click="selectTimesHandle(index)"
        :key="index">x{{ item.val }}</div>
    </div>
  </div>
  <div class="buy-content content" >
    <van-button type="success" class="btn" :disabled="bet.onSale!==1" @click="createOrderHandle">
      <div class="large">Betting Now</div>
      <div class=" balance">balance {{ toNum(state.balance || 0) }}</div>
    </van-button>
    <div class="rule green" @click="ruleShow=true">Game Description</div>
  </div>

  <van-popup v-model:show="ruleShow" position="bottom">
    <rule></rule>
  </van-popup>
</template>

<script lang='ts'>
import { defineComponent, reactive, computed, ref, toRefs } from 'vue'
import { balls, randoms } from '../const'
import Rule from './Rule.vue'
import { createOrder } from '@/api/lottery'
import { accountInfo } from '@/api/account'
import { Toast, Dialog } from 'vant'

interface BetInfo {
  id: number;
  betNo: string;
}

interface Props {
  betInfo: {};
}

export default defineComponent({
  name: 'Header',
  props: {
    betInfo: {
      type: Object,
      default () {
        return {
          id: '',
          betNo: ''
        }
      }
    }
  },
  components: { Rule },
  setup (props: Props) {
    const state = reactive({ balance: 0 })
    async function getBalance () {
      const { balance } = await accountInfo()
      state.balance = balance
    }

    getBalance()

    const bet = toRefs(props).betInfo
    const ruleShow = ref(false)
    const ballList = reactive(balls)
    const times = ref(1)
    const randomList = reactive(randoms)
    const selectBallHandle = (index: number) => {
      ballList[index].selected = !ballList[index].selected
    }

    const selectTimesHandle = (index: number) => {
      times.value = randomList[index].val
      randomList.forEach((item, i) => {
        setTimeout(() => {
          item.selected = i === index
        }, 0)
      })
    }
    const stepperChangeHandle = () => {
      randomList.forEach((item) => {
        item.selected = false
      })
    }

    const randomHandle = () => {
      let count = 0
      const timer = setInterval(() => {
        // [0, 2]
        const randomColor = Math.round(Math.random() * 3)
        // [3, 12]
        const randomNum = Math.round(Math.random() * 9 + 3)
        ballList.forEach((item, index) => {
          item.selected = false
          if (index === randomColor || index === randomNum) {
            item.selected = true
          }
        })
        count === 13 && clearInterval(timer)
        count++
      }, 100)
    }

    const selectList = computed(() => {
      const list: string[] = []
      ballList.forEach(item => {
        item.selected && list.push(item.val)
      })
      return list
    })

    const selectText = computed(() => {
      return selectList.value.join(',')
    })

    const amount = computed(() => {
      return Number((selectList.value.length * 100 * times.value).toFixed(1))
    })

    const fee = computed(() => {
      return Number((amount.value * 0.02).toFixed(1))
    })

    const sumAmount = computed(() => { // 扣除手续费费用
      return Number((amount.value - Number(fee.value)).toFixed(1))
    })

    async function createOrderHandle () {
      if (!selectList.value.length) {
        return Toast({
          message: 'please select numbers',
          duration: 1500
        })
      }
      await createOrder({
        betId: (bet.value as any).betId,
        period: (bet.value as any).period,
        sumOrderPrice: amount.value,
        sumFee: fee.value,
        sumDelivery: sumAmount.value,
        copies: times.value,
        selected: selectList.value.join(',')
      })

      Dialog({
        title: 'Attention',
        message: 'Join Success',
        theme: 'round',
        confirmButtonColor: '#07c15f',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload()
      })
    }

    return {
      state,
      bet,
      ruleShow,
      times,
      ballList,
      randomList,
      selectList,
      selectText,
      sumAmount,
      selectBallHandle,
      stepperChangeHandle,
      selectTimesHandle,
      randomHandle,
      createOrderHandle
    }
  }
})

</script>

<style scoped lang="less">
.balls {
  padding: 10px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
}

.join_btn {
  border-radius: 4px;
  margin: 5px;
  border: 1px solid #e9e9e9;
  font-weight: bolder;
  line-height: 30px;
  width: 56px;
  text-align: center;

  &.big {
    width: 102px;
  }

  &.selected {
    color: #fff;
  }

  &.selected.green {
    background: #07c15f;
  }

  &.selected.red {
    background: #f60;
  }

  &.selected.violet {
    background: #f25cfb;
  }

  &.dot-red,
  &.dot-green {
    padding-right: 15px;
    position: relative;
  }

  &.dot-red::after {
    position: absolute;
    right: 8px;
    top: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    content: '';
    background: #f60;
    border: 1px solid #fff;
  }

  &.dot-green::after {
    position: absolute;
    right: 8px;
    top: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    content: '';
    background: #07c15f;
    border: 1px solid #fff;
  }
}

.plan-content {
  margin-top: 10px;
}

.plan-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  line-height: 32px;
  text-align: center;
  border-color: #999;

  td {
    text-align: center;
    padding: 5px 5px;
    border-left: 0;
    border: 1px solid #f1f1f1;
  }

  .key {
    font-size: 12px;
    color: #999;
  }

  .val {
    font-weight: bold;
  }
}

.random-content {
  display: flex;
  padding: 15px;

  .btn {
    font-size: 12px;
    background-color: #fff;
    text-decoration: none;
    padding: 5px 5px;
    border-radius: 5px;
    border: 1px solid #e9e9e9;
    margin-right: 6px;
    color: #61c160;

    &:nth-last-child(1) {
      margin-right: 0;
    }

    &.active {
      background-color: #f1fff7;
    }
  }

  .random-btn {
    text-decoration: none;
    text-align: center;
    background-image: -webkit-linear-gradient(left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%, #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    -webkit-animation: slide 1s infinite linear;
    animation: slide 1s infinite linear;
    font-size: 12px;
  }

  @keyframes slide {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: -100% 0;
    }
  }
}

.buy-content {
  padding: 0 15px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    width: 220px;
    height: 50px;
    border-radius: 5px;
  }

  .rule {
    text-decoration: underline;
  }

  .balance {
    color: greenyellow;
  }
}

</style>
