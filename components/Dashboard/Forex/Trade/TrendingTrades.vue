<template>
  <div class="mt-4">
    <h4 class="text-base text-gray-400 tracking-wider uppercase">
      Most trending trades
    </h4>

    <div class="trade-cards flex flex-col gap-4">
      <div
        v-for="(coin, index) in tradingCoins"
        :key="index"
        class="cursor-pointer bg-greenMoney bg-opacity-5 p-4 rounded-lg mt-4 flex items-center justify-center flex-col"
        @click="
          $router.push({
            name: 'forex-trade-coin',
            params: { coin: coin.url },
          })
        "
      >
        <span class="mb-2">
          {{ coin.shortName }}
        </span>
        <span class="text-xs text-gray-400 tracking-wide">{{ coin.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendingTrades',
  data() {
    return {
      tradingCoins: [
        {
          url: 'EURUSD=X',
          shortName: 'EUR/USD',
          name: 'Euro / USD - Currency',
        },
        {
          url: 'GBPUSD=X',
          shortName: 'GBP/USD',
          name: 'GB Pound / USD - Currency',
        },
        {
          url: 'AUDUSD=X',
          shortName: 'AUD/USD',
          name: 'Australian Dollar / USD - Currency',
        },
        {
          url: 'JPY=X',
          shortName: 'USD/JPY',
          name: 'USD / Japan Yen - Currency',
        },
        {
          url: 'TWTR',
          shortName: 'TWTR',
          name: 'Twitter Stock',
        },
        {
          url: 'AAPL',
          shortName: 'AAPL',
          name: 'Apple Stock',
        },
        {
          url: 'MSFT',
          shortName: 'MSFT',
          name: 'Microsoft Stock',
        },
        {
          url: 'TSLA',
          shortName: 'TSLA',
          name: 'Tesla Stock',
        },
      ],
    }
  },
}
</script>

<style></style>
