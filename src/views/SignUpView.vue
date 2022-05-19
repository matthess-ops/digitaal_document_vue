



<template>
  <div class="container">
    <!-- <form action="#" @submit.prevent="submit"> -->
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
    {{ errors }}
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        firstname: "",
        lastname: "nieuw",
        email: "nieuw@gmail.com",
        password: "password",
      },
      errors: {},
      succes: undefined,
    };
  },

  methods: {
    signUpForm() {
      this.errors = {};
      console.log("signUpForm called");
      console.log(this.form);
      axios
        .post("/api/signup", this.form)
        .then((response) => {
          console.log(response);
          console.log(response.status);
          if (response.status === 200) {
            if (response.data.status == "success") {
              // router link to sign in doen hier
              this.$router.push({ name: 'SignInView' })
            }
            if (response.data.status == "failed") {
              console.log("form errros found");
              this.errors = response.data.errors;
            }
          } else {
            console.log("server error ", response.status);
          }
        })
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
  h1 {
    color: red;
  }
  .container {
    max-width: 50%;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    color: green;
  }
  .container {
    max-width: 50%;
  }
}
</style>