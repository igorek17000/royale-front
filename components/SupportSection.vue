<template>
  <div class="px-4 py-16 w-full mt-16 bg-gray-300">
    <h3
      class="text-bluish font-semibold text-3xl text-center uppercase"
      v-html="$t('home.support.title')"
    ></h3>
    <div
      class="flex items-center mt-16 container mx-auto justify-center flex-wrap"
    >
      <div class="w-full md:w-1/3 flex flex-col justify-center mb-4">
        <div class="image mx-auto text-custom-red mb-8">
          <img
            class="text-custom-red w-20 h-20"
            src="~assets/imgs/bulb.svg"
            alt="FX Trade Signals"
          />
        </div>
        <div class="flex flex-col text-center max-w-xs mx-auto">
          <h4 class="mb-4 font-bold text-bluish">
            {{ $t('home.support.trade') }}
          </h4>
          <p>
            {{ $t('home.support.trade_desc') }}
          </p>
        </div>
      </div>
      <div class="w-full md:w-1/3 flex flex-col justify-center mb-4">
        <div class="image mx-auto text-custom-red mb-8">
          <img
            class="text-custom-red w-20 h-20"
            src="~assets/imgs/strategist.svg"
            alt="Market Strategist"
          />
        </div>
        <div class="flex flex-col text-center max-w-xs mx-auto">
          <h4 class="mb-4 font-bold text-bluish">
            {{ $t('home.support.market') }}
          </h4>
          <p>
            {{ $t('home.support.market_desc') }}
          </p>
        </div>
      </div>
      <div class="w-full md:w-1/3 flex flex-col justify-center mb-4">
        <div class="image mx-auto text-custom-red mb-8">
          <img
            class="text-custom-red w-20 h-20"
            src="~assets/imgs/analytics.svg"
            alt="Market Analysis"
          />
        </div>
        <div class="flex flex-col text-center max-w-xs mx-auto">
          <h4 class="mb-4 font-bold text-bluish">
            {{ $t('home.support.anylist') }}
          </h4>
          <p>
            {{ $t('home.support.anylist_desc') }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-full pt-16 text-center">
      <button
        class="
          rounded-sm
          text-custom-red
          py-3
          font-semibold
          text-md
          leading-tight
          shadow-md
          bg-white
          max-w-xs
          hover:bg-white
          ml-4
          border border-custom-red
          w-full
          text-center
        "
        @click="$router.push(localePath('guidance'))"
      >
        {{ $t('menu.buttons.read-more') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupportSection',
}
</script>

<style scoped>
</style>