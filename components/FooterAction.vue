<template>
  <div class="px-4 py-32 w-full mt-16 bg-primary">
    <h3
      class="
        text-white
        font-semibold
        text-5xl text-center
        uppercase
        leading-relaxed
      "
    >
      Try
      <span class="underline-text"> ACETRADER </span>
      now!
    </h3>
    <p class="text-white text-center mt-6">
      Claim your bonus and talk with our trading experts with just one click!
    </p>
    <p class="text-gray-400 text-center">*No Credit Card required!</p>
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
        @click="$router.push(localePath('bonus'))"
      >
        {{ $t('menu.buttons.try-now') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterAction',
}
</script>

<style scoped>
</style>