<template>
  <div
    class="h-16 flex w-full border-b border-gray-200 dark:border-gray-800 pr-2 md:pr-10"
  >
    <div
      class="h-auto w-20 flex items-center justify-center mr-3 md:mr-5 md:border-r md:border-secondary pt-4 bg-primary md:bg-secondary"
    >
      <nuxt-link :to="localePath({ name: 'casino' })">
        <img class="h-auto w-14" src="~/assets/logo.png" alt="Logo" />
      </nuxt-link>
    </div>
    <div
      class="hidden md:flex h-full text-gray-600 dark:text-gray-400 dashboard-menu"
    >
      <nuxt-link
        class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-3 md:mr-8"
        v-for="menu in menus.data"
        :key="menu.name"
        :event="menu.disabled ? '' : 'click'"
        :to="localePath(`${menu.url}`)"
        >{{ menu.name }}</nuxt-link
      >
    </div>
    <div class="ml-auto flex items-center space-x-7">
      <div class="h-8 block md:hidden">
        <span class="text-sm">Balance: </span>
        <button class="balance rounded-md text-money h-8 shadow font-bold px-3">
          $ {{ parseFloat(this.$auth.user.balance) }}
        </button>
      </div>
      <button class="h-8 px-3 rounded-md shadow text-white bg-blue-500">
        Deposit
      </button>

      <div class="hidden md:flex relative">
        <button
          class="flex items-center focus:outline-none"
          @click="openProfileNav"
          aria-label="lang menu"
          aria-haspopup="true"
          @blur="hideProfileNav"
        >
          <span class="relative flex-shrink-0">
            <img
              class="w-7 mr-4 rounded-full h-7 object-cover"
              :src="userImage"
              alt="profile"
            />
          </span>
          <span class="ml-2">{{ this.$auth.user.username }}</span>
          <svg
            viewBox="0 0 24 24"
            class="w-4 ml-1 flex-shrink-0"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-show="openProfile"
            class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg z-50 top-8"
          >
            <div
              class="py-1 rounded-md bg-white shadow-xs"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <nuxt-link
                class="flex px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize items-center"
                v-for="(menu, index) in userMenu.data"
                :key="index"
                :disabled="menu.disabled"
                :to="localePath(`${menu.url}`)"
              >
                <img
                  class="w-4 h-4 mr-2"
                  :src="require(`~/assets/icons/${menu.icon}.png`)"
                  :alt="menu.icon"
                />
                {{ menu.name }}</nuxt-link
              >
            </div>
          </div>
        </transition>
      </div>
      <div class="hidden md:flex">
        <lang-switcher />
      </div>
    </div>
  </div>
</template>

<script>
import LangSwitcher from '~/components/LangSwitcher.vue'
export default {
  components: { LangSwitcher },
  data() {
    return {
      isOpen: false,
      openProfile: false,
      userImage:
        `${this.$config.baseURL}${this.$auth.user.avatar.formats.thumbnail.url}` ||
        '../../avatar.png',
    }
  },
  methods: {
    openProfileNav() {
      this.openProfile = !this.openProfile
    },
    hideProfileNav() {
      this.openProfile = false
    },
  },
  computed: {
    menus() {
      return this.$store.state.menuDashboard
    },
    userMenu() {
      return this.$store.state.userMenu
    },
  },
}
</script>

<style>
</style>