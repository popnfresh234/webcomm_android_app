<template>
  <div id="main-content" class="main-content drawer h-screen h-200">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col drawer-content">
      <Navbar />
      <router-view class="pb-36" />
    </div>

    <div class="drawer-side" style="padding-top: 44px">
      <label for="my-drawer" class="drawer-overlay"> </label>

      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <li>
          <figure>
            <img class="mx-auto h-auto w-auto" src="@/assets/imgs/demo-logo.png" alt="Workflow" />
          </figure>
        </li>
        <li>
          <label for="my-drawer" class="h-1/12 m-2" @click="$router.push({ name: 'Home' })">首頁</label>
        </li>
        <li>
          <label for="my-drawer" class="h-1/12 m-2" @click="$router.push({ name: 'Login' })">登入/登出</label>
        </li>
        <li>
          <label for="my-drawer" class="h-1/12 m-2" @click="$router.push({ name: 'RegFido' })">註冊FIDO</label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Navbar from '@/components/Navbar.vue' // @ is an alias to /src
import Footer from '@/components/Footer.vue' // @ is an alias to /src
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Navbar, Footer
  },
  setup() {
    return {
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
