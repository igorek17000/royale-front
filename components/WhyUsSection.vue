<template>
  <div class="px-4 py-8 w-full container mx-auto mt-16">
    <h3
      class="text-bluish font-semibold text-3xl text-center uppercase"
      v-html="$t('home.whyus.title')"
    ></h3>
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
          {{ $t('home.whyus.subtile') }}
        </h4>
        <p class="py-4 text-primary text-base">
          <span class="text-bluish text-xl font-bold">
            {{ $t('home.whyus.unleash') }}
          </span>
          {{ $t('home.whyus.unleash_details') }}
        </p>
        <p class="py-4 text-primary text-base">
          <span class="text-bluish text-xl font-bold">
            {{ $t('home.whyus.explore') }}
          </span>

          {{ $t('home.whyus.explore_details') }}
        </p>
        <p class="py-4 text-primary text-base">
          <span class="text-bluish text-xl font-bold">
            {{ $t('home.whyus.customize') }}
          </span>
          {{ $t('home.whyus.customize_details') }}
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