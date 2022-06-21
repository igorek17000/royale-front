<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-full md:h-screen flex overflow-hidden text-sm mb-20 md:mb-0">
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="flex-grow flex overflow-x-hidden">
        <TradeSidebar title="Forex" />
        <div class="w-full h-full">
          <div class="market w-full bg-custom-redh bg-opacity-50 text-center px-4 py-2" v-if="marketOpen">
            <p class="text-lg uppercase">Market is closed !</p>
          </div>
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
            <tabs-wrapper :reloadFoot="reloadF" @reload-footer="reloadF = !reloadF" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TradingTable from '~/components/Dashboard/Forex/Trade/TradingTable.vue'
import TradeSidebar from '~/components/Dashboard/Forex/Trade/TradeSidebar.vue'
import TradeHeader from '~/components/Dashboard/Forex/Trade/TradeHeader.vue'
import BuySell from '~/components/Dashboard/Forex/Trade/BuySell.vue'
import TabsWrapper from '~/components/TabsWrapper.vue'
export default {
  components: {
    TabsWrapper,
    TradingTable,
    TradeSidebar,
    TradeHeader,
    BuySell,
  },
  middleware: 'auth',
  name: 'coin',
  head: {
    title: 'Forex | Royale Trader Platform',
  },
  data() {
    return {
      coinPrice: null,
      interval: null,
      reloadF: false,
      ws: null,
      yfinace: null,
      marketOpen: false,
    }
  },
  methods: {
    setMeta(val) {
      this.coinPrice = val
      this.$options.head.title = `${val} | ${this.$route.params.coin} | Royale Trader Platform`
      this.$meta().refresh()
    },
    coinChange(data) {
      if (data) {
        let payload = {
          price: data.price,
          change: data.change,
          changePercent: data.changePercent,
          timestamp: data.time,
        }
        this.$store.commit('trade/SET_COIN', payload)
      }
    },
    async getCoinMeta(coin) {
      try {
        let payload = {
          symbol: coin,
        }
        const { data } = await this.$axios.post('/finance/quote', payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        const { price } = data

        if (price.marketState === 'CLOSED') this.marketOpen = true

        let coinSet = {
          symbol: price.symbol,
          price: price.regularMarketPrice,
          change: price.regularMarketChange,
          changePercent: price.regularMarketChangePercent,
          marketCap: price.marketCap,
          volume: price.volume,
          high: price.regularMarketDayHigh,
          low: price.regularMarketDayLow,
          open: price.regularMarketOpen,
          close: price.regularMarketPreviousClose,
          name: price.shortName,
          marketState: price.marketState,
        }
        this.$store.commit('trade/SET_COIN', coinSet)
        this.$store.commit('trade/SET_COIN_META', coinSet)
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    let coin = this.$route.params.coin
    this.$options.head.title = `${coin} | Royale Trader Platform`
    this.$meta().refresh()
    this.getCoinMeta(coin)
    let vm = this
    if (process.browser) {
      this.yfinace = new this.$YFinanceLive([coin], vm.coinChange)
    }
  },
  beforeDestroy() {
    this.$store.commit('trade/SET_COIN_PRICE', null)
    this.yfinace.stop()
  },
}
</script>
