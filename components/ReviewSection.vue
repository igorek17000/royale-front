<template>
  <div class="px-4 py-8 w-full container mx-auto mt-16">
    <h3
      class="text-bluish font-semibold text-3xl text-center uppercase"
      v-html="$t('home.review.title')"
    ></h3>
    <div
      class="
        trustpilot
        border border-gray-200
        rounded-lg
        px-4
        py-8
        mt-8
        review-bg
        w-full
        bg-bluish
      "
    >
      <div class="trustpilot-img text-center">
        <img
          src="~assets/imgs/trustpilot.png"
          alt="trustpilot"
          class="mx-auto"
        />
      </div>
      <div class="stars-img text-center">
        <img src="~assets/imgs/stars.png" alt="stars" class="mx-auto" />
      </div>
      <div class="review-text text-center text-white">
        <h4 class="text-2xl font-bold">Excellent 4.6</h4>
        <p>{{ $t('home.review.reviews') }} 12 672</p>
      </div>
    </div>
    <div
      class="
        flex
        items-center
        mt-16
        container
        mx-auto
        justify-center
        gap-4
        flex-wrap
        md:flex-nowrap
      "
    >
      <div
        class="
          w-full
          md:w-1/3
          flex flex-col
          justify-center
          p-4
          bg-secondary
          rounded-lg
        "
      >
        <div class="image flex flex-row">
          <img
            class="text-custom-red w-12 h-w-12"
            src="~assets/imgs/avatar1.png"
            alt="Allison"
          />
          <div class="texts pl-4 text-white">
            <p>Allison S.</p>
            <img src="~assets/imgs/rating1.svg" alt="rating-1" />
          </div>
        </div>
        <div class="flex flex-col text-white mt-4">
          <h4 class="mb-2 font-bold">
            {{ $t('home.review.allison.title') }}
          </h4>
          <p>
            {{ $t('home.review.allison.desc') }}
          </p>
        </div>
      </div>
      <div
        class="
          w-full
          md:w-1/3
          flex flex-col
          justify-center
          p-4
          bg-secondary
          rounded-lg
        "
      >
        <div class="image flex flex-row">
          <img
            class="text-custom-red w-12 h-w-12"
            src="~assets/imgs/avatar2.png"
            alt="Justin C."
          />
          <div class="texts pl-4 text-white">
            <p>Justin C.</p>
            <img src="~assets/imgs/rating2.svg" alt="rating-1" />
          </div>
        </div>
        <div class="flex flex-col text-white mt-4">
          <h4 class="mb-2 font-bold">
            {{ $t('home.review.justin.title') }}
          </h4>
          <p>
            {{ $t('home.review.justin.desc') }}
          </p>
        </div>
      </div>
      <div
        class="
          w-full
          md:w-1/3
          flex flex-col
          justify-center
          p-4
          bg-secondary
          rounded-lg
        "
      >
        <div class="image flex flex-row">
          <img
            class="text-custom-red w-12 h-w-12"
            src="~assets/imgs/avatar3.png"
            alt="Charlie"
          />
          <div class="texts pl-4 text-white">
            <p>Charlie R</p>
            <img src="~assets/imgs/rating1.svg" alt="rating-1" />
          </div>
        </div>
        <div class="flex flex-col text-white mt-4">
          <h4 class="mb-2 font-bold">
            {{ $t('home.review.charlie.title') }}
          </h4>
          <p>
            {{ $t('home.review.charlie.desc') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewSection',
}
</script>

<style scoped>
.review-bg {
  background-image: url('~assets/imgs/review-bg.png');
  background-size: cover;
  background-position: 50% 50%;
}
</style>