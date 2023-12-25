<template>
  <div class="home">

  </div>
  <div class="fixed-block" v-if="loginState === LoginStatus.login">
    <div class="table-container">
      <h1 class="common-header">最新消息</h1>
      <table class="news-items">
        <tr>
          <td>標題</td>
          <td class="news-date">日期</td>
        </tr>

        <tr v-for="newsItem of newsData.news">
          <td>

            {{ newsItem.title }}

          </td>
          <td class="news-date">{{ newsItem.localDate }}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class=login-button-container v-else>
    <LoginBtn />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue'
import { getNews } from '@/api/api'
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
    const fetchNews = async (): Promise<any> => {
      return await getNews();
    }

    const newsData = reactive({
      news: [],
    })

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
      if (store.getters.getloginStatus === LoginStatus.login) {
        newsData.news = await fetchNews();
      }

    })


    return { accountInfo, formatNumber, loginState, LoginStatus, newsData }

  }
})
</script>

<style lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
}

.news-items {
  border: none;
  border-radius: var(--default-border-radius);
  overflow: hidden;
}

.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

table {
  border-spacing: 0;
  width: 90vw;
  height: 50vh;
  table-layout: fixed;
}

.table-header {
  display: flex;
  justify-content: center;
}

td:first-child {

  width: 60%;
}

td {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 3rem;
  border: 1px solid black;
  padding: 0rem 1rem 0rem 1rem;
}

.td-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

tr:nth-child(even) {
  background-color: var(--light-text-color);
}

tr:nth-child(odd) {
  background-color: lightgray;
}

tr:first-child {
  text-align: center;
  background-color: #686868;
  color: var(--light-text-color);
}

.fixed-block {
  overflow: scroll
}

.login-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
</style>

