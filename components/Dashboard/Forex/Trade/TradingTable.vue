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
import axios from 'axios'

export default {
  data() {
    return {
      klines: [],
      dateNow: new Date(),
      width: 300,
      height: 300,
      tradingVue: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: 'Candles',
              data: [
                [
                  [1551128400000, 33, 37.1, 14, 14, 196],
                  [1551132000000, 13.7, 30, 6.6, 30, 206],
                  [1551135600000, 29.9, 33, 21.3, 21.8, 74],
                  [1551139200000, 21.7, 25.9, 18, 24, 140],
                  [1551142800000, 24.1, 24.1, 24, 24.1, 29],
                ],
              ],
            },
          })
        : {},
    }
  },
  created() {},
  mounted() {
    let coin = this.$route.params.coin
    this.getCoin(coin)
    this.width = this.$refs.tradeChart.clientWidth
    this.height = this.$refs.tradeChart.clientHeight
  },

  methods: {
    async getCoin(val) {
      let vm = this
      let klineData = new Date(
        this.dateNow.getFullYear(),
        this.dateNow.getMonth(),
        this.dateNow.getDate() - 7
      )
      await axios
        .get(`http://localhost:3000/forex/prices/${val}`, {
          params: {
            resampleFreq: '1min',
            startDate: this.$dayjs(klineData).format('YYYY-MM-DD'),
          },
        })
        .then((response) => {
          let { data } = response
          console.log('🚀 ~ .then ~ data', data)
          if (!data) return
          vm.klines = data.map((item) => {
            return [
              this.$dayjs(item.date).valueOf(),
              parseFloat(item.open),
              parseFloat(item.high),
              parseFloat(item.low),
              parseFloat(item.close),
            ]
          })
          console.log('🚀 ~ vm.klines=data.map ~ vm.klines', vm.klines)
          vm.tradingVue.set('chart.data', vm.klines)
          // console.log('vm tradingvue', vm.tradingVue)
        })
        .catch(function (error) {
          console.error(error)
        })
    },
  },
  computed: {
    kline() {
      return this.$store.state.forex.kline
    },
  },
  watch: {
    kline: function (val) {
      if (val) {
        this.tradingVue.update({
          candle: val,
        })
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
