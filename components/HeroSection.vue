<template>
  <div
    class="
      container
      mx-auto
      px-4
      py-8
      w-full
      md:flex md:items-center md:align-middle
      h-custom-hero
    "
  >
    <div class="w-full md:w-2/5">
      <h1
        class="
          text-bluish
          font-semibold
          pb-4
          pr-lg-5 pr-sm-0
          text-5xl
          leading-normal
        "
        v-html="$t('home.hero.title')"
      ></h1>
      <h4 class="text-secondary py-8 text-2xl">
        {{ $t('home.hero.subtitle') }}
      </h4>
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
          @click="$emit('open-login')"
        >
          {{ $t('menu.buttons.login') }}
        </button>
      </div>
      <div class="infos text-gray-400 text-2xl">
        {{ $t('home.hero.info') }}
      </div>
      <div class="mt-8">
        <div class="tech-socials h-10 w-full"></div>
      </div>
    </div>
    <div class="w-full md:w-3/5 hero-image"></div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>

<style scoped>
.tech-socials {
  background: url('~assets/imgs/Tech_Final.svg') no-repeat center center/
    contain;
}
@media (min-width: 778px) {
  .h-custom-hero {
    height: calc(100vh - 200px);
  }
  .hero-image {
    background-image: url('~assets/imgs/hero.svg');
    background-size: contain;
    background-position: 10%;
    background-repeat: no-repeat;
    position: absolute;
    right: 30px;
    top: 80px;
    width: 48%;
    font-family: Quicksand, sans-serif !important;
    height: 90%;
  }
}
</style>