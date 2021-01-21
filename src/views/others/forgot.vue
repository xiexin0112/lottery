<template>
  <div class="login-content content">
    <div class="title bold">Reset password</div>
    <div class="desc dark">Retrieve password</div>

    <van-cell-group class="form">

      <van-field
        v-model="formData.numbers"
        label="Mobile +91"
        placeholder="mobile number only numbers"
        type='number'
      >
        <template #right-icon>
          🇮🇳
        </template>
      </van-field>

      <van-field
        type="number"
        v-model="formData.verificationCode"
        center
        clearable
        label="Code"
        placeholder="verification code"
      >
        <template #button>
          <van-button class="code-btn" type="success" size="small" @click="sendCode" :disabled="countNum > 0">{{ countNum > 0 ? countNum + 's' : 'send' }}</van-button>
        </template>
      </van-field>

      <van-field
        v-model="formData.password"
        label="Password"
        type="password"
        placeholder="must be at least 6 characters"
      />

    </van-cell-group>

    <van-button block type="success" class="submit" @click="submit">Continue</van-button>

    <router-link to="/login" class="register link">Already a customer ? Click to Login</router-link>

  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { updatePassword, sendSMS } from '@/api/user'
import { Validater } from '@/utils/tool'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import store from '@/store'

const validate = new Validater([
  {
    key: 'numbers',
    tip: 'please input mobile'
  },
  {
    key: 'verificationCode',
    tip: 'please input verification code'
  },
  {
    key: 'password',
    tip: 'please input password'
  }
])

export default defineComponent({
  setup () {
    const $router = useRouter()
    const countNum = ref(0)
    const formData = reactive({
      numbers: '',
      password: '',
      verificationCode: ''
    })

    function countWork () {
      if (countNum.value > 0) {
        setTimeout(() => {
          countNum.value--
          countWork()
        }, 1000)
      }
    }
    const sendCode = async () => {
      await validate.test({
        numbers: formData.numbers
      })
      countNum.value = 60
      countWork()
      await sendSMS({ numbers: formData.numbers })
    }
    const submit = async () => {
      await validate.test({
        numbers: formData.numbers,
        verificationCode: formData.verificationCode,
        password: formData.password
      })
      await updatePassword(formData)

      store.commit('USER_INFO', {})
      Toast({
        message: 'reset success',
        duration: 1500
      })
      $router.replace({ name: 'login' })
    }

    return {
      countNum,
      formData,
      submit,
      sendCode
    }
  }

})

</script>

<style lang="less" scoped>
  .login-content {
    min-height: 100vh;
    text-align: center;
    padding-top: 40px;
  }

  .title {
    font-size: 20px;
  }

  .desc {
    margin-top: 10px;
  }

  .form {
    margin-top: 40px;
  }

  .submit {
    width: 92%;
    margin: 40px auto 20px;
  }

  .code-btn {
    width: 50px;
  }
</style>
