<template>
  <div>
    <div class="header flex flex-col items-center pt-20">
      <div class="img">
        <img src="@/assets/imgs/mobile-msg-pop.png" class="h-40" />
      </div>
      <div class="title">綁定此裝置</div>
      <div class="content">
        已發送綁定碼 有效時間還有
        <span class="font-mono countdown">
          <span :style="[countdownSeconds]"></span>
          秒
        </span>
      </div>
    </div>
    <div class="body px-4 py-6 flex flex-col items-center">
      <div class="form-control">
        <div class="flex space-x-2">
          <input
            type="tel"
            placeholder="請輸入驗證碼"
            class=" input  input-bordered"
            maxlength="6"
          />
          <button class="btn" @click="goNext()">下一步</button>
        </div>
      </div>
    </div>
    <div class="btnArea"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    // 設定倒數
    let seconds = 99
    const countdownSeconds = ref('--value:99;')
    let countdown = 0
    onMounted(() => {
      countdown = setInterval(() => {
        seconds--
        countdownSeconds.value = '--value:' + seconds + ';'
      }, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(countdown)
    })

    const router = useRouter()

    const goNext = () => {
      router.push({ name: 'Home' })
    }

    return { countdownSeconds, goNext }
  }
})
</script>
