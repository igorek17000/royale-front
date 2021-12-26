<template>
  <div
    class="
      bg-gray-100
      dark:bg-primary dark:text-white
      text-gray-600
      h-full
      md:h-screen
      flex
      overflow-hidden
      text-sm
      mb-20
      md:mb-0
    "
  >
    <Sidebar />

    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <section class="hero-welcome text-center text-gray-200 text-3xl my-4">
        <h2 class="text-lg md:text-xl">
          Welcome {{ this.$auth.user.username }} to Casino Royale
        </h2>
        <h4 class="text-base md:text-lg">
          Select a game that you want to play!
        </h4>
      </section>
      <div class="container mx-auto md:flex">
        <div class="w-full md:w-1/5" v-for="game in gamelist" :key="game.id">
          <game-cards :game="game" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Casino/Sidebar.vue'
import Menu from '~/components/Dashboard/Menu.vue'
import GameCards from '~/components/Dashboard/GameCards.vue'
export default {
  components: { Sidebar, Menu, GameCards },
  middleware: 'auth',
  name: 'Casino',
  data() {
    return {
      baseURL: this.$config.baseURL,
    }
  },
  computed: {
    gamelist() {
      return this.$store.state.casino.gamelist
    },
  },
  async asyncData({ store, $axios }) {
    let response = await $axios.get('/games', {
      params: {
        category: 'casino',
      },
    })
    let gameList = response.data
    await store.commit('casino/SET_GAME_LIST', gameList)
  },
}
</script>
