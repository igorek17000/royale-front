<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm"
  >
    <Sidebar>
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-slots' })"
        >aaa</nuxt-link
      >
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-roulette' })"
        >bbb</nuxt-link
      >
    </Sidebar>
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="container mx-auto flex py-12">
        <div>profile here</div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Sidebar.vue'
import Menu from '~/components/Dashboard/Menu.vue'
export default {
  components: { Sidebar, Menu },
  middleware: 'auth',
  name: 'Profile',
}
</script>
