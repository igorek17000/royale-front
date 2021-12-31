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
    // setInterval(() => {
    //   this.tradingVue.update({
    //     candle: [1640531820000, 50114.9, 50114.9, 50114.9, 50114.9, 50114.9],
    //   })

    //   console.log('🚀 ~ setTimeout ~ this.tradingVue', this.tradingVue)
    // }, 2000)
  },

  methods: {
    async getCoin(val) {
      let vm = this
      await axios
        .get(
          `https://api.binance.com/api/v3/klines?symbol=${val.toUpperCase()}&interval=1m`
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
          let { data } = response

          vm.klines = data.map((item) => {
            return [
              item[0],
              parseFloat(item[1]),
              parseFloat(item[2]),
              parseFloat(item[3]),
              parseFloat(item[4]),
              parseFloat(item[5]),
            ]
          })
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
      return this.$store.state.trade.kline
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
@media only screen and (min-width: 1336px) {
  .h-trade {
    height: 350px;
  }
}
@media only screen and (min-width: 1600px) {
  .h-trade {
    height: 400px;
  }
}
@media only screen and (min-width: 1600px) {
  .h-trade {
    height: 500px;
  }
}
</style>