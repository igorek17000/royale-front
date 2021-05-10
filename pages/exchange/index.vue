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
      <section
        class="hero-welcome text-center text-gray-200 text-3xl my-4"
      ></section>
      <div class="container mx-auto md:flex"></div>
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
