const state = () => ({
  gamelist: [],
})

const getters = {}

const mutations = {
  SET_GAME_LIST(state, gameList) {
    state.gamelist = gameList
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
