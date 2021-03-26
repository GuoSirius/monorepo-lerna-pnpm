export default {
  namespaced: true,
  state() {
    return {
      deviceStatus: {}
    }
  },
  mutations: {
    setDeviceStatus(state, deviceStatus = {}) {
      state.deviceStatus = deviceStatus
    }
  }
}
