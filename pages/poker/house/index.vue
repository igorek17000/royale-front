<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm"
  >
    <Sidebar />
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <Menu :menus="menuDashboard" />
      <div class="flex-grow flex overflow-x-hidden">
        <casino-sidebar title="Roulete" />
        <div class="flex-grow dark:bg-primary overflow-y-auto">
          <div
            class="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-primary dark:text-white dark:border-gray-800 sticky top-0"
          >
            <player />
          </div>
          <div class="sm:p-7 p-4">
            <Poker />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Sidebar.vue'
import Menu from '~/components/Dashboard/Menu.vue'
import CasinoSidebar from '../../../components/Dashboard/Casino/CasinoSidebar.vue'
import Player from '../../../components/Dashboard/Player.vue'
import Poker from '../../../components/Games/Poker/index'
export default {
  components: { Sidebar, Menu, CasinoSidebar, Player, Poker },
  middleware: 'auth',
  name: 'Roulete',
  created() {
    let getMenu = {
      data: [
        {
          name: `${this.$t('dashboard.menu.casino')}`,
          url: '/casino',
          disabled: false,
        },
        {
          name: `${this.$t('dashboard.menu.poker')}`,
          url: '/poker',
          disabled: false,
        },
        {
          name: `${this.$t('dashboard.menu.bet')}`,
          url: '/bet',
          disabled: true,
        },
        {
          name: `${this.$t('dashboard.menu.exchange')}`,
          url: '/exchange',
          disabled: true,
        },
      ],
    }
    this.$store.dispatch('loadMenu', getMenu)
  },
  computed: {
    menuDashboard() {
      return this.$store.state.menuDashboard
    },
  },
}
</script>
