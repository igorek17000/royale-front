<template>
  <div class="px-4 py-8 w-full max-w-6xl mx-auto mt-16">
    <h3 class="text-bluish font-semibold text-3xl text-center uppercase">
      <span class="underline-text"> FAQ </span>
    </h3>
    <div class="flex mt-16 flex-wrap">
      <div class="w-full md:w-1/2">
        <div class="mb-5 md:mb-12 px-6">
          <h3 class="font-medium text-black text-2xl mb-4">
            {{ $t('home.faq.bitcoin') }}
          </h3>
          <p class="text-gray-500 text-sm">
            {{ $t('home.faq.bitcoin_desc') }}
          </p>
        </div>
        <div class="px-6">
          <h3 class="font-medium text-black text-2xl mb-4">
            {{ $t('home.faq.start_trading') }}
          </h3>
          <p class="text-gray-500 text-sm">
            {{ $t('home.faq.start_trading_desc') }}
          </p>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="mb-5 md:mb-12 px-6">
          <h3 class="font-medium text-black text-2xl mb-4">
            {{ $t('home.faq.is_safe') }}
          </h3>
          <p class="text-gray-500 text-sm">
            {{ $t('home.faq.is_safe_desc') }}
          </p>
        </div>
        <div class="px-6">
          <h3 class="font-medium text-black text-2xl mb-4">
            {{ $t('home.faq.help') }}
          </h3>
          <p class="text-gray-500 text-sm">
            {{ $t('home.faq.help_desc') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqSection',
}
</script>

<style scoped>
</style>