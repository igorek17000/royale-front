<template>
  <div
    class="
      bg-gray-100
      dark:bg-primary dark:text-white
      text-gray-600
      h-full
      md:h-screen
      flex
      overflow-hidden
      text-sm
      mb-20
      md:mb-0
    "
  >
    <Sidebar />
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="flex-grow flex overflow-x-hidden">
        <TradeSidebar title="Exchange" />
        <div class="w-full h-full">
          <trade-header @set-head-meta="setMeta" />
          <div class="trade-table flex">
            <div ref="tradeChart">
              <client-only>
                <trading-table />
              </client-only>
            </div>
            <div>custom data here</div>
          </div>
          <div class="footer-order"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Exchange/Sidebar.vue'
import TradingTable from '~/components/Dashboard/Exchange/Trade/TradingTable.vue'
import TradeSidebar from '~/components/Dashboard/Exchange/Trade/TradeSidebar.vue'
import TradeHeader from '~/components/Dashboard/Exchange/Trade/TradeHeader.vue'

export default {
  components: { Sidebar, TradingTable, TradeSidebar, TradeHeader },
  middleware: 'auth',
  name: 'coin',
  head: {
    title: 'Trade | Casino Royale',
  },
  data() {
    return {}
  },
  methods: {
    setMeta(val) {
      this.$options.head.title = `${val} | ${this.$route.params.coin} | Casino Royale`
      this.$meta().refresh()
    },
  },
  mounted() {
    this.$options.head.title = `${this.$route.params.coin} | Casino Royale`
    this.$meta().refresh()
  },
}
</script>
