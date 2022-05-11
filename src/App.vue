<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Documenten</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Test</router-link>
          </li>
          <template v-if="!authenticated">
            <router-link class="nav-link" to="/signin">Sign in</router-link>
            <router-link class="nav-link" to="/signup">Sign up</router-link>
          </template>

          <template v-else>
            <template v-if="user.is_admin == false">
              <router-link class="nav-link" to="/documents"
                >Documents</router-link
              >
            </template>
            <template v-if="user.is_admin == true">
              <router-link class="nav-link" to="/admin"
                >Admin</router-link
              >
            </template>
            <a class="nav-link" href="#" @click.prevent="signOut">Sign out</a>
          </template>
        </ul>
      </div>
      <!-- {{ user.is_admin }} -->
    </nav>

    <!-- <div id="nav">
      <router-link to="/">Test</router-link> |

      <template v-if="!authenticated">
        <router-link to="/signin">Sign in</router-link> |
        <router-link to="/signup">Sign up</router-link> |
      </template>

      <template v-else>
        <template v-if="user.is_admin == false">
          <router-link to="/documents">Documents</router-link>
          <a href="#" @click.prevent="signOut">Sign out</a>
        </template>
        <template v-if="user.is_admin == true">
          <router-link to="/admin">Admin</router-link>
          <a href="#" @click.prevent="signOut">Sign out</a>|
        </template>
      </template>

  
    </div> -->
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