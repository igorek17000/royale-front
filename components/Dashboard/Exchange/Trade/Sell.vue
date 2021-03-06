<template>
  <div class="sell buttons">
    <div class="mt-4 relative rounded-sm border border-pinkBorder mb-4">
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
        :value="liveCoinPrice"
        :precision="2"
        class=""
      ></vue-numeric>
    </div>

    <div class="loot mb-4">
      <p>{{ $t('dashboard.exchange.trade.buysell.leverage') }}</p>
    </div>
    <number-input
      @lot-value="updateLotValue"
      :nrValue.sync="buyLoot"
      :isbuy="false"
    />
    <button
      class="flex items-center justify-center px-4 py-2 w-full text-base font-bold uppercase rounded-md text-white bg-pink-600 hover:bg-pink-800 transition ease-in-out duration-150 focus:outline-none"
      @click="sendSell"
      :disabled="isDisabled"
    >
      <loading v-if="isLoading" />
      {{ $t('dashboard.exchange.trade.buysell.sell') }}
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
          :value="liveCoinPrice"
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
        <p class="px-4" v-if="liveCoinPrice">
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
  name: 'Sell',
  props: ['coin'],
  data() {
    return {
      isDisabled: true,
      isLoading: false,
      buyLoot: null,
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
    liveCoinPrice() {
      return this.$store.state.trade.liveCoinPrice
    },
    leverage() {
      return this.$store.state.balance.balance.leverage
    },
    maxVolume() {
      return this.leverage * this.freeMargin
    },
    maxLot() {
      let totalLot = this.maxVolume / this.liveCoinPrice
      return parseFloat(totalLot).toFixed(2)
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
          this.isDisabled = false
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
    async sendSell() {
      if (!this.buyLoot) return
      this.isLoading = true
      let payload = {
        coin_price: this.liveCoinPrice,
        trade_type: 'sell',
        user: this.$auth.user.id,
        coin: this.coinName,
        isOpen: true,
        buyLoot: this.buyLoot,
        leverage: this.leverage,
        type: 'exchange',
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
            ` ${this.$t('dashboard.exchange.trade.buysell.order_error')}`,
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
      console.log('🚀 ~ mounted ~ this.buyLoot', this.buyLoot)
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
