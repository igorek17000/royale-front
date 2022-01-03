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
          We provide any type of product you need
        </h2>
        <h4 class="text-white text-sm">
          Just choose the ones you want and start to work with them
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
              <p class="font-bold">Stock data</p>
              <p>US and Global Market Data</p>
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
              <p class="font-bold">Forex</p>
              <p>Large Forex Data Coverage</p>
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
              <p class="font-bold">Cryptocurrencies</p>
              <p>1700+ cryptocurrency symbols</p>
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
              <p class="font-bold">Indices</p>
              <p>Global Index Market Data</p>
            </div>
          </div>
          <div class="w-full md:w-1/2 flex items-center py-2">
            <div class="w-16 h-auto">
              <img src="~assets/imgs/etf.svg" alt="etf" class="w-10 h-w-10" />
            </div>
            <div class="text-white flex flex-col text-sm">
              <p class="font-bold">ETF</p>
              <p>Global Exchange Traded Fund and Mutual Fund Data</p>
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
              <p class="font-bold">Fundamentals</p>
              <p>Statements, Calendar and More</p>
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
          In our industry, data accuracy is critical but robust systems to
          ensure data availability are even more important. The talented team at
          AceTrader delivers, so we never miss a beat while securing billions
          for our clients. We rely on AceTrader because our clients rely on us.
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