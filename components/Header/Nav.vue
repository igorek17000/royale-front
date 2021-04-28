<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <img
            class="h-8 w-8"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-400.svg"
            alt="Workflow logo"
          />
        </div>
        <div class="flex items-center">
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline">
              <nuxt-link
                class="ml-4 px-3 py-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                v-for="menus in menu.data"
                :key="menus.name"
                :to="localePath(`${menus.url}`)"
                >{{ menus.name }}</nuxt-link
              >
            </div>
          </div>
        </div>
        <div class="ml-10 hidden md:flex items-center">
          <button
            class="rounded-lg bg-custom-red text-white px-4 py-3 font-semibold text-md leading-tight shadow-md hover:bg-custom-redh ml-4"
            @click="openRegister"
          >
            {{ $t('menu.buttons.register') }}
          </button>
          <button
            class="rounded-lg bg-transparent text-custom-red px-4 py-3 font-semibold text-md leading-tight shadow-md hover:bg-white ml-4 border border-custom-red"
            @click="openLogin"
          >
            {{ $t('menu.buttons.login') }}
          </button>

          <div class="ml-4 flex items-center md:ml-4 py-4">
            <lang-switcher />
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            @click="toggle"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
          >
            <svg
              :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <svg
              :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <nav-mobile :isOpen="isOpen" :menu="menu" />
  </nav>
</template>

<script>
import LangSwitcher from '../LangSwitcher.vue'
import NavMobile from './NavMobile.vue'
export default {
  components: { LangSwitcher, NavMobile },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    openLogin() {
      this.$emit('open-login')
    },
    openRegister() {
      this.$emit('open-register')
    },
  },
  props: ['menu'],
}
</script>