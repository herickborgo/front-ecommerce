import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/app/Theme/Layout'
import importByFile from '@/util/import-by-file'

Vue.use(Router)

let routes = importByFile(require.context('../app/', true, /\.js$/), 'Router.js')
let baseRoutes = [
  {
    path: '/',
    component: Layout,
    meta: { authorization: true },
    beforeEnter: function (to, from, next) {
      const serialized = localStorage.getItem('Authorization')

      if (!serialized && to.meta.authorization) {
        localStorage.setItem('rollback-uri', to.fullPath)
        next('/login')
      } else {
        next()
      }
    },
    children: []
  }
]

routes.forEach(route => {
  if (route.outside) {
    delete route.outside
    return baseRoutes.push(route)
  }

  baseRoutes[0].children.push(route)
})

const router = new Router({
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes: baseRoutes
})

router.beforeEach((to, from, next) => {
  const authorization = localStorage.getItem('user')

  if (to.meta.requireAuth && !authorization) {
    localStorage.setItem('rollback-uri', to.fullPath)
    next('/login')
  }

  next()
})

export default router
