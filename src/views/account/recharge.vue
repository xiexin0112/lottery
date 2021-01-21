<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { featchRecharge } from '@/api/account'
import { useStore } from 'vuex'

export default defineComponent({
  async setup () {
    const store = useStore()
    const userId = store.state.userInfo.userId
    await featchRecharge({ userId })
  }
})
</script>
