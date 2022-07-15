import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/Goods.vue'),
        meta: {
          isShow: true,
          title: '商品列表',
        },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../views/User.vue'),
        meta: {
          isShow: true,
          title: '用户列表',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
