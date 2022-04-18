<template>
  <div ref="tradeChart" class="w-full md:w-4/5 h-trade bg-primary">
    <trading-vue
      :data="tradingVue"
      :titleTxt="$route.params.coin.toUpperCase()"
      :toolbar="true"
      :width="this.width"
      :height="this.height"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      klines: [],
      dateNow: new Date(),
      width: 300,
      height: 300,
      coin: null,
      tradingVue: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: 'Candles',
              data: [],
            },
          })
        : {},
    }
  },
  created() {},
  mounted() {
    this.coin = this.$route.params.coin
    this.width = this.$refs.tradeChart.clientWidth
    this.height = this.$refs.tradeChart.clientHeight

    this.getDailyQuotes(this.coin).then((res) => {
      console.log('🚀 ~ mounted ~ updates', res)
      this.tradingVue.set('chart.data', this.klines)
    })
  },

  methods: {
    async getDailyQuotes(val) {
      try {
        let payload = {
          symbol: val,
        }
        const { data } = await this.$axios.post('/finance/forex', payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })

        let timestamp = data.timestamp
        let open = data.indicators.quote[0].open
        let close = data.indicators.quote[0].close
        let high = data.indicators.quote[0].high
        let low = data.indicators.quote[0].low
        let volume = data.indicators.quote[0].volume

        for (let i = 0; i < timestamp.length; i++) {
          let time = `${timestamp[i]}000`
          let openIndex = open[i]
          let closeIndex = close[i]
          let highIndex = high[i]
          let lowIndex = low[i]
          let volumeIndex = volume[i]

          this.klines.push([
            parseInt(time),
            parseFloat(openIndex),
            parseFloat(highIndex),
            parseFloat(lowIndex),
            parseFloat(closeIndex),
            parseFloat(volumeIndex),
          ])
        }

        return this.klines
      } catch (error) {
        console.log('error run getDailyQuotes', error)
        return error
      }
    },
  },
}
</script>
<style scoped>
.h-trade {
  height: 550px;
}
@media only screen and (min-width: 768px) {
  .h-trade {
    height: 350px;
  }
}
@media only screen and (min-width: 1280px) {
  .h-trade {
    height: 350px;
  }
}
@media only screen and (min-width: 1336px) {
  .h-trade {
    height: 400px;
  }
}
@media only screen and (min-width: 1600px) {
  .h-trade {
    height: 540px;
  }
}
</style>
