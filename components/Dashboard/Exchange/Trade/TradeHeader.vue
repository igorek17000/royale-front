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
      <!-- <div class="text-right pr-5 hidden md:block" v-if="proffit > 0">
        <div class="text-xs text-gray-400 dark:text-gray-400">
          {{ $t('dashboard.exchange.trade.header.proffit') }}
        </div>
        <div class="text-lg font-roboto" :class="[profitClass]">
          <vue-numeric
            v-if="proffit"
            currency="$"
            separator=","
            read-only
            read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
            :value="proffit"
            :precision="2"
            class=""
          ></vue-numeric>
        </div>
      </div> -->
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
    this.getSinglePrice(coin)
    this.ws = new WebSocket(
      `wss://stream.binance.com/stream?streams=${coin}@trade/${coin}@ticker/${coin}@kline_1m`
    )
    let vm = this
    this.ws.addEventListener('message', function (event) {
      let ev = JSON.parse(event.data)
      if (ev.stream === `${coin}@trade`) {
        let newPush = {
          time: ev.data.T,
          qty: ev.data.q,
          price: ev.data.q * ev.data.p,
          isBuyerMaker: ev.data.m,
        }
        vm.$store.commit('trade/NEW_TRADE', newPush)

        let price = parseFloat(ev.data.p).toFixed(2)
        vm.btc = price
        vm.$store.commit('trade/LIVE_COIN_PRICE', vm.btc)
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
        vm.isLoading_change = false
        vm.coin_change = parseFloat(ev.data.p).toFixed(2)
        vm.coin_change_percentage = ev.data.P
        vm.coin_change_high = parseFloat(ev.data.h).toFixed(2)
        vm.coin_change_low = parseFloat(ev.data.l).toFixed(2)
      }
      if (ev.stream === `${coin}@kline_1m`) {
        let kline = {
          time: ev.data.k.t,
          open: parseFloat(ev.data.k.o),
          high: parseFloat(ev.data.k.h),
          low: parseFloat(ev.data.k.l),
          close: parseFloat(ev.data.k.c),
          volume: parseFloat(ev.data.k.v),
        }
        const klineValues = Object.values(kline)
        vm.$store.commit('trade/NEW_KLINE', klineValues)
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
    // async getCoinBalance(val) {
    //   await this.$axios
    //     .get(`/coins`, {
    //       params: {
    //         name: val,
    //         'user.id': this.$auth.user.id,
    //       },
    //       headers: {
    //         Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //     .then((res) => {
    //       let response = res.data
    //       if (response.length !== 0) {
    //         this.$store.commit('trade/SET_COIN_BALANCE', response)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('err SET_COIN_BALANCE', err)
    //     })
    // },
  },
  beforeDestroy() {
    // this.$store.commit('trade/SET_COIN_BALANCE', null)
    this.ws.close()
  },
  watch: {
    btc: function (val) {
      this.$emit('set-head-meta', val)
    },
    // coinRefresh: function (val) {
    //   this.getCoinBalance(this.coin)
    // },
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
