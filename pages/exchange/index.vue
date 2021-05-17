<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-full md:h-screen flex overflow-hidden text-sm mb-20 md:mb-0"
  >
    <Sidebar>
      <nuxt-link
        class="w-12 dark:text-gray-500 flex flex-col items-center justify-center"
        :to="localePath({ name: 'casino-slots' })"
      >
        <SlotIcon class="fill-current h-10" />
        <span class="text-xs text-gray-500">Slots</span>
      </nuxt-link>
      <nuxt-link
        class="w-12 dark:text-gray-500 flex flex-col items-center justify-center"
        :to="localePath({ name: 'casino-roulette' })"
      >
        <roulette class="h-10 fill-current" />
        <span class="text-xs text-gray-500">Roulette</span>
      </nuxt-link>
    </Sidebar>
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="container mx-auto md:flex">
        <trading-vue :data="tradingVue"></trading-vue>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Sidebar.vue'
import Menu from '~/components/Dashboard/Menu.vue'
import Roulette from '~/components/Icons/Roulette.vue'
import SlotIcon from '~/components/Icons/SlotIcon.vue'
export default {
  components: { Sidebar, Menu, SlotIcon, Roulette },
  middleware: 'auth',
  name: 'Casino',
  data() {
    return {
      baseURL: this.$config.baseURL,
      tradingVue: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: 'Candles',
              data: [
                [1551128400000, 33, 37.1, 14, 14, 196],
                [1551132000000, 13.7, 30, 6.6, 30, 206],
                [1551135600000, 29.9, 33, 21.3, 21.8, 74],
                [1551139200000, 21.7, 25.9, 18, 24, 140],
                [1551142800000, 24.1, 24.1, 24, 24.1, 29],
              ],
            },
            onchart: [
              {
                name: 'Setups',
                type: 'Setups',
                data: [[1551128400000, 1, 35]],
                settings: {},
              },
            ],
          })
        : {},
    }
  },
  computed: {},
  async asyncData({ store, $axios }) {
    let response = await $axios.get('/games')
    let gameList = response.data
    await store.commit('casino/SET_GAME_LIST', gameList)
  },
}
</script>
