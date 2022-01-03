<template>
  <div class="sell buttons">
    <div class="mt-4 relative rounded-sm border border-pinkBorder mb-4">
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
      <input
        type="number"
        class="
          block
          w-full
          pl-7
          pr-14
          border-gray-300
          rounded-sm
          bg-secondary
          h-11
          custom-input
          hover:border-custom-red
        "
        v-model="liveCoinPrice"
        disabled
      />
      <div class="absolute inset-y-0 right-0 flex items-center">
        <label class="py-0 pl-2 pr-3 text-white pointer-events-none">USD</label>
      </div>
    </div>
    <!-- <div class="mt-4 relative rounded-sm mb-4 border border-pinkBorder">
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
        <span class="text-gray-500 sm:text-sm">Amount</span>
      </div>
      <input
        type="number"
        class="
          block
          w-full
          pl-7
          pr-14
          border-gray-300
          rounded-sm
          bg-secondary
          h-11
          custom-input
          hover:border-custom-red
        "
        min="0"
        step="0.0001"
        v-model="coinSellAmount"
      />
      <div class="absolute inset-y-0 right-0 flex items-center">
        <label
          class="py-0 pl-2 pr-3 text-white pointer-events-none uppercase"
          >{{ coin }}</label
        >
      </div>
    </div> -->

    <div class="loot text-center mb-4">
      <p>
        Loot :
        <input
          type="number"
          min="0"
          step="0.01"
          class="bg-transparent w-12"
          v-model="buyLoot"
        />
      </p>
      <input
        type="range"
        class="
          form-range
          appearance-none
          w-full
          h-1
          my-2
          bg-secondary
          focus:outline-none focus:ring-0 focus:shadow-none
        "
        v-model="buyLoot"
        step="0.01"
        min="0"
        max="1"
      />
    </div>
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
        text-white
        bg-pink-600
        hover:bg-pink-800
        transition
        ease-in-out
        duration-150
        focus:outline-none
      "
      @click="sendSell"
      :disabled="isDisabled"
    >
      <loading v-if="isLoading" />
      Sell
    </button>
    <hr class="border-2 my-6 border-gray-800" />
    <!-- <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">Available balance:</div>
      <div class="uppercase">
        {{ parseFloat(coinBalance).toFixed(6) }} {{ coin }}
      </div>
    </div> -->
    <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">Available balance:</div>
      <div class="uppercase">{{ parseFloat(balance).toFixed(2) }} USD</div>
    </div>
    <!-- <div class="mt-4 relative rounded-sm flex justify-between items-center">
      <div class="text-xs">Vol:</div>
      <div class="uppercase">≈ {{ totalSellAmount }} USD</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Sell',
  props: ['coin'],
  data() {
    return {
      isDisabled: true,
      isLoading: false,
      buyLoot: 0,
      totalSellAmount: 0,
    }
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
  },
  watch: {
    totalSellAmount: function (val) {
      if (val < 0.0) {
        this.totalSellAmount = 0
      } else if (val === 0) {
        this.isDisabled = true
      } else {
        if (val > this.balance) {
          this.totalSellAmount = this.balance
        } else {
          this.isDisabled = false
        }
      }
    },
    buyLoot: {
      handler: function (val) {
        this.totalSellAmount =
          parseFloat(this.balance).toFixed(2) * parseFloat(val)
        if (process.client) {
          localStorage.setItem('buyLoot', val)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async sendSell() {
      this.isLoading = true
      let payload = {
        coin_price: this.liveCoinPrice,
        trade_type: 'sell',
        amount: this.totalSellAmount,
        user: this.$auth.user.id,
        coin: this.coin,
        isOpen: true,
        buyLoot: this.buyLoot,
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
          this.buyLoot = 0
          this.buyLoot = res.data.buyLoot
          localStorage.setItem('buyLoot', this.buyLoot)
          console.log('🚀 ~ .then ~ this.buyLoot', this.buyLoot)
          this.totalSellAmount = null
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
  },
  mounted() {
    if (process.client) {
      let buyLoot = localStorage.getItem('buyLoot')
      if (buyLoot) {
        this.buyLoot = buyLoot
      } else {
        localStorage.setItem('buyLoot', this.buyLoot)
      }
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