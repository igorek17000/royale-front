const state = () => ({
  menu: [],
  menuDashboard: [],
  footerMenu: [],
  userMenu: [],
})

const getters = {}

const mutations = {
  SET_SIDEBAR(state, getData) {
    state.menu = getData
  },
  SET_MENU(state, getData) {
    state.menuDashboard = getData
  },
  SET_FOOTER(state, getData) {
    state.footerMenu = getData
  },
  SET_USER(state, getData) {
    state.userMenu = getData
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
  loadMenu({ commit }, state) {
    commit('SET_MENU', state)
  },
  loadMenuFooter({ commit }, state) {
    commit('SET_FOOTER', state)
  },
  loadUserMenu({ commit }, state) {
    commit('SET_USER', state)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
