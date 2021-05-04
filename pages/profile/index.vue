<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm"
  >
    <Sidebar :menu="getMenu">
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-slots' })"
        ><slots class="fill-current h-10"
      /></nuxt-link>
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-roulette' })"
        ><roulette class="h-10 fill-current"
      /></nuxt-link>
    </Sidebar>
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <Menu :menus="menuDashboard" />
      <div class="container mx-auto flex py-12">
        <div>profile here</div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Sidebar.vue'
import Menu from '~/components/Dashboard/Menu.vue'
export default {
  components: { Sidebar, Menu },
  middleware: 'auth',
  name: 'Casino',
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
