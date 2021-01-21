<template>
  <div class="login-content content">
    <div class="title bold">Sign In</div>
    <div class="desc dark">Already a member</div>

    <van-cell-group class="form">
      <van-field
        v-model="formData.username"
        label="Mobile +91"
        placeholder="input mobile number"
      >
        <template #right-icon>
          🇮🇳
        </template>
      </van-field>
      <van-field
        v-model="formData.password"
        center
        clearable
        label="Password"
        type="password"
        placeholder="input password"
      >
        <template #button>
          <router-link to="/forgot"  class="green">Forgot?</router-link>
        </template>
      </van-field>
    </van-cell-group>

    <van-button block type="success" class="submit" @click="submit">Continue</van-button>

    <!-- <router-link to="/register" class="register link"> New to a member ? Click to Create account</router-link> -->

    <div class="tips">
      <img src="../../../src/assets/imgs/thirdpartbg.png" alt="">

            By continuing means you agree to <br>
            Conditions of Use and Privacy Notice

    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { login, loginSuccess } from '@/api/user'
import { Validater } from '@/utils/tool'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'

const validate = new Validater([
  {
    key: 'username',
    tip: 'input mobile number'
  },
  {
    key: 'password',
    tip: 'please input password'
  }
])

export default defineComponent({
  setup () {
    const $router = useRouter()
    const $store = useStore()
    const formData = reactive({
      username: '',
      password: ''
    })
    async function submit () {
      await validate.test(formData)
      const userInfo = await login({
        ...formData
      })
      $store.commit('USER_INFO', userInfo)
      loginSuccess({})
      setTimeout(() => {
        Toast({
          message: 'login success',
          duration: 1500
        })
      }, 0)
      $router.push({ name: 'account' })
    }
    return {
      formData,
      submit
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

  .tips {
    img {
      opacity: 0.6;
      display: block;
      width: 50%;
      margin: 40px auto 10px;
    }

    line-height: 1.6;
    text-align: center;
    font-size: 10px;
    color: #ccc;
  }
</style>
