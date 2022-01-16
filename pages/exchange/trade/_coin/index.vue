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
          <div class="trade-table block md:flex relative">
            <client-only>
              <trading-table />
            </client-only>
            <div class="w-full md:w-1/5 bg-primary px-4 pt-4">
              <buy-sell @reload-footer="reloadF = !reloadF" />
            </div>
          </div>
          <div class="footer-order w-full md:w-4/5">
            <tabs-wrapper
              :reloadFoot="reloadF"
              @reload-footer="reloadF = !reloadF"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Sidebar from '~/components/Dashboard/Exchange/Sidebar.vue'
import TradingTable from '~/components/Dashboard/Exchange/Trade/TradingTable.vue'
import TradeSidebar from '~/components/Dashboard/Exchange/Trade/TradeSidebar.vue'
import TradeHeader from '~/components/Dashboard/Exchange/Trade/TradeHeader.vue'
import BuySell from '~/components/Dashboard/Exchange/Trade/BuySell.vue'
import TabsWrapper from '~/components/TabsWrapper.vue'

export default {
  components: {
    Sidebar,
    TabsWrapper,
    TradingTable,
    TradeSidebar,
    TradeHeader,
    BuySell,
  },
  middleware: 'auth',
  name: 'coin',
  head: {
    title: 'Trade | Ace Trading Platform',
  },
  data() {
    return {
      coinPrice: null,
      interval: null,
      reloadF: false,
    }
  },
  methods: {
    setMeta(val) {
      this.coinPrice = val
      this.$options.head.title = `${val} | ${this.$route.params.coin} | Ace Trading Platform`
      this.$meta().refresh()
    },
    async getCoinPrice(val) {
      let vm = this
      await axios
        .get(
          `https://api.binance.com/api/v3/avgPrice?symbol=${val.toUpperCase()}`
        )
        .then((res) => {
          let price = parseFloat(res.data.price).toFixed(2)
          vm.$store.commit('trade/SET_COIN_PRICE', price)
        })
        .catch((err) => {
          console.log('err getCoin', err)
        })
    },
  },
  mounted() {
    let coin = this.$route.params.coin
    this.$options.head.title = `${coin} | Ace Trading Platform`
    this.$meta().refresh()
    this.getCoinPrice(coin)
    this.interval = setInterval(() => {
      this.getCoinPrice(coin)
    }, 60000)
  },
  beforeDestroy() {
    this.$store.commit('trade/SET_COIN_PRICE', null)
    clearInterval(this.interval)
  },
}
</script>
