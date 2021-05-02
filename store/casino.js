const state = () => ({
  gamelist: [],
})

const getters = {}

const mutations = {
  SET_GAMELIST(state, getData) {
    state.gamelist = getData
  },
}

const actions = {
  // nuxtServerInit({ commit }, { $gates, $auth }) {
  //   const user = $auth.user
  //   if (user) {
  //     $gates.setRoles(user.role)
  //     $gates.setPermissions(user.permissions)
  //     commit('user', user)
  //   }
  // },
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
