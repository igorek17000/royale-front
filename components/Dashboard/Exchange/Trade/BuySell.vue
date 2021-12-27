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
                  v-model="coinBuyAmount"
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
          <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
            <p>
              Completely synergize resource taxing relationships via premier
              niche markets. Professionally cultivate one-to-one customer
              service with robust ideas.
              <br />
              <br />
              Dynamically innovate resource-leveling customer service for state
              of the art customer service.
            </p>
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
      openTab: 1,
      coin: null,
      coinBuyAmount: null,
      totalBuyAmount: null,
    }
  },
  computed: {
    coinPrice() {
      return this.$store.state.trade.coinPrice
    },
    balance() {
      return this.$store.state.balance.balance.actual_balance
    },
  },
  watch: {
    coinBuyAmount: function (val) {
      if (val < 0) {
        this.coinBuyAmount = 0
      } else {
        let total = this.coinPrice * val
        this.isDisabled = false
        console.log('balance', this.balance)
        if (total > this.balance) {
          this.totalBuyAmount = this.balance
          let total = this.totalBuyAmount / this.coinPrice
          this.coinBuyAmount = parseFloat(total)
        } else {
          this.totalBuyAmount = parseFloat(total)
        }
      }
    },
    totalBuyAmount: function (val) {
      if (val < 0) {
        this.totalBuyAmount = 0
      } else {
        if (val > this.balance) {
          this.coinBuyAmount = this.balance
        } else {
          let total = val / this.coinPrice
          this.coinBuyAmount = parseFloat(total)
        }
      }
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
    sendSell() {
      this.isLoading = true
      console.log('sell sent')
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