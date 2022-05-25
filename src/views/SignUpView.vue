



<template>
  <div class="container">
    <!-- sign up form, do not change to <form> because is resulted in weird behaviour-->
    <div class="form-group">
      <label for="firstname">Voornaam</label>
      <input
        v-model="form.firstname"
        type="firstname"
        name="firstname"
        class="form-control"
        id="firstname"
        aria-describedby="firstnameHelp"
        placeholder="Voornaam"
        v-bind:class="{ 'is-invalid': errors.firstname != null }"
      />
    </div>
    <div v-if="errors.firstname != null" class="text-danger">
      {{ errors.firstname[0] }}
    </div>

    <div class="form-group">
      <label for="lastname">Achternaam</label>
      <input
        v-model="form.lastname"
        type="lastname"
        name="lastname"
        class="form-control"
        id="lastname"
        aria-describedby="lastnameHelp"
        placeholder="Achternaam"
        v-bind:class="{ 'is-invalid': errors.lastname != null }"
      />
    </div>
    <div v-if="errors.lastname != null" class="text-danger">
      {{ errors.lastname[0] }}
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        v-model="form.email"
        type="email"
        name="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        placeholder="Email"
        v-bind:class="{ 'is-invalid': errors.email != null }"
      />
    </div>
    <div v-if="errors.email != null" class="text-danger">
      {{ errors.email[0] }}
    </div>
    <div class="form-group">
      <label for="password">Wachtwoord</label>
      <input
        v-model="form.password"
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
        v-bind:class="{ 'is-invalid': errors.password != null }"
      />
    </div>
    <div v-if="errors.password != null" class="text-danger">
      {{ errors.password[0] }}
    </div>
    <button class="btn btn-primary" @click="signUpForm()">Aanmaken</button>
  </div>
</template>


<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },

  methods: {
    // import vuex signout action
    ...mapActions({
      signOutAction: "auth/signOut",
    }),

    async signOut() {
      await this.signOutAction();

      this.$router.replace({ name: "SignInView" });
    },
    // sign up function
    // after an successfull signup log-out then redirect to login page
    // log-out is needed because the sanctum api key needs to be reset if any previous users used the same browser page
    signUpForm() {
      this.errors = {};

      axios.post("/api/signup", this.form).then((response) => {
        if (response.status === 200) {
          if (response.data.status == "success") {
            this.signOut();

            // router link to sign in doen hier
            this.$router.push({ name: "SignInView" });
          }
          if (response.data.status == "failed") {
            console.log("form errros found");
            this.errors = response.data.errors;
          }
        } else {
          console.log("server error ", response.status);
        }
      });
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