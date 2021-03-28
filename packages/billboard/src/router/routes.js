import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout/Layout.vue'),
    meta: {
      title: '布局页面'
    },
    children: [
      {
        path: '',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/index/Index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'unfinished',
        name: 'unfinished',
        component: () => import(/* webpackChunkName: "unfinished" */ '@/views/unfinished/Unfinished.vue'),
        meta: { title: '未完成看板' }
      },
      {
        path: 'completed',
        name: 'completed',
        component: () => import(/* webpackChunkName: "completed" */ '@/views/completed/Completed.vue'),
        meta: { title: '已完成看板' }
      }
    ]
  },
  {
    path: '/lists',
    name: 'lists',
    component: () => import(/* webpackChunkName: "lists" */ '@/views/lists/Lists.vue'),
    props: route => ({ ...route.query, ...route.params }),
    meta: { title: '看板任务列表' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

export default routes
