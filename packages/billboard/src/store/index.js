import { createStore } from 'vuex'

import uniqueId from 'lodash/uniqueId'

export default createStore({
  state: {
    name: '',
    refreshTime: 0
  },
  mutations: {
    setName(state, name = '') {
      state.name = name
    },
    setRefreshTime(state, refreshTime) {
      state.refreshTime = refreshTime ?? `${Date.now()}-${uniqueId('refresh-time-')}`
    }
  },
  actions: {},
  modules: {}
})
