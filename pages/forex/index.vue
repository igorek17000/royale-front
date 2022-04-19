<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-full md:h-screen flex overflow-hidden text-sm mb-20 md:mb-0"
  >
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="flex-grow flex overflow-x-hidden">
        <div class="flex-grow dark:bg-primary overflow-y-auto">
          <div
            class="px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-primary dark:text-white dark:border-gray-800 sticky top-0"
          >
            <player :balance="balance" />
          </div>
          <div class="p-4 w-full">
            <div class="container mx-auto">
              <h3
                class="text-lg md:text-4xl leading-relaxed text-center py-8 font-bold"
                v-html="$t('dashboard.forex.trade.coins_daily')"
              ></h3>
              <div class="">
                <trending-trades-forex />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Player from '~/components/Dashboard/Player.vue'
import TrendingTradesForex from '~/components/Dashboard/Forex/Trade/TrendingTradesForex.vue'
export default {
  components: {
    Player,
    TrendingTradesForex,
  },
  middleware: 'auth',
  name: 'Forex',
  computed: {
    balance() {
      return this.$store.state.balance.balance
    },
  },
}
</script>
