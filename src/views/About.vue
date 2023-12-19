<template>
  <div class="about p-8">
    <h1>This is an about page</h1>
    <ol class="list-decimal text-left">
      <li>
          未註冊-> 登入 -> 註冊快登頁 -> 註冊成功
      </li>
      <li>
          已註冊-> 登入 -> 快登成功 -> 首頁
      </li>
    </ol>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>
