<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm"
  >
    <Sidebar />

    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="flex-grow flex overflow-x-hidden">
        <casino-sidebar title="Slots" />
        <div class="flex-grow dark:bg-primary overflow-y-auto">
          <div
            class="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-primary dark:text-white dark:border-gray-800 sticky top-0"
          >
            <player />
          </div>
          <div class="sm:p-7 p-4">
            <client-only placeholder="loading">
              <!-- <fruits /> -->
              fruits game here
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Casino/Sidebar.vue'
import CasinoSidebar from '~/components/Dashboard/Casino/CasinoSidebar.vue'
import Player from '~/components/Dashboard/Player.vue'
import Fruits from '~/components/Games/Slots/Fruits.vue'

export default {
  components: { Sidebar, CasinoSidebar, Player, Fruits },
  middleware: 'auth',
  name: 'Slots',
}
</script>
