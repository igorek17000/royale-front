<template>
  <div
    class="px-4 py-3 border rounded-xl flex flex-row justify-items-center items-center gap-2 cursor-pointer border-gray-500 shadow-md"
    v-if="isLoading"
  >
    <div class="w-12 h-12">
      <div
        data-placeholder
        class="h-12 w-12 rounded-full overflow-hidden relative bg-secondary"
      ></div>
    </div>
    <div class="flex flex-col justify-between">
      <div
        data-placeholder
        class="mb-2 h-4 w-20 overflow-hidden relative bg-secondary"
      ></div>
      <div
        data-placeholder
        class="h-4 w-20 overflow-hidden relative bg-secondary"
      ></div>
    </div>
  </div>
  <div
    class="px-4 py-3 border rounded-xl flex flex-row justify-items-center items-center gap-2 cursor-pointer border-gray-500 shadow-md bg-secondary"
    @click="
      $router.push({ name: 'forex-trade-coin', params: { coin: 'eurusd' } })
    "
    v-else
  >
    <div class="body flex-auto">
      <h4 class="text-2xl pb-3 border-b border-gray-300">EUR/USD</h4>

      <div
        class="price pt-3 text-base md:text-xl font-bold text-money"
        v-if="coin"
      >
        {{ coin }}
      </div>
    </div>
  </div>
</template>

<script>
import alphavantage from 'alphavantage'
export default {
  name: 'EurCard',
  data() {
    return {
      ws: null,
      coin: null,
      isLoading: true,
    }
  },

  mounted() {
    const alpha = alphavantage({ key: 'G5INQFCVT5G2J7RN' })
    alpha.forex.rate('eur', 'usd').then((data) => {
      let eur = data['Realtime Currency Exchange Rate']['5. Exchange Rate']

      this.coin = parseFloat(eur).toFixed(6)
      console.log('🚀 ~ alpha.forex.rate ~ eur.coin', this.coin)
      this.isLoading = false
    })
  },
}
</script>

<style scoped>
[data-placeholder]::after {
  content: ' ';
  box-shadow: 0 0 50px 9px rgba(254, 254, 254);
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  animation: load 1s infinite;
}
@keyframes load {
  0% {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}
</style>
