<template>
  <div>
    <Nav :menu="menu" @open-login="openLoginModal" />

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <login v-if="loginModal" @close-login="closeLoginModal" />
    </transition>
    <div v-if="loginModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '~/components/Modals/Login.vue'
import Nav from '../components/Header/Nav.vue'
export default {
  name: 'Homepage',
  middleware: 'auth',
  auth: 'guest',
  layout: 'home',
  components: {
    Nav,
    Login,
  },
  data() {
    return {
      loginModal: false,
    }
  },
  methods: {
    openLoginModal() {
      this.loginModal = true
    },
    closeLoginModal() {
      this.loginModal = false
    },
  },
  computed: mapState(['menu']),
  created() {
    let getData = {
      data: [
        {
          name: `${this.$t('menu.home')}`,
          url: '/',
        },
        {
          name: `${this.$t('menu.bonus')}`,
          url: '/bonus',
        },
        {
          name: `${this.$t('menu.faq')}`,
          url: '/faq',
        },
      ],
    }
    this.$store.dispatch('loadSidebar', getData)
  },
}
</script>

<style>
</style>