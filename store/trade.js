const state = () => ({
  tradeBook: [],
  kline: null,
  coinPrice: 0,
  coinBalance: 0,
  coinRefresh: false,
  liveCoinPrice: 0,
  leverage: 100,
})

const getters = {}

const mutations = {
  SET_TRADEBOOK(state, data) {
    state.tradeBook = data
  },
  NEW_TRADE(state, data) {
    state.tradeBook.unshift(data)
    state.tradeBook.splice(-1)
  },
  NEW_KLINE(state, data) {
    state.kline = data
  },
  SET_COIN_PRICE(state, data) {
    state.coinPrice = data
  },
  LIVE_COIN_PRICE(state, data) {
    state.liveCoinPrice = data
  },
  SET_COIN_BALANCE(state, data) {
    if (data) {
      state.coinBalance = data[0].balance
    } else {
      state.coinBalance = 0
    }
  },
  REFRESH_COIN(state) {
    state.coinRefresh = !state.coinRefresh
  },
}

const actions = {
  async loadGamelist({ commit }, state) {
    // await this.$axios
    //   .get(`/${state.url}?page=${state.page}`, {
    //     headers: {
    //       Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then((r) => r.data.data)
    // .then((getData) => {
    commit('SET_GAMELIST', state)
    // })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
