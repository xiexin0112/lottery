<template>
  <form ref="forms" class="recharge-content" method="post" action="http://cc.winshopping.in:8302/system/rechargeInfo/entrypayu">
    <div class="recharge">
      <div class="title small">Recharge amount</div>
      <div class="input-cell">
        <div>₹</div>
        <input placeholder="Enter amount" name="orderAmount" v-model="orderAmount" type="number">
        <input type="hidden" name="appId" v-model="params.appId">
        <input type="hidden" name="orderId" v-model="params.orderId">
        <input type="hidden" name="orderCurrency" value="INR">
        <input type="hidden" name="notifyUrl" value="http://cc.amazing6.in:8302/system/rechargeInfo/rechargeNotice">
      </div>
      <div class="desc small gray">
        <div>The minimum recharge amount is ₹ 100</div>
        <div>Contact customer service for more incentive programs</div>
      </div>
    </div>
    <div class="fields">
      <van-field required v-model="fields.customerName" name="customerName" label="Name" placeholder="Enter your name" />
      <van-field required v-model="fields.customerEmail" name="customerEmail" label="Email" placeholder="Enter your email address" />
      <van-field required v-model="fields.customerPhone" name="customerPhone" label="Phone " placeholder="Enter your phone number" />
      <van-field v-model="fields.orderNote" name="orderNote" label="Note " placeholder="Enter your order note" />
    </div>
    <van-button block type="success" :loading="loading" class="submit" :disabled="disabled" native-type="submit" @click="submit($event)">Next</van-button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { featchRecharge } from '@/api/account'
import { useStore } from 'vuex'
import { Validater } from '@/utils/tool'

const validate = new Validater([
  {
    key: 'customerName',
    tip: 'Enter your name'
  },
  {
    key: 'customerEmail',
    tip: 'Enter your email address'
  },
  {
    key: 'customerPhone',
    tip: 'Enter your phone number'
  }
])

export default defineComponent({
  async setup () {
    const store = useStore()
    const userId = store.state.userInfo.userId
    const fields = reactive({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      orderNote: ''
    })
    let params = await featchRecharge({ userId })
    params = reactive(params)
    const orderAmount = ref()

    const disabled = computed(() => {
      return orderAmount.value < 100 || !orderAmount.value
    })

    const loading = ref(false)
    const forms = ref()

    const submit = async function (e) {
      e.preventDefault()
      console.log(111)

      await validate.test({
        customerName: fields.customerName,
        customerEmail: fields.customerEmail,
        customerPhone: fields.customerPhone
      })
      forms.value.submit()
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 3000)
    }
    return {
      forms,
      disabled,
      loading,
      orderAmount,
      params,
      fields,
      submit
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
    background: #fff;
    padding: 10px 15px;
    border-radius: 10px;
    margin-top: 10px;

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

  .fields {
    margin-top: 10px;

    /deep/.van-field__label {
      width: 5em;
    }
  }

</style>
