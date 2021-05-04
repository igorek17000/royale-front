<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm"
  >
    <Sidebar>
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-slots' })"
        ><SlotIcon class="fill-current h-10"
      /></nuxt-link>
      <nuxt-link
        class="h-10 w-12 dark:text-gray-500 flex items-center justify-center"
        :to="localePath({ name: 'casino-roulette' })"
        ><roulette class="h-10 fill-current"
      /></nuxt-link>
    </Sidebar>
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <section class="hero-welcome text-center text-gray-200 text-3xl my-4">
        <h2>Welcome {{ this.$auth.user.username }} to Casino Royale</h2>
        <h4>Select a game that you want to play!</h4>
      </section>
      <div class="container mx-auto flex">
        <game-cards
          title="Age of gods"
          image="https://images.unsplash.com/photo-1600054800747-be294a6a0d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
          desc="lorem iplus play now"
          category="slots"
          url="casino-slots"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Dashboard/Sidebar.vue'
import Menu from '~/components/Dashboard/Menu.vue'
import GameCards from '~/components/Dashboard/Casino/GameCards.vue'
import Roulette from '~/components/Icons/Roulette.vue'
import SlotIcon from '~/components/Icons/SlotIcon.vue'
export default {
  components: { Sidebar, Menu, GameCards, SlotIcon, Roulette },
  middleware: 'auth',
  name: 'Casino',
}
</script>
