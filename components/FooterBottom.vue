<template>
  <footer class="footer bg-white relative pt-1">
    <div class="container mx-auto px-6">
      <div class="sm:flex sm:mt-8">
        <div class="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row">
          <div class="flex flex-col w-full md:w-1/2">
            <a href="/" class="flex-shrink-0 flex items-center mb-3"
              ><img
                src="~assets/Logo.png"
                alt="Ace Trader Platform"
                class="h-12 w-12"
              />
              <span class="pl-2 text-sm font-bold uppercase text-primary"
                >Ace Trading</span
              ></a
            >
            <h4 class="text-gray-700 text-xl max-w-sm mb-3">
              Real-time Trading and Exchange Platform
            </h4>
            <p class="max-w-md text-xs text-gray-500">
              Risk Warning: Our products are traded on leverage which means they
              carry a high level of risk and you could lose more than your
              deposits. These products are not suitable for all investors.
              Please ensure you fully understand the risks and carefully
              consider your financial situation and trading experience before
              trading. Seek independent advice if necessary.
            </p>
          </div>
          <div class="flex flex-col w-full md:w-1/2">
            <span class="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2"
              >Menu</span
            >

            <nuxt-link
              class="
                py-2
                text-sm text-primary
                hover:text-custom-red
                focus:outline-none
                font-bold
              "
              v-for="menus in menu.data"
              :key="menus.name"
              :to="localePath(`${menus.url}`)"
              >{{ menus.name }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-6">
      <div class="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
        <div class="sm:w-2/3 text-center py-6">
          <p class="text-sm text-custom-red font-bold mb-2">
            © 2021 ACE TRADING PLATFORM
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'FooterBottom',
  computed: mapState(['menu']),
}
</script>

<style>
</style>