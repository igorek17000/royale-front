<template>
  <div class="dark:bg-primary">
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
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
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
          disabled: false,
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
        // {
        //   name: `${this.$t('dashboard.menu.bet')}`,
        //   url: '/bet',
        //   disabled: true,
        // },
        {
          name: `${this.$t('dashboard.menu.exchange')}`,
          url: '/exchange',
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
