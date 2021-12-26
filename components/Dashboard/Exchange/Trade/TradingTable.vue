<template>
  <trading-vue
    :data="tradingVue"
    :width="this.width"
    :height="this.height"
    :titleTxt="$route.params.coin.toUpperCase()"
    :toolbar="true"
  />
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      tradingVue: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: 'Candles',
              data: [
                [1551128400000, 33, 37.1, 14, 14, 196],
                [1551132000000, 13.7, 30, 6.6, 30, 206],
                [1551135600000, 29.9, 33, 21.3, 21.8, 74],
                [1551139200000, 21.7, 25.9, 18, 24, 140],
                [1551142800000, 24.1, 24.1, 24, 24.1, 29],
              ],
            },
          })
        : {},
      width: 960,
      height: 480,
    }
  },

  mounted() {
    this.getCoin()
  },

  methods: {
    async getCoin() {
      let vm = this
      await axios
        .get(
          'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h'
          // {
          //   params: {
          //     adjusted: false,
          //     sort: 'asc',
          //   },
          //   headers: {
          //     Authorization: 'Bearer OmrU2lqAJQSMeKMI0XdPRBx2REfKzhHn',
          //   },
          // }
        )
        .then(function (response) {
          console.log('res here', response.data)
          // vm.tradingVue.data.chart.data = response.data
          // console.log('vm tradingvue', vm.tradingVue)
        })
        .catch(function (error) {
          console.error(error)
        })
    },
  },
}
</script>