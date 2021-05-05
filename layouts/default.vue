<template>
  <div class="dark:bg-primary">
    <div
      class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-full md:h-screen flex md:overflow-hidden"
    >
      <div class="flex-grow overflow-hidden h-full flex flex-col">
        <Menu />
        <nuxt />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '~/components/Dashboard/Menu.vue'
import Footer from '~/components/Dashboard/Footer.vue'
export default {
  components: { Menu, Footer },
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
    let FooterMenu = {
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
          name: `${this.$t('dashboard.menu.profile')}`,
          url: '/profile',
          disabled: false,
        },
      ],
    }
    this.$store.dispatch('loadMenuFooter', FooterMenu)
    let userMenu = {
      data: [
        {
          name: `${this.$t('dashboard.user-menu.profile')}`,
          url: '/profile',
          icon: 'user',
        },
        {
          name: `${this.$t('dashboard.user-menu.payments')}`,
          url: '/payments',
          icon: 'payment',
        },
        {
          name: `${this.$t('dashboard.user-menu.logout')}`,
          url: '/logout',
          icon: 'logout',
        },
      ],
    }
    this.$store.dispatch('loadUserMenu', userMenu)
  },
}
</script>
