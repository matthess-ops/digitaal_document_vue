import Vue from "vue";
import VueRouter from "vue-router";
// import Test from "../views/TestView.vue";
import SignInView from "../views/SignInView.vue";
import UserDocumentsView from "../views/UserDocumentsView.vue";
import SignUpView from "../views/SignUpView.vue";
import AdminUsersView from "../views/AdminUsersView.vue";
import AdminUserDocumentsView from "../views/AdminUserDocumentsView.vue";
import AdminUserSigningView from "../views/AdminUserSigningView.vue";
import ResetPassword from "../views/ResetPassword.vue";
import AdminSignedStatusView from "../views/AdminSignedStatusView.vue";
import UserSignedDocumentsView from "../views/UserSignedDocumentsView.vue";

import store from "../store";

Vue.use(VueRouter);
// kan to,from niet verwijderen uit beforeEnter: (to, from, next) ivm errors


const routes = [
  {
    path: "/user-signed-documents",
    name: "UserSignedDocumentsView",
    component: UserSignedDocumentsView,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {

      if (store.state.auth.user.is_admin != null) {
        if (store.state.auth.user.is_admin == false) {
          next();
        } else {
          next({ name: "AdminUsersView" });
        }
      }
    },
  },
  {
    path: "/admin-user-documents/:id",
    name: "AdminUserDocumentsView",
    component: AdminUserDocumentsView,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user.is_admin != null) {
        if (store.state.auth.user.is_admin) {
          next();
        } else {
          next({ name: "UserDocumentsView" });
        }
      }
    },
  },
  {
    path: "/admin-user-signing/:userid/:documentid/:filename",
    name: "AdminUserSigningView",
    component: AdminUserSigningView,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user.is_admin != null) {
        if (store.state.auth.user.is_admin) {
          next();
        } else {
          next({ name: "UserDocumentsView" });
        }
      }
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
    path: "/admin-signed-status-view",
    name: "AdminSignedStatusView",
    component: AdminSignedStatusView,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user.is_admin != null) {
        if (store.state.auth.user.is_admin) {
          next();
        } else {
          next({ name: "UserDocumentsView" });
        }
      }
    },
  },
  {
    path: "/admin-users-view",
    name: "AdminUsersView",
    component: AdminUsersView,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user.is_admin != null) {
        if (store.state.auth.user.is_admin) {
          next();
        } else {
          next({ name: "UserDocumentsView" });
        }
      }
    },
  },
  {
    path: "/signup",
    name: "SignUpView",
    component: SignUpView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signin",
    name: "SignInView",
    component: SignInView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/user-documents",
    name: "UserDocumentsView",
    component: UserDocumentsView,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {

      if (store.state.auth.user.is_admin != null) {
        if (store.state.auth.user.is_admin == false) {
          next();
        } else {
          next({ name: "AdminUsersView" });
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
    next({ name: "SignInView" });
  } else {
    next();
  }
});

export default router;
