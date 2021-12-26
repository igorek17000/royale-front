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
        placeholder="Search by coin (ex: BTC)"
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
      <div class="flex justify-between">
        <p class="w-16 text-gray-400 text-sm">Coin Size</p>
        <p class="w-16 text-gray-400 text-sm">Price</p>
        <p class="w-16 text-gray-400 text-sm">Time</p>
      </div>
      <div v-if="!showSearch" class="h-96 overflow-y-auto">
        <div
          class="trades flex justify-between"
          v-for="trade in tradeBook"
          :key="trade.id"
        >
          <p
            class="w-16"
            :class="[trade.isBuyerMaker ? 'text-money' : 'text-custom-redh']"
          >
            {{ parseFloat(trade.qty).toFixed(4) }}
          </p>
          <p class="w-16 text-white">
            {{ spentPrice(trade.price, trade.qty) }}
          </p>
          <p class="w-16 text-gray-400">{{ timeDone(trade.time) }}</p>
        </div>
      </div>
      <div class="h-48 bg-red-400 w-full z-50"></div>
    </div>
  </div>
</template>

<script>
import SearchCoin from './SearchCoin.vue'
import coins from './coins.json'
import axios from 'axios'
export default {
  components: { SearchCoin },
  name: 'TradeSidebar',
  data() {
    return {
      baseURL: this.$config.baseURL,
      searchInput: '',
      coins: coins,
      showSearch: false,
      tradeBook: [],
    }
  },
  computed: {
    filterCoins() {
      let games = this.coins.filter((game) => {
        return game.toLowerCase().indexOf(this.searchInput.toLowerCase()) != -1
      })
      return games
    },
  },
  mounted() {
    let coin = this.$route.params.coin
    this.getTradeBook(coin)
  },
  methods: {
    spentPrice(price, qty) {
      let total = price * qty
      return parseFloat(total).toFixed(2)
    },
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
          this.tradeBook = res.data.reverse()
        })
        .catch((err) => {
          console.log('err getCoin', err)
        })
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
    tradeBook: (val) => {
      console.log('val', val)
    },
  },
  props: ['title'],
}
</script>

<style>
</style>