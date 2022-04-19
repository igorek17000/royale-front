<template>
  <div
    class="flex w-full flex-wrap md:flex-nowrap border-gray-500 md:border-b mb-4 md:mb-2"
  >
    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none md:text-gray-400"
    >
      <span class="px-2 md:hidden">
        {{ $t('dashboard.exchange.trade.footer.order.id') }}:</span
      >{{ order.id }}
    </div>
    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden"
        >{{ $t('dashboard.exchange.trade.footer.order.stock') }}:</span
      >
      {{ order.coin }}
    </div>
    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden"
        >{{ $t('dashboard.exchange.trade.footer.order.coin_price') }}:</span
      >
      <vue-numeric
        currency="$"
        separator=","
        read-only
        read-only-class=" flex
        items-center
          w-full"
        :value="order.coin_price"
        :precision="2"
      ></vue-numeric>
    </div>
    <div
      class="p-1 md:p-3 truncate uppercase relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden"
        >{{ $t('dashboard.exchange.trade.footer.order.trade_type') }}:</span
      >
      <span
        :class="[
          order.trade_type === 'sell' ? 'text-pinkMoney' : 'text-greenMoney',
        ]"
      >
        {{ order.trade_type }}
      </span>
    </div>
    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden"
        >{{ $t('dashboard.exchange.trade.footer.order.amount') }}:</span
      >
      <vue-numeric
        currency="$"
        separator=","
        read-only
        read-only-class=" flex
        items-center
          w-full"
        :value="order.amount"
        :precision="2"
      ></vue-numeric>
    </div>
    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden"
        >{{ $t('dashboard.exchange.trade.footer.order.margin') }}:</span
      >
      <vue-numeric
        currency="$"
        separator=","
        read-only
        read-only-class=" flex
        items-center
          w-full"
        :value="order.margin"
        :precision="2"
      ></vue-numeric>
    </div>

    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none md:text-gray-400"
    >
      <span class="px-2 md:hidden"
        >{{ $t('dashboard.exchange.trade.footer.order.date') }}:</span
      >
      {{ formatTime(order.created_at) }}
    </div>

    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
      :class="isPositive ? 'text-greenMoney' : 'text-pinkMoney'"
    >
      <span class="px-2 md:hidden"
        >{{ $t('dashboard.exchange.trade.footer.order.proffit') }}:</span
      >

      <vue-numeric
        v-if="proffit"
        currency="$"
        separator=","
        read-only
        read-only-class=" flex
        items-center
          w-full"
        :value="proffit"
        :precision="2"
      ></vue-numeric>
      <loading v-else />
    </div>
    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden">Action:</span>
      <button
        class="bg-pinkMoney px-2 py-1 rounded-sm focus:outline-none hover:bg-custom-red"
        @click="closeTrade(order)"
        :disabled="isDisabled"
      >
        {{ $t('dashboard.exchange.trade.footer.order.close_trade') }}
      </button>
    </div>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'
import Loading from '@/components/Loading.vue'
export default {
  name: 'OpenOrderTableRow',
  props: ['order'],
  components: {
    VueNumeric,
    Loading,
  },
  data() {
    return {
      isPositive: true,
      ws: null,
      liveCoinPrice: null,
      isDisabled: true,
      yfinace: null,
    }
  },
  mounted() {
    const coin = this.order.coin
    if (coin && this.order.type === 'exchange') {
      this.ws = new WebSocket(
        `wss://stream.binance.com/stream?streams=${coin}@trade`
      )
      let vm = this
      this.ws.addEventListener('message', function (event) {
        let ev = JSON.parse(event.data)
        if (ev.stream === `${coin}@trade`) {
          let price = parseFloat(ev.data.p).toFixed(2)
          vm.liveCoinPrice = price
        }
      })
    } else {
      // this.liveCoinPrice = this.$store.state.trade.coin.price
      if (process.browser) {
        let vm = this
        let coin = this.order.coin
        this.yfinace = new this.$YFinanceLive([coin], vm.coinChange)
      }
    }
  },
  beforeDestroy() {
    // this.$store.commit('trade/SET_COIN_BALANCE', null)
    if (this.ws) {
      this.ws.close()
    }
  },
  watch: {
    proffit: {
      handler: function (val) {
        val > 0 ? (this.isPositive = true) : (this.isPositive = false)
      },
      deep: true,
      immediate: true,
    },
    'order.margin': {
      handler: function (val) {
        this.$store.commit('trade/ADD_MARGIN', val)
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    leverage() {
      return this.$store.state.balance.balance.leverage
    },

    proffit() {
      if (!this.liveCoinPrice) {
        return 0
      } else {
        this.isDisabled = false
      }
      if (this.order.trade_type === 'buy') {
        let diff =
          this.liveCoinPrice - parseFloat(this.order.coin_price).toFixed(2)

        let total =
          parseFloat(this.order.buyLoot).toFixed(2) *
          parseFloat(diff).toFixed(2)

        return parseFloat(total).toFixed(2)
      } else {
        let diff =
          parseFloat(this.order.coin_price).toFixed(2) - this.liveCoinPrice
        let total =
          parseFloat(this.order.buyLoot).toFixed(2) *
          parseFloat(diff).toFixed(2)

        return parseFloat(total).toFixed(2)
      }
    },
  },
  methods: {
    coinChange(data) {
      this.liveCoinPrice = data.price
    },
    async closeTrade(order) {
      let proff = parseFloat(this.proffit).toFixed(2)
      let payload = {
        id: order.id,
        coin_price: order.coinPrice,
        trade_type: order.trade_type,
        amount: order.amount,
        user: this.$auth.user.id,
        coin: order.coin,
        proffit: proff,
        isOpen: false,
      }
      await this.$axios
        .post('/orders/close', payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.isLoading = false
          this.$emit('reload-footer')
          this.$store.commit('REFRESH_BALANCE')
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    formatTime(val) {
      return this.$dayjs(val).format('DD/MM/YYYY - HH:mm')
    },
  },
}
</script>

<style></style>
