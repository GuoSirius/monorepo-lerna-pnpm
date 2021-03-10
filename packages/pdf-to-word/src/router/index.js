import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

import routes from './routes'

const BASE_URL = process.env.BASE_URL

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory(BASE_URL) : createWebHistory(BASE_URL),
  routes
});

export default router;
