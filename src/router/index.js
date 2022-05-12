import Vue from "vue";
import VueRouter from "vue-router";
import Test from "../views/TestView.vue";
import SignIn from "../views/SignIn.vue";
import Documents from "../views/DocumentsView.vue";
import SignUp from "../views/SignUp.vue";
import Admin from "../views/AdminView.vue";
import UserUpload from "../views/UserUpload.vue";
import ResetPassword from "../views/ResetPassword.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user/:id",
    name: "UserUpload",
    component: UserUpload,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "Test",
    component: Test,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      console.log("check if admin then continue to admin")
      if (store.state.auth.user.is_admin != null) {
        if (store.state.auth.user.is_admin) {
          next();
        } else {
          next({ name: "Documents" });
        }
      }
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/documents",
    name: "Documents",
    component: Documents,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      console.log("check if user then continue to documents")

      if (store.state.auth.user.is_admin != null) {
        if (store.state.auth.user.is_admin == false) {
          next();
        } else {
          next({ name: "Admin" });
        }
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log("is this user admin ", store.state.auth.user.is_admin);
  if (
    to.meta.requiresAuth == true &&
    router.app.$store.state.auth.authenticated == false
  ) {
    next({ name: "SignIn" });
  } else {
    next();
  }
});

export default router;
