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
      <div class="flex-grow flex overflow-x-hidden">
        <poker-sidebar title="Hold'Em" />
        <div class="flex-grow dark:bg-primary overflow-y-auto">
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
          <div class="sm:p-7 p-4 h-full w-full">
            <client-only placeholder="loading">
              <!-- <fruits /> -->

              <holdem-poker />
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Poker/Sidebar.vue'
import PokerSidebar from '~/components/Dashboard/Poker/PokerSidebar.vue'
import Player from '~/components/Dashboard/Player.vue'
import HoldemPoker from '@/components/Games/Holdem/HoldemPoker.vue'
export default {
  components: { Sidebar, PokerSidebar, Player, HoldemPoker },
  middleware: 'auth',
  name: 'Holdem',
  computed: {
    balance() {
      return this.$store.state.balance.balance
    },
  },
}
</script>
