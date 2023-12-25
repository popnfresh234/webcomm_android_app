<template>
  <div style="height: 100vh;" id="cameraScreen">
    <header class=" sticky top-0 z-50 w-auto justify-between">
      <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content" style="padding-top: 44px">
        <div class="flex-none">
          <button class="btn btn-square btn-ghost w-10 ml-2" @click="$router.back()">
            <img src="@/assets/imgs/pre-arrow.png" width="24" />
          </button>
        </div>
        <div class="flex-1 px-2 mx-2 ml-16">
          <span class="text-lg font-bold">
            <img src="@/assets/imgs/demo-logo.png" class="logo" />
          </span>
        </div>
        <div class="flex-none  w-10 ml-2">

        </div>

      </div>
    </header>
  </div>
</template>
<script lang='ts'>
import { useRouter } from 'vue-router'
import { requestPairAuth, doAuth } from '@/api/api'
import { IRequestPairAuthRequestBody } from '@/api/type'
import { doAuthentication } from '@/utils/fido/authentication/authentication'
import { useStore } from 'vuex'
import { defineComponent } from 'vue'
import { appAlert } from '@/utils/appDialog'
import { ApiRespCode } from '@/api/apiRespCode'
declare var QRScanner: any

export default defineComponent({
  components: {},
  created() {
    try {
      document.getElementById('header').style.display = 'none'
      document.getElementById('main-content').classList.add("hide-bg")
    } catch (err) {
      console.log('get element err')
    }

    this.scanQR()
  },
  async beforeUnmount() {
    await QRScanner.destroy((status: any) => {
      console.log("QR READER STATUS: ", status);
    })
    try {
      document.getElementById('header').style.display = 'block'
      document.getElementById('main-content').classList.remove('hide-bg')
    } catch (err) {
      console.log('get element err')
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    // 目前登入的帳號
    const usernameState = store.getters.usernameState
    console.log("ScanCode Username", usernameState);
    const scanQR = () => {
      async function displayContents(err: any, text: any) {
        QRScanner.destroy()
        if (err) {
          router.back()
        } else {
          try {
            const params = {
              paircode: text,
              username: usernameState,
            } as IRequestPairAuthRequestBody
            // step 16~21 requestPairAuth
            // 發電文
            const requestPairAuthResp = await requestPairAuth(params)
            console.log("pair auth response: ");
            console.log(requestPairAuthResp);
            const options = {
              req: JSON.stringify(requestPairAuthResp.body.authRequests),
              username: usernameState,
              extsData: {

              },
              displayName: usernameState
            }

            // step 22~26 doAuthentication
            // auth SDK驗證
            let doAuthenticationResp = await doAuthentication(options)
            // step 27~33 doAuth
            // auth SDK 向 FIDO server驗證
            const res = await doAuth(doAuthenticationResp, usernameState)
            if (res.header.code === ApiRespCode.Success) {
              appAlert('網銀登入成功', () => { router.replace({ name: 'Home' }) })
            } else {
              appAlert('網銀登入失敗(' + res.header.code + ')')
            }
          } catch (error) {
            console.error('網銀登入失敗' + JSON.stringify(error))
            appAlert('網銀登入失敗(' + JSON.stringify(error) + ')', () => { router.replace({ name: 'Home' }) })
          }
        }
      }
      QRScanner.scan(displayContents)
      QRScanner.show()
    }

    return {
      scanQR
    }
  }
})
</script>

<style>
.logo {
  height: 100%;
}
</style>