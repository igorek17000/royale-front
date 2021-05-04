<template>
  <div class="dark:bg-primary">
    <div
      class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm"
    >
      <div class="flex-grow overflow-hidden h-full flex flex-col">
        <Menu />
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '~/components/Dashboard/Menu.vue'
export default {
  components: { Menu },
  data() {
    return {}
  },
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
