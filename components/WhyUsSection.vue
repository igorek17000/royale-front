<template>
  <div class="px-4 py-8 w-full container mx-auto mt-16">
    <h3 class="text-bluish font-semibold text-3xl text-center uppercase">
      Our Top
      <span class="underline-text"> Platform, </span>
      Built For You
    </h3>
    <div class="flex items-center mt-16 flex-wrap">
      <div class="w-full md:w-1/2">
        <img
          src="~assets/imgs/mockups.png"
          class="w-full h-auto rounded-lg"
          alt="customer testimonial"
        />
      </div>
      <div class="w-full md:w-1/2 md:px-10">
        <h4 class="text-2xl font-bold text-custom-red uppercase py-4">
          Trading/Exchange Platform
        </h4>
        <p class="py-4 text-primary text-base">
          <span class="text-bluish text-xl font-bold">Unleash </span> robust
          chart tools on an award-winning platform — great for technical
          traders.
        </p>
        <p class="py-4 text-primary text-base">
          <span class="text-bluish text-xl font-bold">Explore </span> powerful,
          preloaded tools like Real Volume, Market Depth, and Trader Sentiment.
        </p>
        <p class="py-4 text-primary text-base">
          <span class="text-bluish text-xl font-bold">Customise </span> your
          experience: Download indicators, create watch lists and custom layouts
          to adapt the platform for your strategy.
        </p>
        <div class="buttons flex justify-between py-8">
          <button
            class="
              rounded-sm
              bg-custom-red
              text-white
              py-3
              font-semibold
              text-md
              leading-tight
              shadow-md
              hover:bg-custom-redh
              w-full
            "
            @click="$emit('open-register')"
          >
            {{ $t('menu.buttons.register') }}
          </button>
          <button
            class="
              rounded-sm
              bg-transparent
              text-custom-red
              py-3
              font-semibold
              text-md
              leading-tight
              shadow-md
              hover:bg-white
              ml-4
              border border-custom-red
              w-full
            "
            @click="$router.push(localePath('bonus'))"
          >
            {{ $t('menu.buttons.bonus') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhyUsSection',
}
</script>

<style scoped>
</style>