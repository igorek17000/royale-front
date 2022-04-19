<template>
  <div class="buy buttons">
    <div class="mt-4 relative rounded-sm border border-greenBorder mb-4">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <span class="text-gray-500 sm:text-sm">
          {{ $t('dashboard.exchange.trade.buysell.price') }}</span
        >
      </div>

      <vue-numeric
        currency="$"
        separator=","
        read-only
        read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4
          border-gray-300
          rounded-sm
          bg-secondary
          h-11
          custom-input
          hover:border-custom-red"
        :value="price"
        :precision="4"
        class=""
      ></vue-numeric>
    </div>

    <div class="loot mb-4">
      <p>{{ $t('dashboard.exchange.trade.buysell.leverage') }}</p>
    </div>
    <number-input
      @lot-value="updateLotValue"
      :nrValue="buyLoot"
      :isbuy="true"
      :maxLot="maxLot"
    />

    <button
      class="flex items-center justify-center px-4 py-2 w-full text-base font-bold uppercase rounded-md text-black bg-greenMoney hover:bg-money transition ease-in-out duration-150 focus:outline-none mb-4"
      @click="sendBuy"
      :disabled="isBuyDisabled"
    >
      <loading v-if="isLoading" />
      {{ $t('dashboard.exchange.trade.buysell.buy') }}
    </button>
    <hr class="border-2 my-6 border-gray-800" />
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">
        {{ $t('dashboard.exchange.trade.buysell.lot_value') }}
      </div>
      <div class="uppercase">
        <vue-numeric
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="price"
          :precision="2"
          class=""
        ></vue-numeric>
      </div>
    </div>
    <!-- <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">Leverage Value:</div>
      <div class="uppercase">
        <vue-numeric
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="leverage"
          :precision="2"
          class=""
        ></vue-numeric>
      </div>
    </div> -->
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">
        {{ $t('dashboard.exchange.trade.buysell.max_lot') }}
      </div>
      <div class="uppercase">
        <p class="px-4" v-if="price">
          {{ parseFloat(maxLot).toFixed(2) }}
        </p>
      </div>
    </div>
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">
        {{ $t('dashboard.exchange.trade.buysell.max_volume') }}
      </div>
      <div class="uppercase">
        <vue-numeric
          v-if="maxVolume"
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="maxVolume"
          :precision="2"
          class=""
        ></vue-numeric>
      </div>
    </div>
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">
        {{ $t('dashboard.exchange.trade.buysell.used_margin') }}
      </div>
      <div class="uppercase">
        <vue-numeric
          v-if="totalMargin"
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="totalMargin"
          :precision="2"
          class=""
        ></vue-numeric>
        <p v-else class="font-roboto px-4">0</p>
      </div>
    </div>
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">
        {{ $t('dashboard.exchange.trade.buysell.free_margin') }}
      </div>
      <div class="uppercase">
        <vue-numeric
          v-if="freeMargin"
          currency="$"
          separator=","
          read-only
          read-only-class=" flex
        items-center
          w-full
          pl-4
          pr-4"
          :value="freeMargin"
          :precision="2"
          class=""
        ></vue-numeric>
      </div>
    </div>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'
import NumberInput from '~/components/NumberInput.vue'
export default {
  name: 'Buy',
  props: ['coin'],
  data() {
    return {
      isBuyDisabled: true,
      isLoading: false,
      buyLoot: 0,
      coinName: null,
    }
  },
  components: {
    VueNumeric,
    NumberInput,
  },
  computed: {
    coinPrice() {
      return this.$store.state.trade.coinPrice
    },
    balance() {
      return this.$store.state.balance.balance.actual_balance
    },
    price() {
      return this.$store.state.trade.coin.price
    },
    leverage() {
      return this.$store.state.balance.balance.leverage
    },
    maxVolume() {
      return this.leverage * this.freeMargin
    },
    maxLot() {
      let totalLot = this.maxVolume / this.price
      return totalLot
    },
    totalMargin() {
      return this.$store.state.trade.totalMargin
    },
    freeMargin() {
      return this.balance - this.totalMargin
    },
  },
  watch: {
    buyLoot: {
      handler: function (val) {
        if (val > 0.0 && this.freeMargin > 1) {
          this.isBuyDisabled = false
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateLotValue(val) {
      this.buyLoot = val
    },
    async sendBuy() {
      if (!this.buyLoot) return
      this.isLoading = true
      let payload = {
        coin_price: this.price,
        trade_type: 'buy',
        user: this.$auth.user.id,
        coin: this.coinName,
        isOpen: true,
        buyLoot: this.buyLoot,
        leverage: this.leverage,
        type: 'forex',
      }
      await this.$axios
        .post('/orders/new', payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.isLoading = false
          this.$emit('reload-footer')
          // this.$store.commit('REFRESH_BALANCE')
          this.buyLoot = res.data.buyLoot
          if (process.client) {
            localStorage.setItem('buyLoot', this.buyLoot)
          }
          this.$toasted.show(
            `${this.$t('dashboard.exchange.trade.buysell.order_saved')} ${
              res.data.id
            }`,
            {
              type: 'success',
              position: 'bottom-right',
              duration: 2500,
            }
          )
        })
        .catch((err) => {
          console.log('err', err)
          this.$toasted.show(
            `${this.$t('dashboard.exchange.trade.buysell.order_error')}`,
            {
              type: 'error',
              position: 'bottom-right',
              duration: 2500,
            }
          )
        })
    },
  },
  mounted() {
    this.coinName = this.$route.params.coin
    if (process.client) {
      let buyLoot = localStorage.getItem('buyLoot')
      this.buyLoot = parseFloat(buyLoot)
    }
  },
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.custom-input {
  direction: rtl;
}
</style>
