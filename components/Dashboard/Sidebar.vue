<template>
  <div
    class="bg-white dark:bg-secondary dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex"
  >
    <div class="h-20 flex items-start justify-center">
      <nuxt-link :to="localePath({ name: 'casino' })">
        <img class="h-auto w-full" src="~/assets/logo.png" alt="Logo" />
      </nuxt-link>
    </div>
    <div
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4 sidebar-icons"
    >
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-slots' })"
        ><slots class="fill-current h-10"
      /></nuxt-link>
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-roulette' })"
        ><roulette class="h-10 fill-current"
      /></nuxt-link>
    </div>
  </div>
</template>

<script>
import Roulette from '../Icons/Roulette.vue'
import Slots from '../Icons/Slots.vue'
export default {
  components: { Slots, Roulette },
}
</script>

<style>
</style>