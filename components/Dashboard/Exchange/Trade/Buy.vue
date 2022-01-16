<template>
  <div class="buy buttons">
    <div class="mt-4 relative rounded-sm border border-greenBorder mb-4">
      <div
        class="
          absolute
          inset-y-0
          left-0
          pl-3
          flex
          items-center
          pointer-events-none
        "
      >
        <span class="text-gray-500 sm:text-sm">Price</span>
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
      <p>Loot :</p>
    </div>
    <number-input
      @lot-value="updateLotValue"
      :nrValue="buyLoot"
      :isbuy="true"
      :maxLot="maxLot"
    />

    <button
      class="
        flex
        items-center
        justify-center
        px-4
        py-2
        w-full
        text-base
        font-bold
        uppercase
        rounded-md
        text-black
        bg-greenMoney
        hover:bg-money
        transition
        ease-in-out
        duration-150
        focus:outline-none
        mb-4
      "
      @click="sendBuy"
      :disabled="isBuyDisabled"
    >
      <loading v-if="isLoading" />
      Buy
    </button>
    <hr class="border-2 my-6 border-gray-800" />
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">Lot Value:</div>
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
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
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
    </div>
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">Max Lot:</div>
      <div class="uppercase">
        <p class="px-4" v-if="liveCoinPrice">
          {{ parseFloat(maxLot).toFixed(2) }}
        </p>
      </div>
    </div>
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">Max Volume:</div>
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
      <div class="text-xs">Used Margin:</div>
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
      </div>
    </div>
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">Free Margin:</div>
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
      buyLoot: null,
      totalBuyAmount: 0,
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
        if (val > 0.0) {
          this.isBuyDisabled = false
        }
        this.totalBuyAmount =
          parseFloat(this.liveCoinPrice).toFixed(2) * parseFloat(val)
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
      let marginData = this.totalBuyAmount / this.leverage
      let payload = {
        coin_price: this.liveCoinPrice,
        trade_type: 'buy',
        amount: this.totalBuyAmount,
        user: this.$auth.user.id,
        coin: this.coinName,
        isOpen: true,
        buyLoot: this.buyLoot,
        margin: marginData,
        leverage: this.leverage,
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
          this.totalBuyAmount = null
        })
        .catch((err) => {
          console.log('err', err)
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