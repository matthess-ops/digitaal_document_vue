<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Test</router-link> |

      <template v-if="!authenticated">
        <router-link to="/signin">Sign in</router-link> |
        <router-link to="/signup">Sign up</router-link> |
      </template>

      <template v-else>
        <template v-if="user.is_admin == false">
          <router-link to="/documents">Documents</router-link>|
          <a href="#" @click.prevent="signOut">Sign out</a>|
        </template>
        <template v-if="user.is_admin == true">
          <router-link to="/admin">Admin</router-link>|
          <a href="#" @click.prevent="signOut">Sign out</a>|
        </template>
      </template>

      <!-- <template v-else>
        <router-link to="/documents">Documents</router-link>|
        <a href="#" @click.prevent="signOut">Sign out</a>|
      </template> -->
    </div>
    <!-- {{ user.is_admin }} -->
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },

  methods: {
    ...mapActions({
      signOutAction: "auth/signOut",
    }),

    async signOut() {
      await this.signOutAction();

      this.$router.replace({ name: "SignIn" });
    },
  },
};
</script>