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
          px-4
          pt-4
          flex flex-col
          w-full
          border-b border-gray-200
          bg-white
          dark:bg-primary dark:text-white dark:border-gray-800
          sticky
          top-0
        "
      >
        <player :balance="balance" />
      </div>
      <div class="container mx-auto flex py-12">
        <profile-form />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Sidebar.vue'
import Menu from '~/components/Dashboard/Menu.vue'
import ProfileForm from '@/components/Dashboard/ProfileForm.vue'
import Player from '~/components/Dashboard/Player.vue'
export default {
  components: { Sidebar, Menu, ProfileForm, Player },
  middleware: 'auth',
  name: 'Profile',
  computed: {
    balance() {
      return this.$store.state.balance.balance
    },
  },
}
</script>
