<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-full md:h-screen flex overflow-hidden text-sm mb-20 md:mb-0"
  >
    <Sidebar />
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="flex-grow flex overflow-x-hidden">
        <TradeSidebar title="Crypto" />
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
import Sidebar from '~/components/Dashboard/Forex/Sidebar.vue'
import TradingTable from '~/components/Dashboard/Forex/Trade/TradingTable.vue'
import TradeSidebar from '~/components/Dashboard/Forex/Trade/TradeSidebar.vue'
import TradeHeader from '~/components/Dashboard/Forex/Trade/TradeHeader.vue'
import BuySell from '~/components/Dashboard/Forex/Trade/BuySell.vue'
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
    title: 'Forex | Ace Trading Platform',
  },
  data() {
    return {
      coinPrice: null,
      interval: null,
      reloadF: false,
      ws: null,
    }
  },
  methods: {
    setMeta(val) {
      this.coinPrice = val
      this.$options.head.title = `${val} | ${this.$route.params.coin} | Ace Trading Platform`
      this.$meta().refresh()
    },
  },
  mounted() {
    let coin = this.$route.params.coin
    console.log('🚀 ~ mounted ~ coin', coin)
    this.$options.head.title = `${coin} | Ace Trading Platform`
    this.$meta().refresh()

    // const root = protobuf.loadSync('./YPricingData.proto')
    // this.ws = new WebSocket(`wss://streamer.finance.yahoo.com`)
    // let vm = this
    // this.ws.addEventListener('open', (event) => {
    //   console.log('connected socket')
    //   vm.ws.send(
    //     JSON.stringify({
    //       subscribe: ['MSFT'],
    //     })
    //   )
    // })
    // this.ws.addEventListener('message', function (event) {
    //   console.log('event', event.data)
    // })
  },
  beforeDestroy() {
    this.$store.commit('trade/SET_COIN_PRICE', null)
  },
}
</script>
