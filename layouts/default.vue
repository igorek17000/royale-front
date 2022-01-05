<template>
  <div class="dark:bg-primary relative font-sans">
    <div
      class="
        bg-gray-100
        dark:bg-primary dark:text-white
        text-gray-600
        h-full
        md:h-screen
        flex
        md:overflow-hidden
      "
    >
      <div class="flex-grow overflow-hidden h-full flex flex-col min-h-screen">
        <Menu />
        <nuxt />
        <Footer />
      </div>
    </div>
    <div class="absolute right-5 top-20">
      <!-- <notification /> -->
    </div>
  </div>
</template>

<script>
import Menu from '~/components/Dashboard/Menu.vue'
import Footer from '~/components/Dashboard/Footer.vue'
import Notification from '~/components/Notification.vue'
export default {
  components: { Menu, Footer, Notification },
  data() {
    return {}
  },
  created() {
    let getMenu = {
      data: [
        // {
        //   name: `${this.$t('dashboard.menu.casino')}`,
        //   url: '/casino',
        //   disabled: false,
        // },
        // {
        //   name: `${this.$t('dashboard.menu.poker')}`,
        //   url: '/poker',
        //   disabled: false,
        // },
        // {
        //   name: `${this.$t('dashboard.menu.bet')}`,
        //   url: '/bet',
        //   disabled: true,
        // },
        {
          name: `${this.$t('dashboard.menu.forex')}`,
          url: '/forex',
          disabled: false,
        },
        {
          name: `${this.$t('dashboard.menu.exchange')}`,
          url: '/exchange',
          disabled: false,
        },
        {
          name: `${this.$t('dashboard.menu.news')}`,
          url: '/news',
          disabled: false,
        },
      ],
    }
    this.$store.dispatch('loadMenu', getMenu)
    let FooterMenu = {
      data: [
        // {
        //   name: `${this.$t('dashboard.menu.casino')}`,
        //   url: '/casino',
        //   disabled: false,
        // },
        // {
        //   name: `${this.$t('dashboard.menu.poker')}`,
        //   url: '/poker',
        //   disabled: false,
        // },
        // {
        //   name: `${this.$t('dashboard.menu.bet')}`,
        //   url: '/bet',
        //   disabled: true,
        // },
        {
          name: `${this.$t('dashboard.menu.forex')}`,
          url: '/forex',
          disabled: false,
        },
        {
          name: `${this.$t('dashboard.menu.exchange')}`,
          url: '/exchange',
          disabled: false,
        },
        {
          name: `${this.$t('dashboard.menu.news')}`,
          url: '/news',
          disabled: false,
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

    this.getUserBalance()
  },
  computed: {
    refreshBalance() {
      return this.$store.state.refreshBalance
    },
  },
  watch: {
    refreshBalance: function (val) {
      this.getUserBalance()
    },
  },
  methods: {
    async getUserBalance() {
      let payload = {
        id: this.$auth.user.id,
      }
      await this.$axios
        .post('/payments/get-balance', payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.$store.commit('balance/SET_BALANCE', res.data)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
  },
}
</script>
