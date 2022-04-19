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
        v-if="isLoadingCoin"
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
          :precision="4"
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
        v-if="isLoadingCoin"
      ></div>

      <div id="coinPrice" class="font-roboto" v-else>
        <span :class="profitClass">{{ coin_change }}</span>
        <span :class="profitClassPercentage"
          >{{ coin_change_percentage }}%</span
        >
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
        v-if="isLoadingCoin"
      ></div>

      <div id="coinPrice" class="font-roboto" v-else>
        <vue-numeric
          v-if="dailyHigh"
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="dailyHigh"
          :precision="4"
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
        v-if="isLoadingCoin"
      ></div>

      <div id="coinPrice" class="font-roboto" v-else>
        <vue-numeric
          v-if="dailyLow"
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="dailyLow"
          :precision="4"
          class=""
        ></vue-numeric>
      </div>
      <p class="pl-3 text-gray-500 text-sm hidden md:block">
        {{ $t('dashboard.exchange.trade.header.24h_low') }}
      </p>
    </div>
    <div
      class="items-center md:text-base text-gray-900 text-sm justify-center dark:text-white capitalize border-l dark:border-gray-800 px-2 py-4 w-1/2 md:w-1/5 hidden md:flex ml-auto"
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
import VueNumeric from 'vue-numeric'
import SearchMobile from './SearchMobile.vue'
export default {
  name: 'TradeHeader',
  data() {
    return {
      ws: null,
      lastPrice: null,
      colorClass: 'text-white',
      isLoading: true,
      profitClass: 'text-white',
      profitClassPercentage: 'text-white',
      coin: null,
    }
  },
  components: {
    VueNumeric,
    SearchMobile,
  },
  watch: {
    btc: function (val) {
      this.$emit('set-head-meta', val)
    },
    coin_change: function (val) {
      if (val > 0) {
        this.profitClass = 'text-green-500'
      } else if (val < 0) {
        this.profitClass = 'text-red-500'
      }
    },
    coin_change_percentage: function (val) {
      if (val > 0) {
        this.profitClassPercentage = 'text-green-500'
      } else if (val < 0) {
        this.profitClassPercentage = 'text-red-500'
      }
    },
  },
  computed: {
    btc() {
      return parseFloat(this.$store.state.trade.coin.price).toFixed(4)
    },
    coin_change() {
      return parseFloat(this.$store.state.trade.coin.change).toFixed(4)
    },
    coin_change_percentage() {
      return parseFloat(this.$store.state.trade.coin.changePercent).toFixed(4)
    },
    dailyHigh() {
      return parseFloat(this.$store.state.trade.coinMeta.high).toFixed(4)
    },
    dailyLow() {
      return parseFloat(this.$store.state.trade.coinMeta.low).toFixed(4)
    },
    balance() {
      return this.$store.state.balance.balance.actual_balance
    },
    started_balance() {
      return this.$store.state.balance.balance.started_balance
    },
    leverage() {
      return this.$store.state.leverage.forex_leverage
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
    isLoadingCoin() {
      return this.$store.state.trade.isLoadingCoin
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
