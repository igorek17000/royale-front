<template>
  <div
    class="
      px-4
      py-3
      border
      rounded-xl
      flex flex-row
      justify-items-center
      items-center
      gap-2
      cursor-pointer
      border-gray-500
      shadow-md
    "
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
    class="
      px-4
      py-3
      border
      rounded-xl
      flex flex-row
      justify-items-center
      items-center
      gap-2
      cursor-pointer
      border-gray-500
      shadow-md
      bg-secondary
    "
    @click="
      $router.push({ name: 'exchange-trade-coin', params: { coin: 'dotusdt' } })
    "
    v-else
  >
    <div class="w-12 h-12">
      <img
        class="w-auto h-auto object-cover bg-white rounded-full"
        src="~/assets/logo/Polkadot.png"
        alt="Polkadot"
      />
    </div>
    <div class="body flex-auto">
      <h4 class="text-2xl pb-3 border-b border-gray-300">Polkadot</h4>

      <div class="price pt-3 text-xl font-bold text-money" v-if="coin">
        $ {{ coin }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PolkadotCard',
  data() {
    return {
      ws: null,
      coin: null,
      lastPrice: null,
      colorClass: 'text-green-500',
      isLoading: true,
    }
  },
  mounted() {
    this.getPrice()
  },
  methods: {
    async getPrice() {
      await axios
        .get('https://api.binance.com/api/v3/avgPrice', {
          params: {
            symbol: 'DOTUSDT',
          },
        })
        .then((res) => {
          let payload = res.data
          this.coin = parseFloat(payload.price).toFixed(2)
          this.isLoading = false
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
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