<template>
  <div class="flex w-full flex-wrap md:flex-nowrap">
    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden">Order ID:</span>{{ order.id }}
    </div>
    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden">Price:</span>{{ order.coin_price }} USD
    </div>
    <div
      class="
        p-1
        md:p-3
        truncate
        uppercase
        relative
        w-1/2
        md:w-1/6
        border
        md:border-none
      "
    >
      <span class="px-2 md:hidden">Trade Type:</span>
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
      <span class="px-2 md:hidden">Amount:</span>
      {{ parseFloat(order.amount).toFixed(2) }}
      USD
    </div>

    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden">Date:</span>
      {{ order.created_at.split('T')[0] }}
    </div>
    <div
      class="uppercase p-1 md:p-3 relative w-1/2 md:w-1/6 border md:border-none"
    >
      <span class="px-2 md:hidden">Proffit:</span>
      {{ proffit }} USD
    </div>
    <div
      class="
        uppercase
        p-1
        md:p-3
        relative
        w-full
        md:w-1/6
        border
        md:border-none
      "
    >
      <span class="px-2 md:hidden">Action:</span>
      <button
        class="
          bg-pinkMoney
          px-2
          py-1
          rounded-sm
          focus:outline-none
          hover:bg-custom-red
        "
        @click="closeTrade(order)"
      >
        Close Trade
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenOrderTableRow',
  props: ['order'],
  computed: {
    proffit() {
      if (this.order.trade_type === 'buy') {
        let diff =
          this.liveCoinPrice - parseFloat(this.order.coin_price).toFixed(2)
        if (diff > 0) {
        }
        let total =
          parseFloat(this.order.amount).toFixed(2) * parseFloat(diff).toFixed(2)

        return parseFloat(total).toFixed(2)
      } else {
        let diff =
          parseFloat(this.order.coin_price).toFixed(2) - this.liveCoinPrice
        let total =
          parseFloat(this.order.amount).toFixed(2) * parseFloat(diff).toFixed(2)

        return parseFloat(total).toFixed(2)
      }
    },
    liveCoinPrice() {
      return this.$store.state.trade.liveCoinPrice
    },
  },
  methods: {
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
  },
}
</script>

<style>
</style>