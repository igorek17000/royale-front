<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none gap-4">
        <li class="text-center">
          <button
            class="tracking-wider uppercase focus:outline-none text-xs md:text-sm border-b border-transparent px-2 py-2"
            @click="toggleTabs(1)"
            :class="{
              'text-gray-500 bg-primary': openTab !== 1,
              'text-white  border-money bg-secondary': openTab === 1,
            }"
          >
            {{ $t('dashboard.exchange.trade.footer.open_orders') }}
          </button>
        </li>
        <li class="text-center">
          <button
            class="tracking-wider uppercase focus:outline-none text-xs md:text-sm border-b border-transparent px-2 py-2"
            @click="toggleTabs(2)"
            :class="{
              'text-gray-500 ': openTab !== 2,
              'text-white  border-money bg-secondary': openTab === 2,
            }"
          >
            {{ $t('dashboard.exchange.trade.footer.orders_history') }}
          </button>
        </li>
        <li class="text-center">
          <button
            class="tracking-wider uppercase focus:outline-none text-xs md:text-sm border-b border-transparent px-2 py-2"
            @click="toggleTabs(3)"
            :class="{
              'text-gray-500 ': openTab !== 3,
              'text-white  border-money bg-secondary': openTab === 3,
            }"
          >
            {{ $t('dashboard.exchange.trade.footer.deposits') }}
          </button>
        </li>
      </ul>
      <div class="relative flex flex-col break-words w-full">
        <div
          class="px-3"
          :class="{
            hidden: openTab !== 1,
            'block bg-secondary': openTab === 1,
          }"
        >
          <div class="h-full flex items-center justify-center">
            <open-order-table
              :orders="openOrders"
              v-if="openOrders.length !== 0"
              @reload-footer="$emit('reload-footer')"
            />
            <div v-else>
              <p class="text-lg text-white uppercase">
                {{ $t('dashboard.exchange.trade.footer.no_open_orders') }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="px-3 h-auto md:h-56 overflow-y-auto"
          :class="{
            hidden: openTab !== 2,
            'block bg-secondary': openTab === 2,
          }"
        >
          <div class="flex items-center justify-center">
            <order-table :orders="orders" v-if="orders.length !== 0" />
            <div v-else class="h-full">
              <p class="text-lg text-white uppercase">
                {{ $t('dashboard.exchange.trade.footer.no_orders') }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="px-3 h-auto md:h-56 overflow-y-auto"
          :class="{
            hidden: openTab !== 3,
            'block bg-secondary': openTab === 3,
          }"
        >
          <deposits-table :deposits="deposits" v-if="deposits.length !== 0" />
          <div v-else class="h-full">
            <p class="text-lg text-white uppercase">
              {{ $t('dashboard.exchange.trade.footer.no_deposits') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpenOrderTable from '~/components/Dashboard/OpenOrderTable.vue'
import OrderTable from '~/components/Dashboard/OrderTable.vue'
import DepositsTable from '~/components/Dashboard/DepositsTable.vue'
export default {
  name: 'TabsWrapper',
  components: { OrderTable, DepositsTable, OpenOrderTable },
  data() {
    return {
      openTab: 1,
      deposits: [],
      orders: [],
      openOrders: [],
      coin: null,
    }
  },
  props: ['reloadFoot'],
  mounted() {
    let coin = this.$route.params.coin
    this.coin = coin.replace('usdt', '')
    this.getOpenOrders()
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    async getDeposits() {
      await this.$axios
        .get('/deposits', {
          params: {
            'user.id': this.$auth.user.id,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.deposits = res.data
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    async getOrders() {
      await this.$axios
        .get('/orders', {
          params: {
            'user.id': this.$auth.user.id,
            isOpen: false,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.orders = res.data
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    async getOpenOrders() {
      this.$store.commit('trade/reset_MARGIN')

      await this.$axios
        .get('/orders', {
          params: {
            'user.id': this.$auth.user.id,
            isOpen: true,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.openOrders = res.data
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
  },
  watch: {
    reloadFoot: function (val) {
      if (this.openTab === 1) {
        this.getOpenOrders()
      }
    },
    openTab: {
      handler(val) {
        if (val === 1) {
          this.getOpenOrders()
        }
        if (val === 2) {
          this.getOrders()
        }
        if (val === 3) {
          this.getDeposits()
        }
      },
    },
  },
}
</script>
<style scoped>
@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
