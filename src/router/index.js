import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../views/TestView.vue'
import SignIn from '../views/SignIn.vue'
import Documents from '../views/DocumentsView.vue'
import SignUp from '../views/SignUp.vue'

import Admin from '../views/AdminView.vue'
import UserUpload from '../views/UserUpload.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/user/:id',
    name: 'UserUpload',
    component: UserUpload,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Test',
    component: Test,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/documents',
    name: 'Documents',
    component: Documents,
    meta: {
      requiresAuth: true
    }
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth == true && router.app.$store.state.auth.authenticated == false) {
    next({ name: 'Documents' })


  } else {
    next()
  }



})


export default router