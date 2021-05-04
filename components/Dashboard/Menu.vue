<template>
  <div
    class="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10"
  >
    <div class="flex h-full text-gray-600 dark:text-gray-400 dashboard-menu">
      <nuxt-link
        class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8"
        v-for="menu in menus.data"
        :key="menu.name"
        :disabled="menu.disabled"
        :to="localePath(`${menu.url}`)"
        >{{ menu.name }}</nuxt-link
      >
    </div>
    <div class="ml-auto flex items-center space-x-7">
      <button class="h-8 px-3 rounded-md shadow text-white bg-blue-500">
        Deposit
      </button>
      <div class="relative">
        <button
          class="flex items-center focus:outline-none"
          @click="openProfileNav"
          aria-label="lang menu"
          aria-haspopup="true"
          @blur="hideProfileNav"
        >
          <span class="relative flex-shrink-0">
            <img
              class="w-7 h-7 rounded-full"
              src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              alt="profile"
            />
            <span
              class="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"
            ></span>
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
            class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg z-50"
          >
            <div
              class="py-1 rounded-md bg-white shadow-xs"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                href="#"
                class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 uppercase"
                role="menuitem"
              >
                Profili
              </a>
            </div>
          </div>
        </transition>
      </div>

      <lang-switcher />
    </div>
  </div>
</template>

<script>
import LangSwitcher from '../LangSwitcher.vue'
export default {
  components: { LangSwitcher },
  data() {
    return {
      openProfile: false,
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
  props: ['menus'],
}
</script>

<style>
</style>