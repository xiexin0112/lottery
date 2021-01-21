<template>
  <Header :betInfo="state.betInfo"></Header>
  <ball :betInfo="state.betInfo"></ball>
  <record class="records" :betList="state.betList"></record>
  <div class="btns">
    <van-button to="/records?tab=0" class="btn link">All Periods</van-button>
    <van-button to="/records?tab=1" class="btn link">My Record</van-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onUnmounted } from 'vue'
import { fetchBetInfo, fetchBetList, fetchMyBetOrderList } from '@/api/lottery'
import Header from './components/Header.vue'
import Ball from './components/Ball.vue'
import Record from './components/Record.vue'
import { Dialog } from 'vant'
import { useStore } from 'vuex'

interface BetInfo {
  id?: number;
  betNo?: string;
  countdown?: number;
  onSale?: number;
}

export default defineComponent({
  components: { Header, Ball, Record },
  async setup  () {
    const store = useStore()
    if (store.state.first) {
      Dialog({
        title: 'Attention',
        message: `You can get cash rewards through referral, registration and recharge during the activity time at 16:00 every day:\n
Recommend 1 friend to recharge: you will get ₹150.00\n
Recommend 3 friends to recharge: you can get ₹500.00\n
Recommend 5 friends to recharge: get ₹900.00\n
Recommend 10 friends to recharge: get ₹2000.00`,
        theme: 'round',
        confirmButtonColor: '#07c15f',
        confirmButtonText: 'OK'
      })
      store.commit('FIRST', true)
    }

    let timer = 0
    const state = reactive({ betInfo: { countdown: 0, onSale: 0, id: 0, betNo: 0 }, betList: [] })
    async function init () {
      state.betInfo = await fetchBetInfo()
      timer = setInterval(() => {
        state.betInfo.countdown--
        if (state.betInfo.countdown <= 0) {
          clearInterval(timer)
          init()
        }
        if (state.betInfo.countdown <= 30) {
          state.betInfo.onSale = 2
        }
      }, 1000)
      let { rows } = await fetchMyBetOrderList({
        request: {
          pageNum: -1, pageSize: 10
        }
      })
      if (!rows || !rows.length) {
        const betList = await fetchBetList({
          request: {
            pageNum: 1, pageSize: 10
          }
        })
        rows = betList.rows
      }
      state.betList = rows
    }
    init()

    onUnmounted(() => {
      timer && clearInterval(timer)
    })

    return {
      state
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
    }
  }

  .records {
    margin-top: 10px;
  }

  .btns {
    display: flex;
    margin: 10px 0 20px;
    padding: 0 8px;

    .btn {
      flex: 1;
      height: 30px;
      margin: 0 7px;
    }
  }
</style>
