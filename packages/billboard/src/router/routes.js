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
    path: '/lists/:billboardId',
    name: 'lists',
    component: () => import(/* webpackChunkName: "lists" */ '@/views/lists/Lists.vue'),
    props: route => ({ ...route.query, ...route.params }),
    meta: { title: '看板任务列表' }
  }
]

export default routes
