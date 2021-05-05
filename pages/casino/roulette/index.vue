<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm"
  >
    <Sidebar>
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-slots' })"
      >
        <SlotIcon class="fill-current h-10" />
      </nuxt-link>
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-roulette' })"
      >
        <roulette class="h-10 fill-current" />
      </nuxt-link>
    </Sidebar>
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="flex-grow flex overflow-x-hidden">
        <casino-sidebar title="Roulete" />
        <div class="flex-grow dark:bg-primary overflow-y-auto">
          <div
            class="sm:px-7 sm:pt-7 px-4 pt-4 hidden md:flex flex-col w-full border-b border-gray-200 bg-white dark:bg-primary dark:text-white dark:border-gray-800 sticky top-0"
          >
            <player />
          </div>
          <div class="sm:p-7 p-4">
            <Horizontal />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Sidebar.vue'
import CasinoSidebar from '../../../components/Dashboard/Casino/CasinoSidebar.vue'
import Player from '../../../components/Dashboard/Player.vue'
import Roulette from '~/components/Icons/Roulette.vue'
import SlotIcon from '~/components/Icons/SlotIcon.vue'
import Horizontal from '~/components/Games/Roulette/Mini/Horizontal.vue'
export default {
  components: {
    Sidebar,
    CasinoSidebar,
    Player,
    Roulette,
    SlotIcon,
    Horizontal,
  },
  middleware: 'auth',
  name: 'Roulete',
}
</script>
