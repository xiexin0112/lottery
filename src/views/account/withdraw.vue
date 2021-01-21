<template>
  <form class="recharge-content" >

    <van-field v-model="beneficiaryAccount" label="Bank card" placeholder="input your bank card" />

    <van-radio-group v-model="type" class="cells">
      <van-cell-group>
        <van-cell clickable @click="type = '0'">
          <template #title>
            Balance &nbsp; <b class="green">{{ toNum(account.balance || 0) }}</b>
          </template>
          <template #right-icon>
            <van-radio name="0" />
          </template>
        </van-cell>
        <van-cell clickable @click="type = '1'">
          <template #title>
            Rebating &nbsp; <b class="green">{{ toNum(account.memberRewardAmount || 0) }}</b>
          </template>
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell clickable @click="type = '2'">
          <template #title>
            Reward &nbsp; <b class="green">{{ toNum(account.reward || 0) }}</b>
          </template>
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div class="recharge">
      <div class="title small">Withdrawal amount must greater than 100</div>
      <div class="input-cell">
        <div>₹</div>
        <input placeholder="Enter amount" v-model="amount" type="number" >
      </div>
      <div class="desc small gray">
        <!-- <div>Account balance <b class="green"> {{ account.balance }}</b></div> -->
        <div>Contact customer service for more incentive programs</div>
      </div>
    </div>
    <van-button block type="success" :loading="loading" class="submit" :disabled="disabled" @click="submit">Next</van-button>

    <ul class="tips small gray">
      <li>1. Amount must be an integral multiple of 100</li>
      <li>2. For the unused amount after recharging, an additional 5% gateway fee is required, otherwise only 2% fee required</li>
      <li>3. The red envelopes obtained in all scenarios cannot be withdrawn directly when they are not used</li>
    </ul>
  </form>

</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { withdraw, accountInfo } from '@/api/account'
import { useStore } from 'vuex'
import { Toast } from 'vant'

export default defineComponent({
  async setup () {
    const store = useStore()
    const userId = store.state.userInfo.userId
    const amount = ref()
    const beneficiaryAccount = ref()
    const type = ref('0')

    const disabled = computed(() => {
      return amount.value < 10 || !amount.value
    })

    const loading = ref(false)

    const submit = async function () {
      if (!beneficiaryAccount.value) {
        return Toast({
          message: 'input your bank card'
        })
      }
      await withdraw({
        userId,
        type: type.value,
        beneficiaryAccount: beneficiaryAccount.value,
        amount: amount.value
      })
      Toast({
        message: 'apply success',
        duration: 2500
      })
    }
    const account = await accountInfo()

    return {
      type,
      disabled,
      loading,
      amount,
      beneficiaryAccount,
      submit,
      account
    }
  }
})
</script>

<style lang="less" scoped>
  .recharge-content {
    padding: 15px;
    background: #f6f6f6;
  }

  .recharge {
    margin-top: 10px;
    background: #fff;
    padding: 10px 15px;
    border-radius: 10px;

    .input-cell {
      display: flex;
      align-items: center;
      padding: 10px 0;
      font-size: 40px;
    }

    input {
      border: none;
      padding-left: 15px;
    }

    .desc {
      line-height: 2;
      border-top: 1px solid #eceeec;
      padding-top: 15px;
    }
  }

  .submit {
    margin-top: 20px;
  }

  .tips {
    margin-top: 40px;
    line-height: 1.6;

    li {
      margin-top: 8px;
    }
  }

  .cells {
    margin-top: 10px;
  }

</style>
