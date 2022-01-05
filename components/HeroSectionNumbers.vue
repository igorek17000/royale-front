<template>
  <div
    class="
      container
      mx-auto
      w-full
      flex flex-wrap
      md:flex-nowrap
      items-center
      align-middle
      h-20
    "
  >
    <div
      class="
        w-full
        md:w-1/4
        flex
        items-center
        justify-between
        md:justify-center
        align-middle
        px-4
      "
    >
      <p class="text-2xl text-bluish font-bold">21,000+</p>
      <p class="text-base text-secondary pl-4">Trusted Ace Traders</p>
    </div>
    <div
      class="
        w-full
        md:w-1/4
        flex
        items-center
        justify-between
        md:justify-center
        align-middle
        px-4
      "
    >
      <p class="text-2xl text-bluish font-bold">145K+</p>
      <p class="text-base text-secondary pl-4">Trades / Day</p>
    </div>
    <div
      class="
        w-full
        md:w-1/4
        flex
        items-center
        justify-between
        md:justify-center
        align-middle
        px-4
      "
    >
      <p class="text-2xl text-bluish font-bold">24/7</p>
      <p class="text-base text-secondary pl-4">Open Trading</p>
    </div>
    <div
      class="
        w-full
        md:w-1/4
        flex
        items-center
        justify-between
        md:justify-center
        align-middle
        px-4
      "
    >
      <p class="text-2xl text-bluish font-bold">24/7</p>
      <p class="text-base text-secondary pl-4">Online Support</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>

<style scoped>
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
.tech-socials {
  background: url('~assets/imgs/Tech_Final.svg') no-repeat center center/
    contain;
}
</style>