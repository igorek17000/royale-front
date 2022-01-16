<template>
  <div class="relative mt-2">
    <input
      v-model="searchMobileInput"
      type="text"
      class="
        pl-8
        h-9
        bg-secondary
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

    <div
      class="absolute top-10 left-0 bg-secondary h-full w-full"
      style="z-index: 9999999"
      v-if="showMobileSearch"
    >
      <search-coin-mobile :filterCoins="filterCoins" v-if="showMobileSearch" />
    </div>
  </div>
</template>

<script>
import coins from './coins.json'
import SearchCoinMobile from './SearchCoinMobile.vue'
export default {
  name: 'SearchMobile',
  components: { SearchCoinMobile },
  data() {
    return {
      searchMobileInput: '',
      coins: coins,
      showMobileSearch: false,
    }
  },
  computed: {
    filterCoins() {
      let games = this.coins.filter((game) => {
        return (
          game.toLowerCase().indexOf(this.searchMobileInput.toLowerCase()) != -1
        )
      })
      return games
    },
  },
  watch: {
    searchMobileInput: function (val) {
      if (val.length === 0) {
        this.showMobileSearch = false
      } else {
        this.showMobileSearch = true
      }
    },
  },
}
</script>

<style>
</style>