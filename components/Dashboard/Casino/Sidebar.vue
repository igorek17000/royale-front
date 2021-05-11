<template>
  <div
    class="bg-white dark:bg-secondary dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex"
  >
    <div
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4 sidebar-icons"
    >
      <nuxt-link
        class="w-12 dark:text-gray-500 flex flex-col items-center justify-center"
        :to="localePath({ name: 'casino-slots' })"
      >
        <SlotIcon class="fill-current h-10" />
        <span class="text-xs text-gray-500">Slots</span>
      </nuxt-link>
      <nuxt-link
        class="w-12 dark:text-gray-500 flex flex-col items-center justify-center"
        :to="localePath({ name: 'casino-roulette' })"
      >
        <roulette class="h-10 fill-current" />
        <span class="text-xs text-gray-500">Roulette</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Roulette from '~/components/Icons/Roulette.vue'
import SlotIcon from '~/components/Icons/SlotIcon.vue'
export default {
  components: { Roulette, SlotIcon },
  props: ['menu'],
}
</script>

<style>
</style>