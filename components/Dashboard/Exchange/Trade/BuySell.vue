<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul
        class="
          flex
          list-none
          justify-between
          border border-gray-800
          rounded-md
          p-2
        "
      >
        <li class="text-center w-full flex">
          <button
            class="
              font-bold
              uppercase
              rounded
              block
              leading-normal
              w-full
              focus:outline-none
            "
            @click="toggleTabs(1)"
            :class="{
              'text-gray-500': openTab !== 1,
              'text-white bg-pink-600': openTab === 1,
            }"
          >
            Sell
          </button>
        </li>
        <li class="text-center w-full flex h-10">
          <button
            class="
              font-bold
              uppercase
              rounded
              block
              leading-normal
              w-full
              focus:outline-none
            "
            @click="toggleTabs(2)"
            :class="{
              'text-gray-500': openTab !== 2,
              'text-black bg-money': openTab === 2,
            }"
          >
            Buy
          </button>
        </li>
      </ul>
      <div class="relative w-full">
        <div class="tab-content tab-space">
          <div
            :class="{ hidden: openTab !== 1, block: openTab === 1 }"
            class="py-4"
          >
            <div class="sell buttons">
              <div class="mt-4 relative rounded-sm">
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
                  v-model="coinPrice"
                  disabled
                />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label class="py-0 pl-2 pr-3 text-white pointer-events-none"
                    >USD</label
                  >
                </div>
              </div>
              <div class="mt-4 relative rounded-sm">
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
                  v-model="coinSellAmount"
                />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label
                    class="
                      py-0
                      pl-2
                      pr-3
                      text-white
                      pointer-events-none
                      uppercase
                    "
                    >{{ coin }}</label
                  >
                </div>
              </div>
              <hr class="border-2 my-6 border-gray-800" />
              <div class="mt-4 relative rounded-sm">
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
                  <span class="text-gray-500 sm:text-sm">Total</span>
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
                  v-model="totalSellAmount"
                  disabled
                />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label
                    class="
                      py-0
                      pl-2
                      pr-3
                      text-white
                      pointer-events-none
                      uppercase
                    "
                    >usd</label
                  >
                </div>
              </div>
              <hr class="border-2 my-6 border-gray-800" />
              <div class="loot text-center mb-2">
                <p>Loot : {{ sellLoot }}%</p>
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
                  v-model="sellLoot"
                  min="0"
                  max="100"
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
            </div>
          </div>
          <div
            :class="{ hidden: openTab !== 2, block: openTab === 2 }"
            class="py-4"
          >
            <div class="buy buttons">
              <div class="mt-4 relative rounded-sm">
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
                  v-model="coinPrice"
                  disabled
                />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label class="py-0 pl-2 pr-3 text-white pointer-events-none"
                    >USD</label
                  >
                </div>
              </div>
              <div class="mt-4 relative rounded-sm">
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
                  v-model="coinBuyAmount"
                  disabled
                />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label
                    class="
                      py-0
                      pl-2
                      pr-3
                      text-white
                      pointer-events-none
                      uppercase
                    "
                    >{{ coin }}</label
                  >
                </div>
              </div>
              <hr class="border-2 my-6 border-gray-800" />
              <div class="mt-4 relative rounded-sm">
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
                  <span class="text-gray-500 sm:text-sm">Total</span>
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
                  v-model="totalBuyAmount"
                />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label
                    class="
                      py-0
                      pl-2
                      pr-3
                      text-white
                      pointer-events-none
                      uppercase
                    "
                    >usd</label
                  >
                </div>
              </div>
              <hr class="border-2 my-6 border-gray-800" />
              <div class="loot text-center mb-2">
                <p>Loot : {{ buyLoot }}%</p>
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
                  min="0"
                  max="100"
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
                  text-black
                  bg-greenMoney
                  hover:bg-money
                  transition
                  ease-in-out
                  duration-150
                  focus:outline-none
                "
                @click="sendBuy"
                :disabled="isBuyDisabled"
              >
                <loading v-if="isLoading" />
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
export default {
  name: 'BuySell',
  components: { Loading },
  data() {
    return {
      isLoading: false,
      isDisabled: true,
      isBuyDisabled: true,
      openTab: 2,
      coin: null,
      coinSellAmount: null,
      totalBuyAmount: null,
      buyLoot: 0,
      sellLoot: 0,
    }
  },
  computed: {
    coinPrice() {
      return this.$store.state.trade.coinPrice
    },
    balance() {
      return this.$store.state.balance.balance.actual_balance
    },
    coinBalance() {
      return this.$store.state.trade.coinBalance
    },
    coinBuyAmount() {
      if (!this.totalBuyAmount) return 0
      let total =
        parseFloat(this.totalBuyAmount).toFixed(6) / parseFloat(this.coinPrice)
      return parseFloat(total).toFixed(6)
    },
    totalSellAmount() {
      if (!this.coinBalance) return 0
      let total =
        parseFloat(this.coinSellAmount).toFixed(4) * parseFloat(this.coinPrice)
      return parseFloat(total).toFixed(4)
    },
  },
  watch: {
    totalBuyAmount: function (val) {
      if (val < 0) {
        this.totalBuyAmount = 0
      } else if (val === 0) {
        this.isBuyDisabled = true
      } else {
        if (val > this.balance) {
          this.totalBuyAmount = this.balance
        } else {
          // let total = val * this.coinPrice
          this.isBuyDisabled = false
          // this.coinBuyAmount = parseFloat(total).toFixed(2)
        }
      }
    },
    coinSellAmount: function (val) {
      if (val < 0) {
        this.totalSellAmount = 0
        this.isDisabled = true
      } else {
        if (val > this.coinBalance) {
          this.coinSellAmount = this.coinBalance
        }
        this.isDisabled = false
      }
    },
    buyLoot: function (val) {
      let perc = parseInt(val) / 100
      this.totalBuyAmount =
        parseFloat(this.balance).toFixed(4) * parseFloat(perc).toFixed(4)
    },
    sellLoot: function (val) {
      let perc = parseInt(val) / 100
      this.coinSellAmount =
        parseFloat(this.coinBalance).toFixed(4) * parseFloat(perc).toFixed(4)
    },
  },
  mounted() {
    let coin = this.$route.params.coin
    this.coin = coin.replace('usdt', '')
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    async sendSell() {
      this.isLoading = true
      let payload = {
        coin_price: this.coinPrice,
        trade_type: 'sell',
        amount: this.coinSellAmount,
        amount_coin: this.coin,
        return_amount: this.totalSellAmount,
        return_coin: 'USDT',
        user: this.$auth.user.id,
        coin: this.coin,
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
          this.$store.commit('REFRESH_BALANCE')
          this.$store.commit('trade/REFRESH_COIN')
          this.totalSellAmount = null
          this.coinSellAmount = null
          this.sellLoot = 0
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    async sendBuy() {
      this.isLoading = true
      let payload = {
        coin_price: this.coinPrice,
        trade_type: 'buy',
        amount: this.totalBuyAmount,
        amount_coin: 'USDT',
        return_amount: this.coinBuyAmount,
        return_coin: this.coin,
        user: this.$auth.user.id,
        coin: this.coin,
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
          this.$store.commit('REFRESH_BALANCE')
          this.$store.commit('trade/REFRESH_COIN')
          this.totalBuyAmount = null
          this.coinBuyAmount = null
          this.buyLoot = 0
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
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