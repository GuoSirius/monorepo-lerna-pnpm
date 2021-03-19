<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |<router-link to="/about">About</router-link> |
      <router-link to="/water-pipe">WaterPipe</router-link> |
      <router-link to="/canvas-dashboard">CanvasDashboard</router-link>
    </div>
    <div id="appContent"><router-view /></div>
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#appContent {
  height: calc(100% - 80px);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
