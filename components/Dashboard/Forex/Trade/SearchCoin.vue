<template>
  <div class="">
    <div v-for="(coin, index) in filterCoins" :key="index">
      <p
        class="cursor-pointer px-3 py-2 hover:bg-secondary"
        @click="
          $router.push({
            name: 'forex-trade-coin',
            params: { coin: coin.symbol },
          })
        "
      >
        <span class="shortname"> Name : {{ coin.shortname }} </span>
        <span class="shortname"> Type : {{ coin.quoteType }} </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['filterCoins'],
  mounted() {
    console.log('filtercoins', this.filterCoins)
  },
}
</script>

<style></style>
