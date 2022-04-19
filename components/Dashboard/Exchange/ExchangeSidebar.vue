<template>
  <div
    class="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5"
  >
    <div class="text-xs text-gray-400 tracking-wider uppercase">
      {{ title }}
    </div>
    <div class="relative mt-2">
      <input
        v-model="searchInput"
        type="text"
        class="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
        placeholder="Search"
      />
      <svg
        viewBox="0 0 24 24"
        class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
    <div class="space-y-4 mt-3">
      <!-- <game-list /> -->
      <button
        class="p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow-lg relative hover:ring-2 hover:ring-custom-red focus:outline-none"
        v-for="game in filteredGames"
        :key="game.id"
      >
        <div
          class="flex flex-col font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full"
        >
          <div class="h-32 w-full mb-3">
            <img
              v-if="game.attributes.cover.data.attributes.formats.small.url"
              :src="
                baseURL +
                game.attributes.cover.data.attributes.formats.small.url
              "
              class="h-full w-full object-cover"
              :alt="game.attributes.title"
            />
          </div>
          <p class="text-lg font-bold text-gray-300">
            {{ game.attributes.title }}
          </p>
        </div>
        <div class="flex justify-between mt-2">
          <div
            class="px-2 py-1 rounded-sm text-sm font-bold bg-yellow-500 text-white w-auto"
          >
            $ {{ game.attributes.min_bet }}
          </div>
          <div
            class="px-2 py-1 rounded-sm text-sm font-bold bg-green-600 text-white w-auto"
          >
            $ {{ game.attributes.max_bet }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
// import GameList from './GameList.vue'
export default {
  // components: { GameList },
  name: 'PokerSidebar',
  data() {
    return {
      baseURL: this.$config.baseURL,
      searchInput: '',
    }
  },
  computed: {
    gamelist() {
      return this.$store.state.poker.gamelist
    },
    filteredGames() {
      let games = this.gamelist.filter((game) => {
        return (
          game.attributes.title
            .toLowerCase()
            .indexOf(this.searchInput.toLowerCase()) != -1
        )
      })
      return games
    },
  },
  methods: {},
  props: ['title'],
}
</script>

<style></style>
