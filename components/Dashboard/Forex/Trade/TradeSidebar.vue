<template>
  <div
    class="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5"
  >
    <div class="text-xs text-gray-400 tracking-wider uppercase">
      {{ title }}
    </div>
    <div class="relative mt-2">
      <input
        v-model="searchInput"
        type="text"
        class="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
        :placeholder="$t('dashboard.forex.trade.sidebar.search-placeholder')"
      />
      <svg
        viewBox="0 0 24 24"
        class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
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
    </div>
    <div class="space-y-4 mt-3">
      <trending-trades />
    </div>
  </div>
</template>

<script>
import SearchCoin from './SearchCoin.vue'
import VueNumeric from 'vue-numeric'
import TrendingTrades from './TrendingTrades.vue'
export default {
  components: { SearchCoin, VueNumeric, TrendingTrades },
  name: 'TradeSidebar',
  data() {
    return {
      baseURL: this.$config.baseURL,
      searchInput: '',
      showSearch: false,
      filterCoins: [],
    }
  },
  methods: {
    async handleSearch(val) {
      const payload = {
        searchString: val,
      }
      this.$axios
        .post('/finance/search', payload, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.$store.state.auth.token}`,
          },
        })
        .then((res) => {
          this.filterCoins = res.data.quotes
        })
    },
  },
  watch: {
    searchInput: function (val) {
      if (val.length === 0) {
        this.showSearch = false
      } else if (val.length > 2) {
        this.handleSearch(val)
        this.showSearch = true
      }
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
