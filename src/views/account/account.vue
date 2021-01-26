<template>
  <div class="account-content content">
    <div class="info dark">Welcome Hundred Lixuance ({{ userInfo.username }})</div>
    <div class="account">
      <div class="money green bold">₹ {{ toNum(account.balance || 0) }}</div>
      <div class="desc flex">
        <div>
          <div class="key">Freezing</div>
          <div class="val bold green">{{ toNum(account.rewardWithDraw || 0) }}</div>
        </div>
        <div>
          <div class="key center">Rebating</div>
          <div class="val bold green center">{{ toNum(account.memberRewardAmount || 0) }}</div>
        </div>
        <div>
          <div class="key right">Reward</div>
          <div class="val bold green right">{{ toNum(account.reward || 0) }}</div>
        </div>
      </div>
    </div>
    <van-button class="btn" type="success" @click="rechargeShow=true">Recharge</van-button>
    <van-button class="btn withdraw" to="/withdraw">Withdraw Cash</van-button>
  </div>

  <van-cell-group class="cells">
    <van-cell title="Lottery Game" to="lottery" is-link >
      <template #icon>
        <img class="icon" src="../../../src/assets/imgs/lottery.gif" />
      </template>
    </van-cell>

    <van-cell title="Funds details" to="/funds" is-link >
      <template #icon>
        <img class="icon" src="../../../src/assets/imgs/mwallet.png" />
      </template>
    </van-cell>

    <van-cell title="Rebate details" to="/rebate" is-link >
      <template #icon>
        <img class="icon" src="../../../src/assets/imgs/morder.png" />
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group class="cells">
    <van-cell title="Envelope details" to="envelope"  is-link >
      <template #icon>
        <img class="icon" src="../../../src/assets/imgs/mcard.png" />
      </template>
    </van-cell>

    <van-cell title="Invite friends" to="invite"  is-link  >
      <template #icon>
        <img class="icon" src="../../../src/assets/imgs/minvite.png" />
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group class="cells">
   <van-cell title="Reset password" to="forgot" is-link>
      <template #icon>
        <img class="icon" src="../../../src/assets/imgs/mpwd.png" />
      </template>
    </van-cell>
    <van-cell title="Secure logout" @click="logout"  is-link>
      <template #icon>
        <img class="icon" src="../../../src/assets/imgs/mquite.png" />
      </template>
    </van-cell>
  </van-cell-group>

  <van-popup v-model:show="rechargeShow" position="bottom">
    <suspense>
      <recharge></recharge>
    </suspense>
  </van-popup>
</template>

<script lang='ts'>
import { computed, defineComponent, ref } from 'vue'
import Recharge from './components/Recharge.vue'
import { accountInfo } from '@/api/account'
import store from '@/store'
import { Toast } from 'vant'

export default defineComponent({
  name: 'Header',
  components: { Recharge },
  async setup () {
    const account = await accountInfo()

    const userInfo = computed(() => {
      return store.state.userInfo
    })

    const rechargeShow = ref(false)
    const logout = function () {
      store.commit('USER_INFO', {})
      Toast({
        message: 'logout success',
        duration: 1500
      })
      location.reload()
    }
    return {
      rechargeShow,
      account,
      userInfo,
      logout
    }
  }
})

</script>

<style scoped lang="less">
.account-content {
  padding: 15px;

  .account {
    background-color: #f7fffb;
    border: 1px solid #07c15f;
    padding: 15px;
    border-radius: 5px;
    margin: 10px 0;
  }

  .money {
    font-size: 30px;
    line-height: 30px;
    color: #07c15f;
    font-weight: 500;
    padding-bottom: 15px;
  }

  .desc {
    align-items: center;
    justify-content: space-between;
    line-height: 1.5;
    padding-top: 10px;
    border-top: 1px solid #ececec;

    // & > div {
    //   width: 33%;
    // }
  }

  .key {
    color: #999;
  }

  .btn {
    width: 165px;
  }

  .withdraw {
    margin-left: 15px;
    background: #77bccc;
    color: #fff;
  }
}

.cells {
  margin-top: 10px;
}

.icon {
  width: 24px;
  height: 24px;
  display: block;
  margin-right: 10px;
}
</style>
