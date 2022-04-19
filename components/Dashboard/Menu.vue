<template>
  <div
    class="h-16 flex w-full border-b border-gray-200 dark:border-gray-800 pr-2 md:pr-10"
  >
    <div
      class="h-auto w-20 flex items-center justify-center mr-3 md:mr-5 md:border-r md:border-secondary sticky top-0"
    >
      <nuxt-link :to="localePath({ name: 'exchange' })">
        <img class="h-auto w-14 py-2" src="~/assets/Logo.png" alt="Logo" />
      </nuxt-link>
    </div>
    <div
      class="hidden md:flex h-full text-gray-600 dark:text-gray-400 dashboard-menu"
    >
      <nuxt-link
        class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-3 md:mr-4 lg:mr-8"
        v-for="menu in menus.data"
        :key="menu.name"
        :event="menu.disabled ? '' : 'click'"
        :to="localePath(`${menu.url}`)"
        >{{ menu.name }}</nuxt-link
      >
    </div>
    <div class="ml-auto flex items-center md:space-x-4 lg:space-x-7">
      <div class="block">
        <span class="text-xs text-gray-400 dark:text-gray-400"
          >{{ $t('account.balance-menu') }}:
        </span>
        <p
          class="balance rounded-md text-money shadow font-bold font-roboto flex items-center"
        >
          <vue-numeric
            v-if="balance"
            currency="$"
            separator=","
            read-only
            read-only-class=" flex
        items-center pr-3
          w-full"
            :value="balance"
            :precision="2"
            class=""
          ></vue-numeric>
          💰
        </p>
      </div>
      <!-- <button class="h-8 px-3 rounded-md shadow text-white bg-blue-500">
        Deposit
      </button> -->

      <div class="hidden md:flex relative">
        <button
          class="flex items-center focus:outline-none"
          @click="openProfileNav"
          aria-label="lang menu"
          aria-haspopup="true"
          @blur="hideProfileNav"
        >
          <span class="relative flex-shrink-0">
            <avatar :username="$auth.user.username" />
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
import Avatar from '~/components/Dashboard/Avatar.vue'
import VueNumeric from 'vue-numeric'
export default {
  components: { LangSwitcher, Avatar, VueNumeric },
  data() {
    return {
      isOpen: false,
      openProfile: false,
    }
  },
  methods: {
    openProfileNav() {
      this.openProfile = !this.openProfile
    },
    hideProfileNav() {
      setTimeout(() => {
        this.openProfile = false
      }, 200)
    },
  },
  computed: {
    menus() {
      return this.$store.state.menuDashboard
    },
    userMenu() {
      return this.$store.state.userMenu
    },
    balance() {
      return this.$store.state.balance.balance.actual_balance
    },
  },
}
</script>

<style></style>
