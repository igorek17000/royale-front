<template>
  <footer
    class="fixed bottom-0 left-0 bg-secondary px-4 py-2 w-full flex md:hidden justify-between items-center text-gray-600 dark:text-gray-400 h-16"
  >
    <nuxt-link
      class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-3 md:mr-8"
      v-for="menu in footerMenu.data"
      :key="menu.name"
      :event="menu.disabled ? '' : 'click'"
      :to="localePath(`${menu.url}`)"
      >{{ menu.name }}</nuxt-link
    >
    <FooterLang />
  </footer>
</template>

<script>
import FooterLang from '~/components/FooterLang.vue'

export default {
  components: { FooterLang },
  data() {
    return {}
  },
  computed: {
    footerMenu() {
      return this.$store.state.footerMenu
    },
  },
}
</script>

<style>
</style>