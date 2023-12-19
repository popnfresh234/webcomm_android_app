<template>
  <div
    class="footer z-50 flex flex-row bottom-0 absolute mx-0 px-0 border-t-2 pt-2 bg-white"
    id="footer" style="padding-bottom: 34px"
  >
    <div class="w-1/5 flex flex-col items-center"  @click="$router.push({ name: 'Transfer' })">
      <img src="@/assets/imgs/icon/dollar.svg" class="h-6" />
      <div>轉帳</div>
    </div>
    <div class="w-1/5 flex flex-col items-center">
      <img src="@/assets/imgs/icon/credit-card.svg" class="h-6" />
      <div>信用卡</div>
    </div>
    <div class="w-1/5 flex flex-col items-center" @click="$router.push({ name: 'Home' })">
      <img src="@/assets/imgs/icon/home.svg" class="h-6" />
      <div>首頁</div>
    </div>
    <div class="w-1/5 flex flex-col items-center">
      <img src="@/assets/imgs/icon/receipt.svg" class="h-6" />
      <div>繳費</div>
    </div>
    <div class="w-1/5 flex flex-col items-center">
      <img src="@/assets/imgs/icon/chart-tree.svg" class="h-6" />
      <div>子帳戶</div>
    </div>
  </div>
</template>
<script>
import { Vue } from 'vue-class-component'

export default class Footer extends Vue {}
</script>
