<template>
  <div class="font-sans">
    <Nav
      :menu="menu"
      @open-login="openLoginModal"
      @open-register="openRegisterModal"
    />

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <login v-if="loginModal" @close-login="closeLoginModal" />
      <Register v-if="registerModal" @close-register="closeRegisterModal" />
    </transition>
    <div v-if="loginModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <div
      v-if="registerModal"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
    <nuxt @open-register="openRegisterModal" class="mt-20" />
    <FooterBottom />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '~/components/Modals/Login.vue'
import Register from '~/components/Modals/Register.vue'
import Nav from '../components/Header/Nav.vue'
import FooterBottom from '@/components/FooterBottom.vue'
export default {
  name: 'home',
  components: {
    Nav,
    Login,
    Register,
    FooterBottom,
  },
  data() {
    return {
      loginModal: false,
      registerModal: false,
    }
  },
  methods: {
    openLoginModal() {
      this.loginModal = true
    },
    openRegisterModal() {
      this.registerModal = true
    },
    closeLoginModal() {
      this.loginModal = false
    },
    closeRegisterModal() {
      this.registerModal = false
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
          name: `${this.$t('menu.guidance')}`,
          url: '/guidance',
        },
        {
          name: `${this.$t('menu.faq')}`,
          url: '/faq',
        },
      ],
    }
    this.$store.dispatch('loadSidebar', getData)
    this.$nuxt.$on('open-login', () => {
      this.openLoginModal()
    })
    this.$nuxt.$on('open-register', () => {
      this.openRegisterModal()
    })
  },
}
</script>
