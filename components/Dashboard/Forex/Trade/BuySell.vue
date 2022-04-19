<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul
        class="flex list-none justify-between border border-gray-800 rounded-md p-2"
      >
        <li class="text-center w-full flex">
          <button
            class="font-bold uppercase rounded block leading-normal w-full focus:outline-none"
            @click="toggleTabs(1)"
            :class="{
              'text-gray-500': openTab !== 1,
              'text-white bg-pink-600': openTab === 1,
            }"
          >
            {{ $t('dashboard.exchange.trade.buysell.sell') }}
          </button>
        </li>
        <li class="text-center w-full flex h-10">
          <button
            class="font-bold uppercase rounded block leading-normal w-full focus:outline-none"
            @click="toggleTabs(2)"
            :class="{
              'text-gray-500': openTab !== 2,
              'text-black bg-money': openTab === 2,
            }"
          >
            {{ $t('dashboard.exchange.trade.buysell.buy') }}
          </button>
        </li>
      </ul>
      <div class="relative w-full">
        <div class="tab-content tab-space">
          <div
            :class="{ hidden: openTab !== 1, block: openTab === 1 }"
            class="pt-4"
          >
            <Sell
              :coin="coin"
              @reload-footer="$emit('reload-footer')"
              v-if="openTab === 1"
            />
          </div>
          <div
            :class="{ hidden: openTab !== 2, block: openTab === 2 }"
            class="pt-4"
          >
            <Buy
              :coin="coin"
              @reload-footer="$emit('reload-footer')"
              v-if="openTab === 2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Sell from './Sell.vue'
import Buy from './Buy.vue'
export default {
  name: 'BuySell',
  components: { Loading, Sell, Buy },
  data() {
    return {
      isLoading: false,
      isDisabled: true,
      isBuyDisabled: true,
      openTab: 2,
      coin: null,
    }
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
  },
}
</script>
<style scoped></style>
