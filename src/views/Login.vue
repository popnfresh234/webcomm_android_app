<template>
  <div class="flex items-center justify-center py-12 px-4 pt-24 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div>
      </div>

      <div class="loginArea mt-8 space-y-6" v-if="loginState === 'logout'">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="username" name="username" type="text" autocomplete="text" required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="UserName" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="password" name="password" type="password" autocomplete="current-password"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password" />
          </div>
        </div>
        <!-- 
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" v-model="rememberMe" />
            <label for="remember-me" class="label-white ml-2 block text-sm">
              Remember me
            </label>
          </div>
        </div> -->

        <div @click.stop="clickToLogin()">
          <button class="box-link" type="submit">
            Login
          </button>
        </div>
      </div>
      <div class="logoutArea mt-8 space-y-6" v-else>
        <div @click.stop="clickToLogout()">
          <button class="box-link" type="submit">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { requestAuth, doAuth, requestReg, doDereg, login } from '@/api/api'
import { doAuthentication } from '@/utils/fido/authentication/authentication'
import { useStore } from 'vuex'
import { appAlert } from '@/utils/appDialog'
import { setRememberMe, getRememberMe, LoginStatus, LOCAL_STORAGE_TOKEN } from '@/utils/fastLoginUtil'
import { StatusCode } from '@/utils/fido/statusCode'
import { ApiRespCode } from '@/api/apiRespCode'

export default defineComponent({
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const store = useStore()
    const UsernameState = store.getters.usernameState
    const loginState = computed(() => store.getters.getloginStatus)
    const handleUsername = () => { store.dispatch('handleUsernameState', username.value) }
    const router = useRouter()
    const username = ref(UsernameState)
    const password = ref("Testtest112!")
    let authRequests = [] as any
    let caneclFastLogin = false

    // 記住我 功能 從llocalstorage拿值


    const rememberMe = ref(getRememberMe())



    // 正常登
    const clickToLogin = async () => {
      console.log('login!!!!!!!!!!! ', username.value)
      try {
        // 先確定是否已註冊快登
        if (!caneclFastLogin && (await checkFidoLogin())) {
          await loginWithFido()
          // loginWithFido();
        } else {
          // 儲存username
          handleUsername()
          const res = await login({
            account: username.value,
            password: password.value
          })
          localStorage.setItem(LOCAL_STORAGE_TOKEN, res.accessToken)

          // 在取消RememberMe的情況下 需檢查是否已經有註冊 如已註冊須先解綁
          if (rememberMe.value === false) {
            // TODO: 取消勾選的註銷流程
            store.dispatch('handleLoginStatus', LoginStatus.login)
            router.push({ name: 'Home' })
          } else {
            // 先到otp 再到 裝置綁定
            store.dispatch('handleLoginStatus', LoginStatus.login)
            router.push({ name: 'OTP' })
          }
        }
      } catch (error) {
        console.error('clickToLogin error = ' + JSON.stringify(error))
        appAlert('登入失敗')
      }
    }

    // 向serveer確認是否能啟用快登
    const checkFidoLogin = async () => {
      try {
        // step 2~6 電文
        console.log("checkFidoLogin()");
        const res = await requestAuth({ username: username.value })
        console.log("requestAuth Response", res);
        if (res.header.code === ApiRespCode.Success) {
          authRequests = res.body.authRequests
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error(error)
        return false
      }
    }

    // FIDO登入
    const loginWithFido = async () => {
      try {
        // 走驗證流程
        console.log('loginWithFido()')
        const options = {
          req: JSON.stringify(authRequests),
          username: username.value,
          extsData: {},
          displayName: username.value
        }

        // step 7~16  fido plugin
        const authResponses = await doAuthentication(options)
        // step 17~21 電文
        console.log('doAuth')
        const res = await doAuth(authResponses)
        console.log(res.header.code)
        if (res.header.code === ApiRespCode.Success) {
          appAlert(
            'FIDO登入成功', // message
            () => {
              // 更改狀態為登入
              store.dispatch('handleLoginStatus', LoginStatus.login)
              router.push({ name: 'Home' })
            } // callback
          )
        } else {
          appAlert('FIDO登入失敗(' + res.header.code + ')')
        }
      } catch (error: any) {
        caneclFastLogin = true
        if (error.code === StatusCode.USER_CANCELLED) {
          appAlert('取消快登')
        } else if (error.code === StatusCode.USER_NOT_ENROLLED) {
          // appAlert('尚未註冊快登' + JSON.stringify(error))
          // 視為第一次登入
        } else {
          appAlert('未知的錯誤' + JSON.stringify(error))
        }
      }
    }

    // 一啟動就檢查有無註冊快登
    onMounted(async () => {
      if (loginState.value === LoginStatus.login) {
        console.log('已登入只顯示 登出鈕')
      } else {
        // 判斷是否已註冊快登
        console.log("Try Fido")
        if (await checkFidoLogin()) {
          await loginWithFido()
        }
      }
    })

    // 點擊登出
    const clickToLogout = () => {
      store.dispatch('handleLoginStatus', LoginStatus.logout)
    }

    watch(rememberMe, () => {
      console.log('watch rememberMe', rememberMe.value)
      if (rememberMe.value === false) {
        // 查看是否已註冊
        // 已註冊需解綁
        setRememberMe(false)
      } else {
        setRememberMe(true)
      }
    })
    return {
      username,
      password,
      clickToLogin,
      rememberMe,
      clickToLogout,
      loginState
    }
  }
})
</script>
// 第一次登入 並註冊 // 1. login app // 2. requestReg(username) ,app->middleware
// 3. middleware // 4. middleware // 5. return requestRegResp ,middleware -> app
// 6. getSupportedAuthenticator ,app -> fido sdk // 7. return supported
authenticator list ,fido sdk -> app // 8. getTranslation ,app -> fido sdk // 9.
return authenticator translation ,fido sdk -> app // 10. app display
authenticators in its manner // 登入後 第二次可快登
