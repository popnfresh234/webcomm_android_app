<template>
  <div class="p-6 card bordered">
    <div class="form-control">
      <label class="cursor-pointer label">
        <span class="label-white label-text">生物驗證</span>
        <input type="checkbox" class="toggle toggle-primary" v-model="biomertySwitch">
      </label>
    </div>
  </div>
  <div class="p-6 card bordered">
    <div class="form-control">
      <label class="cursor-pointer label">
        <span class="label-white label-text">圖形驗證</span>
        <input type="checkbox" class="toggle toggle-primary" v-model="patternSwitch">
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { requestReg, doReg, doDereg } from '@/api/api'
import { IRequestRegRequestBody } from '@/api/type'
import { IRegistrationRequest, IDoRegistrationOptions } from '@/utils/fido/registration/type'
import { getSupportedAuthenticator, getTranslation, doRegistration, syncRegData } from '@/utils/fido/registration/registration'
import { doDeregistrationbyReq, doDeregistrationbyUserName } from '@/utils/fido/deregistration/deregistration'
import { mapGetters } from 'vuex'
import { appAlert } from '@/utils/appDialog'
import { setFastLoginStatus, removeFastLoginStatus, UserVerifications } from '@/utils/fastLoginUtil'
export default defineComponent({
  name: 'RegFido',

  components: {
  },
  data() {
    return {
      username: '',
      displayName: 'N264664***',
      regRequests: {} as IRegistrationRequest,
      supportedAuthenticator: {
        keyID: '',
        aaid: '',
        userVerifications: [],
        code: '',
        message: '',
        appID: ''
      },
      translation: '圖形密碼驗證',
      regResp: {} as any,
      userVerificationsList: [],
      doRegResp: {} as any,
      currentVer: '', // 當前的驗證器
      biomertySwitch: false,
      patternSwitch: false
    }
  },
  async created() {
    this.username = this.usernameState
    this.displayName = this.usernameState
    try {
      // 確認是否已註冊快登
      this.regRequests = await this.requestReg()
      console.log("REG REQSSSSSSSSSSSSSSSSs");
      console.log(this.regRequests);
      this.supportedAuthenticator = await this.getSupportedAuthenticator(this.regRequests)
      if (this.supportedAuthenticator.message === 'AUTHENTICATORINFO_STATUS_USER_ENROLLED') {
        // 已註冊
        this.userVerificationsList = this.supportedAuthenticator.userVerifications
        // 已註冊的驗證器只會有一個 以FIDO SDK為主
        this.currentVer = this.userVerificationsList[0]
        setFastLoginStatus(this.userVerificationsList[0])
        if (this.currentVer === UserVerifications.biometry) {
          this.biomertySwitch = true
        } else {
          this.patternSwitch = true
        }
      }
    } catch (err) {
      console.error(err)
    }
  },
  computed: {
    ...mapGetters(['usernameState'])
  },
  methods: {
    // 執行註冊
    async executeReg(userVerifications: string) {
      console.log("Execute Reg")
      // const userVerifications = this.supportedAuthenticator.userVerifications[0]
      try {
        this.translation = await this.getTranslation(userVerifications)
        const doRegistrationOptions = {
          req: JSON.stringify([this.regRequests]),
          userVerification: userVerifications,
          displayName: this.displayName
        } as IDoRegistrationOptions
        this.regResp = await this.doRegistration(doRegistrationOptions)
        this.doRegResp = await this.doReg(this.regResp)
        console.log("executeReg()")
        console.log(this.regResp);
        const result = await this.syncRegData(this.username, this.doRegResp)
        if (result) {
          setFastLoginStatus(userVerifications)
          this.currentVer = userVerifications
          appAlert(userVerifications + '綁定成功')
        }
      } catch (error) {
        console.log("Execute Reg Error");
        console.error(error)
        appAlert('綁定發生錯誤(' + JSON.stringify(error) + ')')
      }
    },
    // 執行解綁
    async excuteDoRereg() {
      try {
        const options = {
          appID: this.supportedAuthenticator.appID,
          authenticators: [
            {
              aaid: this.supportedAuthenticator.aaid,
              keyID: this.supportedAuthenticator.keyID
            }
          ],
          username: this.username
        }
        // 發電文註銷
        const res = await doDereg(options)
        // auth SDK 註銷 以電文回傳註銷
        await doDeregistrationbyReq(res.body.deRegRequests)
        appAlert(this.currentVer + '註銷完成')
        removeFastLoginStatus()
        this.currentVer = ''
      } catch (error) {
        console.error(error)
        // auth SDK 註銷 如果伺服器回傳有誤 則本地註銷 使用username
        // 只要app端註銷 造成與server端不一致時 就會解綁
        await doDeregistrationbyUserName(this.username)
        appAlert(this.currentVer + '註銷完成')
        removeFastLoginStatus()
        this.currentVer = ''
      }
    },
    // 以下為FIDO步驟流程的封裝
    // step 2~5
    // 電文
    async requestReg(): Promise<IRegistrationRequest> {
      const res = await requestReg({ username: this.username } as IRequestRegRequestBody)
      const reg = res.body.regRequests[0]
      return Promise.resolve(reg)
    },
    // step 6~7
    // cordova plugin FIDO SDK
    async getSupportedAuthenticator(regRequests: IRegistrationRequest) {
      return await getSupportedAuthenticator(regRequests)
    },
    // step 8~9
    // cordova plugin FIDO SDK
    async getTranslation(userVerifications: string) {
      return await getTranslation(userVerifications)
    },
    // Step 11~20 doRegistration
    // cordova plugin FIDO SDK --> 裡面會打get facet id
    async doRegistration(options: IDoRegistrationOptions) {
      return await doRegistration(options)
    },
    // Step 21~25 doReg
    // 進行 server authentication，完成註冊，並將server回傳的resp存入sdk內。
    // 電文
    async doReg(params: string) {
      try {
        const res = await doReg(params)
        return res.body
      } catch (error) {
        console.error(JSON.stringify(error))
      }
    },
    // Step 26~27 syncRegData
    // cordova plugin FIDO SDK
    async syncRegData(username: string, regData: any) {
      const options = {
        username,
        regData1: regData.regData1
      }
      return await syncRegData(options)
    }

  },
  watch: {
    async biomertySwitch(val) {
      if (val) {
        // 代表已註冊過
        if (this.currentVer === UserVerifications.biometry) {
          return
        }
        // 註冊
        console.log('biometryySwitch reg!')
        await this.executeReg(UserVerifications.biometry)
      } else {
        // 註銷
        console.log('biomertySwitch dereg!')
        await this.excuteDoRereg()
      }
    },
    async patternSwitch(val) {
      if (val) {
        // 代表已註冊過
        if (this.currentVer === UserVerifications.biometry) {
          return
        }
        // 註冊
        await this.executeReg(UserVerifications.pattern)
        console.log('patternSwitch reg!')
      } else {
        // 註銷
        console.log('patternSwitch dereg!')
        await this.excuteDoRereg()
      }
    }
  }

})
</script>
