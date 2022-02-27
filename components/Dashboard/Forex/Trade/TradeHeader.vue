<template>
  <div
    class="flex w-full items-center border-b border-gray-200 dark:border-gray-800 bg-primary flex-wrap md:flex-nowrap"
  >
    <div class="mobile block md:hidden w-full px-4 py-4">
      <search-mobile />
    </div>
    <div
      class="flex items-center md:text-base text-sm justify-center dark:text-white capitalize border-r dark:border-gray-800 px-2 py-4 w-1/2 md:w-1/5"
    >
      <div
        data-placeholder
        class="livecoin h-9 overflow-hidden relative bg-secondary"
        v-if="isLoading"
      ></div>

      <div id="coinPrice" class="font-roboto" :class="[colorClass]" v-else>
        <vue-numeric
          v-if="btc"
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-2
          pr-2"
          :value="btc"
          :precision="2"
          class=""
        ></vue-numeric>
      </div>
      <p class="pl-3 text-gray-500 text-sm hidden md:block">
        {{ $t('dashboard.exchange.trade.header.market_price') }}
      </p>
    </div>
    <div
      class="flex items-center md:text-base text-gray-900 text-sm justify-center dark:text-white capitalize border-r border-gray-200 dark:border-gray-800 px-2 py-4 w-1/2 md:w-1/5"
    >
      <div
        data-placeholder
        class="livecoin h-9 overflow-hidden relative bg-secondary"
        v-if="isLoading_change"
      ></div>

      <div id="coinPrice" class="font-roboto" v-else>
        {{ coin_change }} {{ coin_change_percentage }}%
      </div>
      <p class="pl-3 text-gray-500 text-sm hidden md:block">
        {{ $t('dashboard.exchange.trade.header.24h_change') }}
      </p>
    </div>
    <div
      class="hidden md:flex items-center md:text-base text-gray-900 text-sm justify-center dark:text-white capitalize border-r border-gray-200 dark:border-gray-800 px-2 py-4 w-1/2 md:w-1/5"
    >
      <div
        data-placeholder
        class="livecoin h-9 overflow-hidden relative bg-secondary"
        v-if="isLoading_change"
      ></div>

      <div id="coinPrice" class="font-roboto" v-else>
        <vue-numeric
          v-if="coin_change_high"
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="coin_change_high"
          :precision="2"
          class=""
        ></vue-numeric>
      </div>
      <p class="pl-3 text-gray-500 text-sm hidden md:block">
        {{ $t('dashboard.exchange.trade.header.24h_high') }}
      </p>
    </div>
    <div
      class="items-center md:text-base text-gray-900 text-sm justify-center dark:text-white capitalize border-r border-gray-200 dark:border-gray-800 px-2 py-4 w-1/2 md:w-1/5 hidden md:flex"
    >
      <div
        data-placeholder
        class="livecoin h-9 overflow-hidden relative bg-secondary"
        v-if="isLoading_change"
      ></div>

      <div id="coinPrice" class="font-roboto" v-else>
        <vue-numeric
          v-if="coin_change_low"
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="coin_change_low"
          :precision="2"
          class=""
        ></vue-numeric>
      </div>
      <p class="pl-3 text-gray-500 text-sm hidden md:block">
        {{ $t('dashboard.exchange.trade.header.24h_low') }}
      </p>
    </div>
    <div
      class="items-center md:text-base text-gray-900 text-sm justify-center dark:text-white capitalize border-r border-gray-200 dark:border-gray-800 px-2 py-4 w-1/2 md:w-1/5 hidden md:flex"
    >
      <div class="text-xs text-gray-400 dark:text-gray-400">
        {{ $t('dashboard.exchange.trade.header.leverage') }}
      </div>
      <div class="text-white font-roboto flex items-center">
        <vue-numeric
          v-if="leverage"
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="leverage"
          :precision="2"
          class=""
        ></vue-numeric>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueNumeric from 'vue-numeric'
import SearchMobile from './SearchMobile.vue'
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
      coin: null,
      isLoading_change: true,
      coin_change: null,
      coin_change_percentage: null,
      coin_change_high: null,
      coin_change_low: null,
    }
  },
  components: {
    VueNumeric,
    SearchMobile,
  },
  mounted() {
    let coin = this.$route.params.coin
    this.coin = coin.replace('usdt', '')
    console.log('🚀 ~ mounted ~ this.coinss', this.coin)
    this.getSinglePrice(coin)
    // this.ws = new WebSocket('wss://api.tiingo.com/iex')
    // let that = this

    // let subscribe = {
    //   eventName: 'subscribe',
    //   authorization: '8dcfa1491f01d4804a588845685ad28fd2b8d2ef',
    //   eventData: {
    //     thresholdLevel: 5,
    //   },
    // }

    // this.ws.addEventListener('open', function (event) {
    //   that.ws.send(JSON.stringify(subscribe))
    // })
    // this.ws.addEventListener('message', function (event) {
    //   console.log(event)
    // })
  },
  methods: {
    async getSinglePrice(val) {
      await axios
        .get(`https://www.alphavantage.co/query`, {
          params: {
            function: 'CURRENCY_EXCHANGE_RATE',
            from_currency: 'EUR',
            to_currency: 'USD',
            apikey: '47K5Z7GECFZY32ZQ',
          },
        })
        .then((res) => {
          console.log('🚀 ~ .then ~ res', res.data)
          let price = res.data
          this.isLoading = false
          this.btc = parseFloat(res.data.price).toFixed(2)
        })
        .catch((err) => {
          console.log('err getCoin', err)
        })
    },
  },
  beforeDestroy() {
    let unsubscribe = {
      eventName: 'unsubscribe',
      authorization: '8dcfa1491f01d4804a588845685ad28fd2b8d2ef',
    }
    // this.ws.send(JSON.stringify(unsubscribe))
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
    leverage() {
      return this.$store.state.balance.balance.leverage
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
