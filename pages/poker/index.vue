<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm"
  >
    <Sidebar />
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <Menu :menus="menuDashboard" />
      <section class="hero-welcome text-center text-gray-200 text-3xl my-4">
        <h2>Welcome {{ this.$auth.user.username }} to Casino Royale</h2>
        <h4>Select a game that you want to play!</h4>
      </section>
      <div class="container mx-auto flex">
        <game-cards
          title="Age of gods"
          image="https://images.unsplash.com/photo-1600054800747-be294a6a0d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
          desc="lorem iplus play now"
          category="slots"
          url="casino-slots"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Sidebar.vue'
import Menu from '~/components/Dashboard/Menu.vue'
import GameCards from '../../components/Dashboard/Casino/GameCards.vue'
export default {
  components: { Sidebar, Menu, GameCards },
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
