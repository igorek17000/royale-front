<template>
  <div class="">
    <div v-for="(coin, index) in filterCoins" :key="index">
      <p
        class="cursor-pointer px-3 py-2 hover:bg-secondary"
        @click="
          $router.push({
            name: 'exchange-trade-coin',
            params: { coin: `${coin.toLowerCase()}usdt` },
          })
        "
      >
        {{ coin }}/USDT
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['filterCoins'],
}
</script>

<style>
</style>