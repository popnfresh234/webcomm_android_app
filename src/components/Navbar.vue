<template>
  <header class=" sticky top-0 z-50 w-auto justify-between" id="header">

    <div class="navbar" style="padding-top: 44px">
      <div class="flex-none">
        <label for="my-drawer" class="drawer-button w-10 ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="hamburger inline-block w-6 h-6 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div class="nav-logo">
        <span class="text-lg font-bold">
          <img src="@/assets/imgs/short-logo.png" class="w-32" />
        </span>
      </div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost w-10 mr-2" @click="toScanCode">
          <img src="@/assets/imgs/qr-scanner.svg" />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getFastLoginStatus } from '@/utils/fastLoginUtil'
import { appAlert } from '@/utils/appDialog'

export default defineComponent({
  setup() {
    const store = useStore()

    const UsernameState = store.getters.usernameState
    const handleUsername = () => {
      store.dispatch('handleUsernameState', username.value)
    }
    const router = useRouter()
    const username = ref(UsernameState)

    // 設定過快登才能啟用
    const toScanCode = () => {
      if (getFastLoginStatus() !== null) {
        handleUsername()
        router.push({
          name: 'ScanCode'
        })
      } else {
        appAlert('請先註冊快登')
      }
    }
    return { toScanCode }
  }
})
</script>

<style>
.navbar {
  display: flex;
  justify-content: center;
}

.nav-logo {
  flex: 2;
  display: flex;
  justify-content: center;
}
</style>