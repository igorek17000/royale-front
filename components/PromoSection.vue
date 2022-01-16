<template>
  <div class="px-4 py-24 w-full promo-bg relative overflow-hidden mt-16">
    <div class="filter-promo"></div>
    <div
      class="
        container
        mx-auto
        z-40
        md:flex md:items-center md:align-middle
        relative
      "
    >
      <div class="w-full md:w-2/4">
        <h2 class="text-white font-semibold text-2xl">
          {{ $t('home.promo.title') }}
        </h2>
        <h4 class="text-white text-sm">
          {{ $t('home.promo.subtitle') }}
        </h4>
        <div class="pairs-services py-6 flex flex-wrap">
          <div class="w-full md:w-1/2 flex items-center py-2">
            <div class="w-16 h-auto">
              <img
                src="~assets/imgs/stock.svg"
                alt="stock"
                class="w-10 h-w-10"
              />
            </div>
            <div class="text-white flex flex-col text-sm">
              <p class="font-bold">
                {{ $t('home.promo.stock') }}
              </p>
              <p>{{ $t('home.promo.stock_detail') }}</p>
            </div>
          </div>
          <div class="w-full md:w-1/2 flex items-center py-2">
            <div class="w-16 h-auto">
              <img
                src="~assets/imgs/forex.svg"
                alt="forex"
                class="w-10 h-w-10"
              />
            </div>
            <div class="text-white flex flex-col text-sm">
              <p class="font-bold">{{ $t('home.promo.forex') }}</p>
              <p>
                {{ $t('home.promo.forex_detail') }}
              </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 flex items-center py-2">
            <div class="w-16 h-auto">
              <img
                src="~assets/imgs/crypto.svg"
                alt="crypto"
                class="w-10 h-w-10"
              />
            </div>
            <div class="text-white flex flex-col text-sm">
              <p class="font-bold">{{ $t('home.promo.crypto') }}</p>
              <p>
                {{ $t('home.promo.crypto_details') }}
              </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 flex items-center py-2">
            <div class="w-16 h-auto">
              <img
                src="~assets/imgs/indicie.svg"
                alt="indicie"
                class="w-10 h-w-10"
              />
            </div>
            <div class="text-white flex flex-col text-sm">
              <p class="font-bold">{{ $t('home.promo.indicies') }}</p>
              <p>
                {{ $t('home.promo.indicies_details') }}
              </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 flex items-center py-2">
            <div class="w-16 h-auto">
              <img src="~assets/imgs/etf.svg" alt="etf" class="w-10 h-w-10" />
            </div>
            <div class="text-white flex flex-col text-sm">
              <p class="font-bold">ETF</p>
              <p>
                {{ $t('home.promo.etf_details') }}
              </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 flex items-center py-2">
            <div class="w-16 h-auto">
              <img
                src="~assets/imgs/fundamentals.svg"
                alt="fundamentals"
                class="w-10 h-w-10"
              />
            </div>
            <div class="text-white flex flex-col text-sm">
              <p class="font-bold">
                {{ $t('home.promo.fundamentals') }}
              </p>
              <p>
                {{ $t('home.promo.fundamentals_details') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          w-full
          md:w-1/3
          testimonial
          border border-white
          py-4
          px-6
          rounded-md
        "
      >
        <div class="header flex items-center">
          <img
            src="~assets/imgs/ian-read.jpg"
            class="w-32 h-w-32 rounded-lg"
            alt="customer testimonial"
          />
          <div class="pl-4 text-white">
            <p class="font-semibold text-lg">Ian Read</p>
            <p>Business Development Lead</p>
            <p>LinkPool</p>
          </div>
        </div>
        <div class="body text-white text-base py-4">
          {{ $t('home.promo.testimonial') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromoSection',
}
</script>

<style scoped>
.promo-bg {
  background-image: url('~assets/imgs/promo.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.filter-promo {
  position: absolute;
  height: 100%;
  background: linear-gradient(
    90deg,
    #0e1012,
    rgba(14, 16, 18, 0.871) 40.76%,
    #0e101200 103.04%
  );
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>