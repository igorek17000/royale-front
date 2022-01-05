<template>
  <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
    <div class="px-2 pt-2 pb-3 sm:px-3 mobile-menu">
      <nuxt-link
        class="mt-1 block px-3 py-2 text-base font-medium text-gray-900"
        v-for="menus in menu.data"
        :key="menus.name"
        :to="localePath(`${menus.url}`)"
        >{{ menus.name }}</nuxt-link
      >
    </div>
    <div class="pt-4 pb-3 border-t border-gray-700">
      <div class="mt-3 px-2">
        <button
          class="mt-1 block px-3 py-2 text-base font-medium text-gray-900"
          @click="$nuxt.$emit('open-register')"
        >
          {{ $t('menu.buttons.register') }}
        </button>
        <button
          class="mt-1 block px-3 py-2 text-base font-medium text-gray-900"
          @click="$nuxt.$emit('open-login')"
        >
          {{ $t('menu.buttons.login') }}
        </button>
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