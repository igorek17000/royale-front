<template>
  <div>
    <Nav :menu="menu" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Nav from '../../components/Header/Nav.vue'
export default {
  name: 'Faq',
  middleware: 'auth',
  auth: 'guest',
  layout: 'home',
  components: {
    Nav,
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