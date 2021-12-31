<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none gap-4">
        <li class="text-center">
          <button
            class="
              tracking-wider
              uppercase
              focus:outline-none
              text-base
              border-b border-transparent
              px-2
              py-4
            "
            @click="toggleTabs(1)"
            :class="{
              'text-gray-500 ': openTab !== 1,
              'text-white  border-money': openTab === 1,
            }"
          >
            Open Orders
          </button>
        </li>
        <li class="text-center">
          <button
            class="
              tracking-wider
              uppercase
              focus:outline-none
              text-base
              border-b border-transparent
              px-2
              py-4
            "
            @click="toggleTabs(2)"
            :class="{
              'text-gray-500 ': openTab !== 2,
              'text-white  border-money': openTab === 2,
            }"
          >
            Closed Order History
          </button>
        </li>
        <li class="text-center">
          <button
            class="
              tracking-wider
              uppercase
              focus:outline-none
              text-base
              border-b border-transparent
              px-2
              py-4
            "
            @click="toggleTabs(3)"
            :class="{
              'text-gray-500 ': openTab !== 3,
              'text-white  border-money': openTab === 3,
            }"
          >
            Deposits
          </button>
        </li>
      </ul>
      <div class="relative flex flex-col break-words w-full">
        <div class="tab-content tab-space">
          <div
            class="px-3 py-3 h-56 overflow-y-auto"
            :class="{ hidden: openTab !== 1, block: openTab === 1 }"
          >
            <div class="flex items-center justify-center">
              <open-order-table
                :orders="openOrders"
                v-if="openOrders.length !== 0"
                @reload-footer="$emit('reload-footer')"
              />
              <div v-else class="h-full">
                <p class="text-lg text-white uppercase">No Open Orders</p>
              </div>
            </div>
          </div>
          <div
            class="px-3 py-3 h-56 overflow-y-auto"
            :class="{ hidden: openTab !== 2, block: openTab === 2 }"
          >
            <div class="flex items-center justify-center">
              <order-table :orders="orders" v-if="orders.length !== 0" />
              <div v-else class="h-full">
                <p class="text-lg text-white uppercase">No Orders</p>
              </div>
            </div>
          </div>
          <div
            class="px-3 py-3 h-56 overflow-y-auto"
            :class="{ hidden: openTab !== 3, block: openTab === 3 }"
          >
            <deposits-table :deposits="deposits" v-if="deposits.length !== 0" />
            <div v-else class="h-full">
              <p class="text-lg text-white uppercase">No Deposits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpenOrderTable from '@/components/Dashboard/Exchange/Trade/OpenOrderTable.vue'
import OrderTable from '@/components/Dashboard/Exchange/Trade/OrderTable.vue'
import DepositsTable from '@/components/Dashboard/Exchange/Trade/DepositsTable.vue'
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