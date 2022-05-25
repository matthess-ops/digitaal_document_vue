<template>
  <div class="container">
    <!-- signup form -->
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

    </form>
    <div class="mt-2">
    <button class=" btn btn-primary " @click="login()">Log in</button>
    <!-- reset password button -->
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
    //vuex sign in function
    ...mapActions({
      signIn: "auth/signIn",
    }),

    // resetPassword() {
    //   axios.post(`/api/resetpassword`, this.form).then((response) => {
    //     if (response.status == 200) {
    //       this.documents = response.data;
    //     } else {
    //       console.log("Error occurred " + response.data.status);
    //     }
    //     this.loading = false;
    //   });
    // },

    // login function
    // if login is a failure because email or password combo is incorrect show the user an error
    // then check if the user is an admin or a user an redirect them to their correspondig main pages.
    async login() {
      try {
        await this.signIn(this.form);
        this.loginError = false;
        if (this.$store.state.auth.user.is_admin) {
          this.$router.replace({ name: "AdminUsersView" }); // admin redirect
        } else {
          this.$router.replace({ name: "UserDocumentsView" }); // user redirect
        }
      } catch (error) { // email password combo not found 
        this.loginError = true;
      }
    },

  
  },
};
</script>



<style scoped>
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}
/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .container {
    max-width: 50%;
  }
}
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {

  .container {
    max-width: 50%;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {

  .container {
    max-width: 50%;
  }
}
</style>