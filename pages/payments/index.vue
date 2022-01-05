<template>
  <div
    class="
      bg-gray-100
      dark:bg-primary dark:text-white
      text-gray-600
      h-screen
      flex
      overflow-hidden
      text-sm
    "
  >
    <Sidebar />

    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div
        class="
          container
          mx-auto
          flex
          h-full
          justify-center
          items-center
          flex-col
          py-12
        "
      >
        <h4 class="text-2xl font-bold">
          Please contact us if you want to make payments!
        </h4>
        <nuxt-link class="uppercase underline text-2xl mt-4" to="contact">
          Contact Us
        </nuxt-link>
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
  name: 'Payments',
}
</script>
