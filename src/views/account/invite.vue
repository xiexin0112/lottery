<template>
  <div class="content invite-content">
    <div class="flex invite">
      <img class="qrcode" :src="imageUrl">
      <div class="">
        <div class="large bold">Invite friends</div>
        <div class="dark desc">All your friends, as well as the friends they invite up to level 9, will bring you considerable rebate !</div>
      </div>
    </div>
    <div class="enlarge link" @click="enlarge">Enlarge QR code to share it with friends</div>
  </div>
  <div class="link-content">
    <div class="title dark">You can also share the following link to friends</div>
    <textarea class="link" v-model="inviteLink"></textarea>
  </div>

  <router-link to="/rebate">
    <van-button class="button" type="success" block>Rebates from friends record</van-button>
  </router-link>

  <van-button class="button" @click="apply" block>Apply rebate</van-button>

</template>
<script lang='ts'>
import { defineComponent, computed, ref } from 'vue'
import { ImagePreview, Toast } from 'vant'
import { useStore } from 'vuex'
import QRCode from 'qrcode'
import { applyRebate } from '@/api/account'

export default defineComponent({
  setup () {
    const store = useStore()
    const userInfo = computed(() => store.state.userInfo)
    const inviteLink = computed(() => (`${location.origin}/?inverstcode=${userInfo.value.qrcode}#/register`))
    const imageUrl = ref('')
    QRCode.toDataURL(inviteLink.value).then(
      (url) => {
        imageUrl.value = url
      }
    )
    const enlarge = () => {
      ImagePreview([imageUrl.value])
    }
    const apply = async () => {
      await applyRebate()
      Toast({
        message: 'Apply success',
        duration: 1500
      })
    }
    return {
      userInfo,
      inviteLink,
      enlarge,
      imageUrl,
      apply
    }
  }

})

</script>

<style lang="less" scoped>

  .invite-content {
    padding: 15px;
    margin-top: 10px;

    .qrcode {
      width: 80px;
      display: block;
      margin-right: 10px;
    }

    .invite {
      align-items: center;

      .desc {
        margin-top: 5px;
      }
    }

    .enlarge {
      border-top: 1px solid #ececec;
      margin-top: 8px;
      padding-top: 10px;
    }
  }

  .link-content {
    .title {
      padding: 10px 15px;
    }

    textarea {
      background: #fff;
      width: 100%;
      border: none;
      padding: 10px 15px;
      word-break: break-all;
      line-height: 1.5;
    }
  }

  .button {
    width: 92%;
    margin: 20px auto;
  }

</style>
