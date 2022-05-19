<template>
  <div class="container max-width: 70% !important">
    <form action="#" @submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email adres</label>
        <input
          v-model="form.email"
          type="email"
          name="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-bind:class="{ 'is-invalid': loginError === true }"
        />
        <div v-if="loginError === true" class="text-danger">
          Email/wachtwoord combinatie is niet bekend.
        </div>
      </div>
      <div class="form-group">
        <label for="password">Wachtwoord</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Wachtwoord"
          v-bind:class="{ 'is-invalid': loginError === true }"
        />
        <div v-if="loginError === true" class="text-danger">
          Email/wachtwoord combinatie is niet bekend.
        </div>
      </div>

      <!-- <button type="submit" class="btn btn-primary">Log in</button> -->
    </form>
    <div class="mt-2">
    <button class=" btn btn-primary " @click="login()">Log in</button>

    <button
      class=" ms-2 btn btn-primary"
      @click="$router.push({ name: 'ResetPassword' })"
    >
      Reset Wachtwoord
    </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "SignIn",

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loginError: false,
    };
  },

  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),

    resetPassword() {
      console.log("called reset password");
      axios.post(`/api/resetpassword`, this.form).then((response) => {
        if (response.status == 200) {
          this.documents = response.data;
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },

    async login() {
      try {
        await this.signIn(this.form);
        this.loginError = false;
        if (this.$store.state.auth.user.is_admin) {
          this.$router.replace({ name: "AdminUsersView" });
        } else {
          this.$router.replace({ name: "UserDocumentsView" });
        }
      } catch (error) {
        this.loginError = true;
      }
    },

  
  },
};
</script>