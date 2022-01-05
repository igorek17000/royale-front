<template>
  <div
    class="
      bg-white
      dark:bg-secondary dark:border-gray-800
      w-20
      flex-shrink-0
      border-r border-gray-200
      flex-col
      hidden
      sm:flex
    "
  >
    <div
      class="
        flex
        mx-auto
        flex-grow
        mt-4
        flex-col
        text-gray-400
        space-y-4
        sidebar-icons
      "
    >
      <nuxt-link
        class="
          w-12
          dark:text-gray-500
          flex flex-col
          items-center
          justify-center
        "
        :to="
          localePath({
            name: `forex-trade-coin`,
            params: { coin: 'btcusdt' },
          })
        "
      >
        <ForexIcon class="fill-current h-10" />
        <span class="text-xs text-gray-500 capitalize">{{
          $t('dashboard.menu.forex')
        }}</span>
      </nuxt-link>
      <nuxt-link
        class="
          w-12
          dark:text-gray-500
          flex flex-col
          items-center
          justify-center
        "
        :to="
          localePath({
            name: `exchange-trade-coin`,
            params: { coin: 'btcusdt' },
          })
        "
      >
        <ExchangeIcon class="fill-current h-10" />
        <span class="text-xs text-gray-500 capitalize">{{
          $t('dashboard.menu.exchange')
        }}</span>
      </nuxt-link>
      <nuxt-link
        class="
          w-12
          dark:text-gray-500
          flex flex-col
          items-center
          justify-center
        "
        :to="localePath({ name: 'news' })"
      >
        <NewsLogo class="fill-current h-10" />
        <span class="text-xs text-gray-500 capitalize">{{
          $t('dashboard.menu.news')
        }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import ForexIcon from '~/components/Icons/Forex.vue'
import ExchangeIcon from '~/components/Icons/Exchange.vue'
import NewsLogo from '~/components/Icons/NewsLogo.vue'
export default {
  components: { ForexIcon, ExchangeIcon, NewsLogo },
  props: ['menu'],
}
</script>

<style>
</style>