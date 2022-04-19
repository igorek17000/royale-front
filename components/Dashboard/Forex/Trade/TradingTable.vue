<template>
  <div ref="tradeChart" class="w-full md:w-4/5 h-trade bg-primary">
    <div class="three-line-legend">
      <h4 class="text-lg">{{ shortName }}</h4>
      <p class="">{{ legendPrice }}</p>
      <p class="">{{ legendDate }}</p>
    </div>
    <div ref="tradeView" />
  </div>
</template>

<script>
// import { createChart, CrosshairMode } from 'lightweight-charts'

export default {
  data() {
    return {
      klines: [],
      dateNow: new Date(),
      width: 300,
      height: 300,
      coin: null,
      lineSeries: [],
      legendPrice: null,
      legendDate: null,
      lastItem: {},
    }
  },
  mounted() {
    this.coin = this.$route.params.coin
    let vm = this
    let widthClient = this.$refs.tradeChart.clientWidth
    let heightClient = this.$refs.tradeChart.clientHeight

    let tradeView = this.$refs.tradeView
    const chart = this.$createChart(tradeView, {
      width: widthClient,
      height: heightClient,
      layout: {
        backgroundColor: '#131722',
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: this.$CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
        timeVisible: true,
        secondsVisible: false,
      },
    })
    this.lineSeries = chart.addAreaSeries({
      topColor: 'rgba(19, 68, 193, 0.4)',
      bottomColor: 'rgba(0, 120, 255, 0.0)',
      lineColor: '#40e094',
      lineWidth: 3,
    })
    window.addEventListener('resize', resize, false)
    this.lineSeries.applyOptions({
      priceFormat: {
        type: 'price',
        precision: 4,
        minMove: 0.0001,
      },
    })

    function resize() {
      chart.applyOptions({
        width: widthClient,
        height: heightClient,
      })

      setTimeout(() => chart.timeScale().fitContent(), 0)
    }
    this.getDailyQuotes(this.coin).then((res) => {
      this.lineSeries.setData(res)
    })
    chart.subscribeCrosshairMove((param) => {
      if (param.time !== undefined) {
        this.legendDate = new Date(param.time * 1000).toLocaleDateString()
        this.legendPrice = param.seriesPrices.get(this.lineSeries)
      }
    })
  },

  methods: {
    setLastBarText(val) {
      this.legendDate = new Date(val.time * 1000).toLocaleDateString()
      this.legendPrice = val.value
    },
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
        let close = data.indicators.quote[0].close

        for (let i = 0; i < timestamp.length; i++) {
          let time = timestamp[i]
          let price = close[i]
          let obj = {
            time: time,
            value: Number(parseFloat(price).toFixed(4)),
          }
          this.klines.push(obj)
        }

        this.lastItem = this.klines[this.klines.length - 1]

        this.setLastBarText(this.lastItem)

        return this.klines
      } catch (error) {
        console.error('error run getDailyQuotes', error)
        return error
      }
    },
  },
  computed: {
    shortName() {
      return this.$store.state.trade.coinMeta.name
    },
    coinData() {
      return this.$store.state.trade.coin
    },
  },
  watch: {
    coinData: {
      handler: function (val) {
        if (val) {
          const payload = {
            time: Number(val.timestamp / 1000),
            value: parseFloat(val.price).toFixed(4),
          }
          if (this.lastItem.time < payload.time) {
            // this.lineSeries.appendData(payload)
            this.lineSeries.update(payload)
          }
          this.lastItem = payload
          this.setLastBarText(this.lastItem)
        }
      },
      deep: true,
    },
  },
}
</script>
<style scoped>
.h-trade {
  height: 550px;
}
.three-line-legend {
  position: absolute;
  z-index: 999;
  color: #fff;
  padding: 15px;
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
