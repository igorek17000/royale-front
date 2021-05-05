<template>
  <div class="ml-3 relative">
    <div>
      <button
        @click="toggleLangFooter"
        class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid uppercase"
        id="lang-menu"
        aria-label="lang menu"
        aria-haspopup="true"
        @blur="hideLang"
      >
        <img
          class="h-6 w-6 ml-2 mr-1"
          :src="require(`~/assets/flags/${$i18n.locale}.png`)"
        />
        {{ $i18n.locale }}
      </button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="isOpenLangFooter"
        class="origin-bottom-right absolute right-0 mt-2 w-32 rounded-md shadow-lg z-50 bottom-12"
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
            v-for="locale in $i18n.locales"
            :key="locale.code"
            @click="changeLocale(locale.code)"
          >
            <img
              class="h-6 w-6 ml-1 mr-1"
              :src="require(`~/assets/flags/${locale.code}.png`)"
            />
            {{ locale.name }}</a
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpenLangFooter: false,
    }
  },
  components: {},
  methods: {
    toggleLangFooter() {
      this.isOpenLangFooter = !this.isOpenLangFooter
    },

    changeLocale(locale) {
      this.$i18n.setLocaleCookie(locale)
      this.$i18n.setLocale(locale)
      location.reload()
      // this.$router.push(this.switchLocalePath(locale))
      this.isOpenLangFooter = !this.isOpenLangFooter
    },
    hideLang() {
      this.isOpenLangFooter = false
    },
  },
}
</script>
