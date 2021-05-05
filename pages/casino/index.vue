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
          <game-cards
            :title="game.title"
            :image="baseURL + game.image.formats.medium.url"
            :desc="game.desc"
            :category="game.category"
            :url="game.url"
            :min_bet="game.min_bet"
            :max_bet="game.max_bet"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Sidebar.vue'
import Menu from '~/components/Dashboard/Menu.vue'
import GameCards from '~/components/Dashboard/Casino/GameCards.vue'
import Roulette from '~/components/Icons/Roulette.vue'
import SlotIcon from '~/components/Icons/SlotIcon.vue'
export default {
  components: { Sidebar, Menu, GameCards, SlotIcon, Roulette },
  middleware: 'auth',
  name: 'Casino',
  data() {
    return {
      baseURL: 'http://localhost:1337',
    }
  },
  computed: {
    gamelist() {
      return this.$store.state.casino.gamelist
    },
  },
  async asyncData({ store, $axios }) {
    let response = await $axios.get('/games')
    let gameList = response.data
    await store.commit('casino/SET_GAME_LIST', gameList)
  },
}
</script>
