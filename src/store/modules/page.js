const state = {
  routeAnimatedEffect: 'ios',
  drawerShow: false,
  drawerDirection: 'left'
}

const mutations = {
  routeAnimatedEffect(state, value) {
    state.routeAnimatedEffect = value
  },
  drawerShow(state, data) {
    state.drawerShow = data.show
    state.drawerDirection = data.direction
  }
}

export default {
  state,
  mutations,
  namespaced: true
}
