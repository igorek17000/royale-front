<template>
  <div class="w-full">
    <canvas id="canvas" class="ani_hack" width="1500" height="640"> </canvas>
    <!-- <div data-orientation="landscape" class="orientation-msg-container">
      <p class="orientation-msg-text">Please rotate your device</p>
    </div> -->
    <div
      id="block_game"
      style="
        position: fixed;
        background-color: transparent;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: none;
      "
    ></div>
  </div>
</template>

<script>
export default {
  head: {
    css: [
      { src: '/slots/css/reset.css' },
      { src: '/slots/css/main.css' },
      { src: '/slots/css/orientation_utils.css' },
      { src: '/slots/css/ios_fullscreen.css' },
    ],
    script: [
      { src: '/slots/js/jquery-3.2.1.min.js' },
      { src: '/slots/js/createjs-2015.11.26.min.js' },
      { src: '/slots/js/howler.min.js' },
      { src: '/slots/js/main.js' },
    ],
    // bodyAttrs: {
    //   ondragstart: 'return false',
    //   ondrop: 'return false',
    // },
  },

  data() {
    return {
      balance: this.$auth.user.balance,
    }
  },
  mounted() {
    const userBalance = this.balance
    $(document).ready(function () {
      var oMain = new CMain({
        win_occurrence: 30, //WIN PERCENTAGE.SET A VALUE FROM 0 TO 100.
        slot_cash: 0, //THIS IS THE CURRENT SLOT CASH AMOUNT. THE GAME CHECKS IF THERE IS AVAILABLE CASH FOR WINNINGS.
        min_reel_loop: 2, //NUMBER OF REEL LOOPS BEFORE SLOT STOPS
        reel_delay: 4, //NUMBER OF FRAMES TO DELAY THE REELS THAT START AFTER THE FIRST ONE
        time_show_win: 2000, //DURATION IN MILLISECONDS OF THE WINNING COMBO SHOWING
        time_show_all_wins: 2000, //DURATION IN MILLISECONDS OF ALL WINNING COMBO
        money: userBalance, //STARING CREDIT FOR THE USER

        /***********PAYTABLE********************/
        //EACH SYMBOL PAYTABLE HAS 5 VALUES THAT INDICATES THE MULTIPLIER FOR X1,X2,X3,X4 OR X5 COMBOS
        paytable_symbol_1: [0, 0, 100, 150, 200], //PAYTABLE FOR SYMBOL 1
        paytable_symbol_2: [0, 0, 50, 100, 150], //PAYTABLE FOR SYMBOL 2
        paytable_symbol_3: [0, 10, 25, 50, 100], //PAYTABLE FOR SYMBOL 3
        paytable_symbol_4: [0, 10, 25, 50, 100], //PAYTABLE FOR SYMBOL 4
        paytable_symbol_5: [0, 5, 15, 25, 50], //PAYTABLE FOR SYMBOL 5
        paytable_symbol_6: [0, 2, 10, 20, 35], //PAYTABLE FOR SYMBOL 6
        paytable_symbol_7: [0, 1, 5, 10, 15], //PAYTABLE FOR SYMBOL 7
        /*************************************/
        fullscreen: false, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
        check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
        show_credits: true, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
        //
      })

      $(oMain).on('start_session', function (evt) {
        if (getParamValue('ctl-arcade') === 'true') {
          parent.__ctlArcadeStartSession()
        }
        //...ADD YOUR CODE HERE EVENTUALLY
      })

      $(oMain).on('end_session', function (evt) {
        if (getParamValue('ctl-arcade') === 'true') {
          parent.__ctlArcadeEndSession()
        }
        //...ADD YOUR CODE HERE EVENTUALLY
      })

      $(oMain).on('bet_placed', function (evt, oBetInfo) {
        var iBet = oBetInfo.bet
        var iTotBet = oBetInfo.tot_bet
        //...ADD YOUR CODE HERE EVENTUALLY
      })

      $(oMain).on('save_score', function (evt, iMoney) {
        if (getParamValue('ctl-arcade') === 'true') {
          parent.__ctlArcadeSaveScore({ score: iMoney })
        }
        //...ADD YOUR CODE HERE EVENTUALLY
      })

      $(oMain).on('show_preroll_ad', function (evt) {
        //...ADD YOUR CODE HERE EVENTUALLY
      })

      $(oMain).on('show_interlevel_ad', function (evt) {
        if (getParamValue('ctl-arcade') === 'true') {
          parent.__ctlArcadeShowInterlevelAD()
        }
        //...ADD YOUR CODE HERE EVENTUALLY
      })

      $(oMain).on('share_event', function (evt, iScore) {
        if (getParamValue('ctl-arcade') === 'true') {
          parent.__ctlArcadeShareEvent({
            img: TEXT_SHARE_IMAGE,
            title: TEXT_SHARE_TITLE,
            msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
            msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1,
          })
        }
      })

      if (isIOS()) {
        setTimeout(function () {
          sizeHandler()
        }, 200)
      } else {
        sizeHandler()
      }
    })
  },
}
</script>

<style>
</style>