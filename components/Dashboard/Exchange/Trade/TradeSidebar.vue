<template>
  <div
    class="
      xl:w-72
      w-48
      flex-shrink-0
      border-r border-gray-200
      dark:border-gray-800
      h-full
      overflow-y-auto
      lg:block
      hidden
      p-5
    "
  >
    <div class="text-xs text-gray-400 tracking-wider uppercase">
      {{ title }}
    </div>
    <div class="relative mt-2">
      <input
        v-model="searchInput"
        type="text"
        class="
          pl-8
          h-9
          bg-transparent
          border border-gray-300
          dark:border-gray-700 dark:text-white
          w-full
          rounded-md
          text-sm
        "
        :placeholder="$t('dashboard.exchange.trade.sidebar.search')"
      />
      <svg
        viewBox="0 0 24 24"
        class="
          w-4
          absolute
          text-gray-400
          top-1/2
          transform
          translate-x-0.5
          -translate-y-1/2
          left-2
        "
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
    <div class="space-y-4 mt-3 relative">
      <search-coin :filterCoins="filterCoins" v-if="showSearch" />
      <div
        class="
          text-sm text-gray-400
          tracking-wider
          border-t border-gray-800
          pt-2
          mt-2
        "
        v-if="!showSearch"
      >
        {{ $t('dashboard.exchange.trade.sidebar.market_trades') }}
      </div>
      <div v-if="!showSearch" class="flex justify-between">
        <p class="w-16 text-gray-400 text-sm">
          {{ $t('dashboard.exchange.trade.sidebar.coin_size') }}
        </p>
        <p class="w-16 text-gray-400 text-sm">
          {{ $t('dashboard.exchange.trade.sidebar.price') }}
        </p>
        <p class="w-16 text-gray-400 text-sm">
          {{ $t('dashboard.exchange.trade.sidebar.time') }}
        </p>
      </div>
      <div v-if="!showSearch" class="coin-trades overflow-y-auto">
        <div
          class="trades flex justify-between"
          v-for="trade in tradeBook"
          :key="trade.id"
        >
          <p
            class="w-16 text-sm font-roboto pr-1"
            :class="[trade.isBuyerMaker ? 'text-greenMoney' : 'text-pinkMoney']"
          >
            {{ parseFloat(trade.qty).toFixed(4) }}
          </p>
          <p class="w-24 text-white text-sm font-roboto pl-1">
            $ {{ parseFloat(trade.price).toFixed(2) }}
          </p>
          <p class="w-16 text-gray-400 text-xs text-center">
            {{ timeDone(trade.time) }}
          </p>
        </div>
      </div>
      <div v-if="!showSearch" class="w-full border-t border-gray-800 pt-6">
        <div class="percentage flex justify-between align-middle items-center">
          <div
            class="bg-negative p-2 rounded-l-lg"
            :style="{ width: negativePerc + '%' }"
          >
            <p class="font-bold text-white text-left">{{ negativePerc }}%</p>
          </div>
          <div
            class="bg-positive p-2 rounded-r-lg"
            :style="{ width: positivePerc + '%' }"
          >
            <p class="font-bold text-black text-right">{{ positivePerc }}%</p>
          </div>
        </div>
        <div class="prices flex justify-between align-middle items-center pt-4">
          <p class="font-bold font-roboto">
            <vue-numeric
              v-if="negativeCap"
              currency="$"
              separator=","
              read-only
              read-only-class=" flex
        items-center pr-3
          w-full"
              :value="negativeCap"
              :precision="2"
              class=""
            ></vue-numeric>
          </p>
          <p class="font-bold font-roboto">
            <vue-numeric
              v-if="positiveCap"
              currency="$"
              separator=","
              read-only
              read-only-class=" flex
        items-center pr-3
          w-full"
              :value="positiveCap"
              :precision="2"
              class=""
            ></vue-numeric>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchCoin from './SearchCoin.vue'
import coins from './coins.json'
import axios from 'axios'
import VueNumeric from 'vue-numeric'
export default {
  components: { SearchCoin, VueNumeric },
  name: 'TradeSidebar',
  data() {
    return {
      baseURL: this.$config.baseURL,
      searchInput: '',
      coins: coins,
      showSearch: false,
      positiveCap: null,
      negativeCap: null,
      positivePerc: null,
      negativePerc: null,
    }
  },
  computed: {
    filterCoins() {
      let games = this.coins.filter((game) => {
        return game.toLowerCase().indexOf(this.searchInput.toLowerCase()) != -1
      })
      return games
    },
    tradeBook() {
      return this.$store.state.trade.tradeBook
    },
  },
  mounted() {
    let coin = this.$route.params.coin
    this.getTradeBook(coin)
  },
  methods: {
    timeDone(val) {
      let unix_timestamp = val
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unix_timestamp)
      // Hours part from the timestamp
      var hours = date.getHours()
      // Minutes part from the timestamp
      var minutes = '0' + date.getMinutes()
      // Seconds part from the timestamp
      var seconds = '0' + date.getSeconds()

      // Will display time in 10:30:23 format
      var formattedTime =
        hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

      return formattedTime
    },
    async getTradeBook(val) {
      await axios
        .get(
          `https://api.binance.com/api/v3/trades?symbol=${val.toUpperCase()}&limit=100`
        )
        .then((res) => {
          let data = res.data.map((item) => {
            return {
              time: item.time,
              qty: item.qty,
              price: item.qty * item.price,
              isBuyerMaker: item.isBuyerMaker,
            }
          })

          let tradebook = data.reverse()
          this.$store.commit('trade/SET_TRADEBOOK', tradebook)
        })
        .catch((err) => {
          console.log('err getCoin', err)
        })
    },
    checkFooterTotal(val) {
      this.positiveCap = val.reduce(function (sum, record) {
        if (record.isBuyerMaker === false) return sum + record.price
        else return sum
      }, 0)
      this.negativeCap = val.reduce(function (sum, record) {
        if (record.isBuyerMaker === true) return sum + record.price
        else return sum
      }, 0)
      let total = val.reduce(function (sum, record) {
        return sum + record.price
      }, 0)
      let positivePercentage = (this.positiveCap / total) * 100
      this.positivePerc = parseFloat(positivePercentage).toFixed(2)
      let negativePercentage = (this.negativeCap / total) * 100
      this.negativePerc = parseFloat(negativePercentage).toFixed(2)
    },
  },
  watch: {
    searchInput: function (val) {
      if (val.length === 0) {
        this.showSearch = false
      } else {
        this.showSearch = true
      }
    },
    tradeBook: function (val) {
      this.checkFooterTotal(val)
    },
  },
  props: ['title'],
}
</script>

<style scoped>
.coin-trades {
  height: calc(100vh - 370px);
}
.bg-negative {
  background: rgba(0, 0, 0, 0)
    linear-gradient(267.73deg, rgb(255, 85, 85) 0.92%, rgb(253, 15, 130) 100%)
    repeat scroll 0% 0%;
}
.bg-positive {
  background: rgba(0, 0, 0, 0)
    linear-gradient(
      265.28deg,
      rgb(78, 227, 157) 10.92%,
      rgb(65, 175, 199) 94.87%
    )
    repeat scroll 0% 0%;
}
</style>