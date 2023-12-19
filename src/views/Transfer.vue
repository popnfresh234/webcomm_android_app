<template>
  <div class="sticky top-0 border-b-2 h-12 pb-4">台幣轉帳</div>
  <div class="flex flex-col py-4 px-6 h-full">
    <div class="header">
      <div class="info flex flex-row justify-around py-2">
        <div class="left account">
          <div class="">Account. {{ accountInfo.email }}</div>
          <div class="">帳戶總額NT$</div>
        </div>
        <div class="right balance text-3xl">{{ formatNumber(accountInfo.balance) }}</div>
      </div>

      <input type="tel" class="input border-2 py-2" placeholder="請輸入您的轉帳金額" v-model="transactionAmount" />
    </div>
    <div class="body py-2">
      <div class="tabs justify-center">
        <a class="tab tab-bordered">常用對象</a>
        <a class="tab tab-bordered tab-active">常用帳號</a>
        <a class="tab tab-bordered">約定帳號</a>
      </div>
      <div class="list">
        <div class="item flex flex-row justify-between py-2 px-1"
          :class="{ 'bg-gray-400': chooseRemoteEmail === account.remoteEmail }" v-for="account in remoteAccountList"
          :key="account.id" @click="chooseAccount(account.remoteEmail, account.name)">
          <div>{{ account.name }}</div>
          <div>{{ account.remoteEmail }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="buttonArea bottom-32 relative">
    <div class="btn btn-lg rounded-full" @click="excuteTransaction()">
      下一步
    </div>
  </div>
</template>
<script lang="ts">
import { doAuth, getBalance, requestAuth } from '@/api/api'
import { transfer } from '@/api/ibankApi'
import { IAccountResp } from '@/api/type'
import { appAlert } from '@/utils/appDialog'
// import { appAlert } from '@/utils/appDialog'
import { doAuthentication } from '@/utils/fido/authentication/authentication'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { formatNumber } from '@/utils/formatUtil'
import { ApiRespCode } from '@/api/apiRespCode'
import { getAccountList, IAccount } from '@/utils/transferUtil'
import { StatusCode } from '@/utils/fido/statusCode'

export default defineComponent({
  setup() {
    const store = useStore()
    // 目前登入的帳號
    const UsernameState = store.getters.usernameState

    // 取得登入帳號資訊
    const accountInfo = reactive({} as IAccountResp)
    const getAccountInfo = async () => {
      const res = await getBalance({ username: UsernameState })
      accountInfo.balance = res.balance
      accountInfo.email = res.email
      accountInfo.name = res.name
    }
    onMounted(async () => {
      await getAccountInfo()
    })

    // 要轉帳的金額及對象
    const transactionAmount = ref('')
    const chooseRemoteEmail = ref('')
    const chooseRemoteName = ref('')

    // 這邊是寫死的 濾掉當前登入的帳號
    const remoteAccountList = getAccountList().filter((a: IAccount) => a.remoteEmail !== UsernameState)

    // 選擇要匯款的帳號
    const chooseAccount = (chooseEmail: string, chooseName: string) => {
      chooseRemoteEmail.value = chooseEmail
      chooseRemoteName.value = chooseName
    }

    // 檢查輸入欄位
    const validateInput = () => {
      // 檢查
      if (!UsernameState) {
        appAlert('未登入請先登入')
        return false
      }
      if (typeof transactionAmount.value === 'undefined' || Number(transactionAmount.value) <= 0) {
        appAlert('請填入金額')
        transactionAmount.value = ''
        return false
      }
      if (typeof chooseRemoteEmail.value === 'undefined' || chooseRemoteEmail.value === '') {
        appAlert('請選擇轉帳對象')
        chooseRemoteEmail.value = ''
        return false
      }
      return true
    }

    // requestAuth電文的回傳值
    let authRequests = [] as any
    /**
     * STEP 1 : 向FIDO Server確認使否能轉帳 並拿回需要給FIDO SDK的資訊
     */
    const checkTransaction = async () => {
      try {
        const options = {
          username: UsernameState,
          transaction: {
            // content: '轉給' + chooseRemoteEmail.value + ' ' + transactionAmount.value + ' 元',
            // outacct: chooseRemoteName.value + '-' + chooseRemoteEmail.value,
            // amont: 'NT$ ' + formatNumber(transactionAmount.value)
            content: JSON.stringify({
              outacct: chooseRemoteName.value + '-' + chooseRemoteEmail.value,
              amont: 'NT$ ' + formatNumber(transactionAmount.value)
            })
          }
        }
        // step 2~6 電文
        const res = await requestAuth(options)
        if (res.header.code === ApiRespCode.Success) {
          authRequests = res.body.authRequests
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error(error)
        appAlert('未知的錯誤 ' + JSON.stringify(error))
        return false
      }
    }

    /**
     * STEP 2 , 3 : 呼叫FIDO SDK執行交易認證 再向FIDO Server確認
     */
    const doTransaction = async () => {
      // 檢查輸入欄位
      if (!validateInput()) {
        return
      }
      try {
        const options = {
          req: JSON.stringify(authRequests),
          username: UsernameState,
          extsData: {},
          displayName: 'A12*****89'
        }

        // step 7~16  fido plugin
        const authResponses = await doAuthentication(options)

        const res = await doAuth(authResponses)
        if (res.header.code === ApiRespCode.Success) {
          // 發電文轉帳
          // 正式情境下 轉帳電文 會等於是requestAuth 整合轉帳
          const res = await doTransfer()
          if (res.transferResult === 'success') {
            appAlert(
              '轉帳成功 , 轉出' +
              transactionAmount.value +
              '元 , 給' +
              chooseRemoteEmail.value,
              () => {
                // 重設所選金額與帳戶
                transactionAmount.value = ''
                chooseRemoteEmail.value = ''
              }
            )
          }
        } else {
          appAlert('轉帳失敗(' + res.header.code + ')')
        }
        // 交易後 一律重拿帳戶資訊
        await getAccountInfo()
      } catch (error: any) {
        if (error.code === StatusCode.USER_NOT_ENROLLED) {
          appAlert('尚未註冊快登')
        }
      }
    }

    /**
     * STEP 4 : 發電文轉帳
     */
    const doTransfer = async () => {
      const result = await transfer({
        userEmail: UsernameState,
        remoteEmail: chooseRemoteEmail.value,
        amount: Number(transactionAmount.value)
      })
      return result
    }

    /**
     * 執行轉帳(step1-4)
     */
    const excuteTransaction = async () => {
      if (await checkTransaction()) {
        await doTransaction()
      }
    }

    return {
      accountInfo, // 帳戶資訊
      formatNumber, // 直接引用的formater
      transactionAmount, // 要轉帳的金額
      remoteAccountList, // 常用帳戶列表 - forloop
      chooseRemoteEmail, // 要轉帳的對象 - 控制css
      chooseAccount, // 選擇要轉帳的對象
      excuteTransaction // 下一步btn - 執行轉帳
    }
  }
})
</script>
