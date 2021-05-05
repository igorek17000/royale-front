<template>
  <div class="w-full">
    <div class="roulette-wrapper">
      <div class="selector"></div>
      <div class="wheel"></div>
    </div>
    <div>
      <button @click="clickRandom()">Spin Wheel</button>
    </div>
    <Bets />
    <Table />
  </div>
</template>

<script>
import Bets from './Bets.vue'
import Table from './Table.vue'
export default {
  components: { Bets, Table },
  ssr: false,
  head: {
    script: [
      { hid: 'jquery', src: 'https://code.jquery.com/jquery-3.3.1.min.js' },
    ],
  },

  data() {
    return {
      balance: this.$auth.user.balance,
    }
  },
  mounted() {
    this.initWheel()
  },
  methods: {
    clickRandom(outcome) {
      const nr = parseInt(outcome)
      this.spinWheel(nr)
    },

    initWheel() {
      var $wheel = $('.roulette-wrapper .wheel'),
        row = ''

      row += "<div class='row'>"
      row += "  <div class='card red'>1</div>"
      row += "  <div class='card black'>14</div>"
      row += "  <div class='card red'>2</div>"
      row += "  <div class='card black'>13</div>"
      row += "  <div class='card red'>3</div>"
      row += "  <div class='card black'>12</div>"
      row += "  <div class='card red'>4</div>"
      row += "  <div class='card green'>0</div>"
      row += "  <div class='card black'>11</div>"
      row += "  <div class='card red'>5</div>"
      row += "  <div class='card black'>10</div>"
      row += "  <div class='card red'>6</div>"
      row += "  <div class='card black'>9</div>"
      row += "  <div class='card red'>7</div>"
      row += "  <div class='card black'>8</div>"
      row += '</div>'

      for (var x = 0; x < 29; x++) {
        $wheel.append(row)
      }
    },
    spinWheel() {
      var $wheel = $('.roulette-wrapper .wheel')
      var order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4]
      // number output
      const roll = order[Math.floor(Math.random() * order.length)]
      console.log(roll)
      var position = order.indexOf(roll)

      //determine position where to land
      var rows = 12,
        card = 75 + 3 * 2,
        landingPosition = rows * 15 * card + position * card

      var randomize = Math.floor(Math.random() * 75) - 75 / 2
      // var randomize = order[Math.floor(Math.random() * order.length)]

      landingPosition = landingPosition + randomize
      var object = {
        x: Math.floor(Math.random() * 50) / 100,
        y: Math.floor(Math.random() * 20) / 100,
      }

      $wheel.css({
        'transition-timing-function':
          'cubic-bezier(0,' + object.x + ',' + object.y + ',1)',
        'transition-duration': '6s',
        transform: 'translate3d(-' + landingPosition + 'px, 0px, 0px)',
      })

      setTimeout(function () {
        $wheel.css({
          'transition-timing-function': '',
          'transition-duration': '',
        })

        var resetTo = -(position * card + randomize)
        $wheel.css('transform', 'translate3d(' + resetTo + 'px, 0px, 0px)')
      }, 6 * 1000)
      setTimeout(function () {}, 6150)
    },
  },
}
</script>

<style >
@import url('~/assets/css/games/roulette/horizontal.css');
</style>