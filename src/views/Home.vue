<template>
  <div class="home">
    <div v-if="loginState === LoginStatus.login">
      <h1 class="common-header">Logged In</h1>
    </div>
    <LoginBtn v-else />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue'
import { getBalance } from '@/api/api'
import { IAccountResp } from '@/api/type'
import { useStore } from 'vuex'
import { formatNumber } from '@/utils/formatUtil'
import LoginBtn from '@/components/LoginBtn.vue'
import { LoginStatus } from '@/utils/fastLoginUtil'

export default defineComponent({
  components: { LoginBtn },
  setup() {
    const store = useStore()
    const UsernameState = store.getters.usernameState
    const loginState = computed(() => store.getters.getloginStatus)
    const getAccountInfo = async () => {
      return await getBalance({ username: UsernameState })
    }
    const accountInfo = reactive({
      balance: 0,
      email: 'wyntest001',
      name: '威'
    } as IAccountResp)
    onMounted(async () => {
      // const res = await getAccountInfo()
      // console.log(res)
      // accountInfo.balance = res.balance
      // accountInfo.email = res.email
      // accountInfo.name = res.name
    })


    return { accountInfo, formatNumber, loginState, LoginStatus }

  }
})
</script>

<style lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-size: cover;
}
</style>