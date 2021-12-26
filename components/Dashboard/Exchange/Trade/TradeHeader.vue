<template>
  <div
    class="
      flex
      w-full
      items-center
      border-b border-gray-200
      dark:border-gray-800
    "
  >
    <div
      class="
        flex
        items-center
        md:text-3xl
        text-gray-900 text-lg
        justify-center
        dark:text-white
        capitalize
        border-r border-gray-200
        dark:border-gray-800
        px-5
        py-4
      "
    >
      <div
        data-placeholder
        class="livecoin h-9 overflow-hidden relative bg-secondary"
        v-if="isLoading"
      ></div>

      <div :class="[colorClass]" v-else>${{ btc }}</div>
      <p class="pl-3 text-gray-500 text-lg hidden md:block">Market Price</p>
    </div>
    <div class="ml-auto flex items-center justify-end">
      <div class="text-right pr-5 hidden md:block">
        <div class="text-xs text-gray-400 dark:text-gray-400">
          {{ $t('account.balance') }}:
        </div>
        <div class="text-gray-900 text-lg dark:text-white">
          ${{ parseFloat(balance).toFixed(2) }} 💰
        </div>
      </div>
      <div class="text-right pr-5">
        <div class="text-xs text-gray-400 dark:text-gray-400">Proffit:</div>
        <div class="text-lg" :class="[profitClass]">{{ proffit }}$</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TradeHeader',
  data() {
    return {
      ws: null,
      btc: null,
      lastPrice: null,
      colorClass: 'text-white',
      isLoading: true,
      profitClass: 'text-white',
    }
  },
  mounted() {
    let coin = this.$route.params.coin
    this.getSinglePrice(coin)
    this.ws = new WebSocket(
      `wss://stream.binance.com/stream?streams=${coin}@trade/${coin}@ticker`
    )
    let vm = this
    this.ws.addEventListener('message', function (event) {
      let ev = JSON.parse(event.data)
      if (ev.stream === `${coin}@trade`) {
        console.log('ev', ev)
        let price = parseFloat(ev.data.p).toFixed(2)
        vm.btc = price
        if (!vm.lastPrice || vm.lastPrice === price) {
          vm.colorClass = 'text-white'
        } else if (price > vm.lastPrice) {
          vm.colorClass = 'text-money'
        } else {
          vm.colorClass = 'text-custom-red'
        }
        vm.lastPrice = price
      }
      if (ev.stream === `${coin}@ticker`) {
        // console.log('evennt', ev)
      }
    })
  },
  methods: {
    async getSinglePrice(val) {
      await axios
        .get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${val.toUpperCase()}`
        )
        .then((res) => {
          this.isLoading = false
          this.btc = parseFloat(res.data.price).toFixed(2)
        })
        .catch((err) => {
          console.log('err getCoin', err)
        })
    },
  },
  beforeDestroy() {
    this.ws.close()
  },
  watch: {
    btc: function (val) {
      this.$emit('set-head-meta', val)
    },
  },
  computed: {
    balance() {
      return this.$store.state.balance.balance.actual_balance
    },
    started_balance() {
      return this.$store.state.balance.balance.started_balance
    },
    proffit() {
      let proffit = this.balance - this.started_balance
      if (proffit < 0) {
        proffit = `${parseFloat(proffit).toFixed(2)}`
        this.profitClass = 'text-custom-red'
      } else {
        proffit = `+${parseFloat(proffit).toFixed(2)}`
        this.profitClass = 'text-money'
      }
      return proffit
    },
  },
}
</script>

<style scoped>
.livecoin {
  width: 120px;
}
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