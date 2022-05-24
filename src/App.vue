<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">DocViewer</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- <li class="nav-item">
            <router-link
              v-bind:class="{ active: this.$route.name === 'Test' }"
              class="nav-link"
              to="/"
              >Test
            </router-link>
          </li> -->
          <template v-if="!authenticated">
            <router-link
              v-bind:class="{ active: this.$route.name === 'SignInView' }"
              class="nav-link"
              :to="{ name: 'SignInView' }"
              >Sign in</router-link
            >
            <router-link
              v-bind:class="{ active: this.$route.name === 'SignUpView' }"
              class="nav-link"
              :to="{ name: 'SignUpView' }"
              >Sign up</router-link
            >
          </template>

          <template v-else>
            <template v-if="user.is_admin == false">
              <router-link
                v-bind:class="{
                  active: this.$route.name === 'UserDocumentsView',
                }"
                class="nav-link"
                :to="{ name: 'UserDocumentsView' }"
                >Documenten</router-link
              >

                <router-link
                v-bind:class="{
                  active: this.$route.name === 'UserSignedDocumentsView',
                }"
                class="nav-link"
                :to="{ name: 'UserSignedDocumentsView' }"
                >Ondertekenen</router-link
              >

              <!-- UserSignedDocumentsView -->
            </template>
            <template v-if="user.is_admin == true">
              <router-link
                v-bind:class="{
                  active: this.$route.name === 'AdminUsersView',
                }"
                class="nav-link"
                :to="{ name: 'AdminUsersView' }"
                >Admin</router-link
              >
                 <router-link
                v-bind:class="{
                  active: this.$route.name === 'AdminSignedStatusView',
                }"
                class="nav-link"
                :to="{ name: 'AdminSignedStatusView' }"
                >Signed status</router-link
              >
            </template>

            <a class="nav-link" href="#" @click.prevent="signOut">Sign out</a>
          </template>
        </ul>
      </div>
    </nav>
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

      this.$router.replace({ name: "SignInView" });
    },
  },
};
</script>