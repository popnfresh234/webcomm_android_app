<template>
  <div class="sticky top-0 border-b-2 h-12 pb-4">交易紀錄</div>
  <div class="flex flex-col py-4 px-6 h-full">
    <div class="header">

    </div>
    <div class="body pb-32">
      <div class="card flex flex-col p-2 m-2 border-2 " v-for="(record,idx) in recordList" :key="idx">
        <!-- <div class="info flex flex-col justify-between"> -->
          <div class=" flex flex-row  justify-between">
            <div class="account">{{record.accountEmail}}</div>
            <div class="type">{{getTypeTranslation(record.type)}}</div>
          <!-- </div>
          <div class=" flex flex-row gap-4"> -->
            <div class="remote">{{record.remoteEmail}}</div>
            <div class="amount">NT$ {{formatNumber(record.amount)}}</div>
          </div>
        <!-- </div> -->
        <div class="flex flex-row border-t-2 justify-between">
          <div class="time">{{formatDate(record.date,'YYYY/MM/DD HH:mm:ss')}}</div>
          <div class="balance"> 餘額 : NT$ {{formatNumber(record.balance)}}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script lang="ts">
import { getTransactionsPage } from '@/api/ibankApi'
import { IAccountResp } from '@/api/type'
import { formatDate, formatNumber } from '@/utils/formatUtil'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    const UsernameState = store.getters.usernameState
    const getTransactionRecord = async () => {
      return await getTransactionsPage({
        email: UsernameState,
        page: '0',
        size: 10
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const recordList = ref([])

    const accountInfo = reactive({
      balance: 0,
      email: 'wyntest001',
      name: '威'
    } as IAccountResp)

    onMounted(async () => {
      const res = await getTransactionRecord()
      recordList.value = res.content
    })

    const getTypeTranslation = (type:string) => {
      switch (type) {
        case 'deposit':
          return '存款'
        case 'withdraw':
          return '提款'
        case 'transfer':
          return '匯款'
      }
    }

    return { accountInfo, recordList, formatDate, formatNumber, getTypeTranslation }
  }
})
</script>
