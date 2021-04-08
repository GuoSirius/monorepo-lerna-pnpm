import { createStore } from 'vuex'

import uniqueId from 'lodash/uniqueId'

export default createStore({
  state: {
    keywords: '',
    refreshTime: 0
  },
  mutations: {
    setKeywords(state, keywords = '') {
      state.keywords = keywords
    },
    setRefreshTime(state, refreshTime) {
      state.refreshTime = refreshTime ?? `${Date.now()}-${uniqueId('refresh-time-')}`
    }
  },
  actions: {},
  modules: {}
})
