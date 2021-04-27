const state = () => ({
  menu: [],
})

const getters = {}

const mutations = {
  SET_SIDEBAR(state, getData) {
    state.menu = getData
  },
  user(state, user) {
    state.auth.user = user
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
  loadSidebar({ commit }, state) {
    // await this.$axios
    //   .get(`/${state.url}?page=${state.page}`, {
    //     headers: {
    //       Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then((r) => r.data.data)
    // .then((getData) => {
    commit('SET_SIDEBAR', state)
    // })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
