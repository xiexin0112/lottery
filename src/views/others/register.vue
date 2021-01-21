<template>
  <div class="login-content content">
    <div class="title bold">Create account</div>
    <div class="desc dark">New to register</div>

    <van-cell-group class="form">

      <!-- <van-field
        v-model="formData.username"
        label="User name"
        placeholder="input user name"
      /> -->

      <van-field
        v-model="formData.mobile"
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

      <van-field
        v-model="formData.inverstcode"
        label="Invite Code"
        placeholder="input invitetation code"
        readonly
      />
    </van-cell-group>

    <van-button block type="success" class="submit" @click="submit">Continue</van-button>

    <router-link to="/login" class="register link">Already a customer ? Click to Login</router-link>

  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref } from 'vue'
import { register, sendSMS } from '@/api/user'
import { Validater, getQuery } from '@/utils/tool'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'

const validate = new Validater([
  {
    key: 'mobile',
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
    const countNum = ref(0)
    const formData = reactive({
      mobile: '',
      password: '',
      verificationCode: '',
      inverstcode: getQuery('inverstcode')
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
        mobile: formData.mobile
      })
      countNum.value = 60
      countWork()
      await sendSMS({ numbers: formData.mobile })
    }
    const $router = useRouter()
    const submit = async () => {
      await validate.test({
        mobile: formData.mobile,
        verificationCode: formData.verificationCode,
        password: formData.password
      })
      await register({ ...formData, username: formData.mobile })
      Toast({
        message: 'register success',
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
