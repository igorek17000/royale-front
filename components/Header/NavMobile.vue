<template>
  <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
    <div class="px-2 pt-2 pb-3 sm:px-3 mobile-menu">
      <nuxt-link
        class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        v-for="menus in menu.data"
        :key="menus.name"
        :to="localePath(`${menus.url}`)"
        >{{ menus.name }}</nuxt-link
      >
    </div>
    <div class="pt-4 pb-3 border-t border-gray-700">
      <div class="mt-3 px-2">
        <a
          href="#"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          {{ $t('menu.buttons.register') }}</a
        >
        <a
          href="#"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >{{ $t('menu.buttons.login') }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isOpen', 'menu'],
}
</script>

<style>
</style>