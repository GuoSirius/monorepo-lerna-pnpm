import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/water-pipe',
    name: 'WaterPipe',
    component: () => import(/* webpackChunkName: "water-pipe" */ '../views/water-pipe/WaterPipe.vue')
  },
  {
    path: '/canvas-dashboard',
    name: 'CanvasDashboard',
    component: () => import(/* webpackChunkName: "canvas-dashboard" */ '../views/canvas-dashboard/CanvasDashboard.vue')
  }
]

export default routes
