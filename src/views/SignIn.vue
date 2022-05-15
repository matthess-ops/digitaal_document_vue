<template>
  <div>
    <!-- <form action="#" @submit.prevent="submit">
    <div>
      <label for="email">Email address</label>
      <input type="text" name="email" id="email" v-model="form.email">
    </div>
    <div>
      <label for="password">Password</label>
      <input type="text" name="password" id="password" v-model="form.password">
    </div>
    <div>
      <button type="submit">
        Sign in
      </button>
    </div>
    {{this.$store.state.auth.user  }}
  </form> -->

    <form action="#" @submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email address</label>
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
          Email/Username is incorrect
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-bind:class="{ 'is-invalid': loginError === true }"
        />
        <div v-if="loginError === true" class="text-danger">
          Email/Username is incorrect
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Loging</button>
    </form>
    <button
      class="btn btn-primary"
      @click="$router.push({ name: 'ResetPassword' })"
    >
      Reset Password
    </button>
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

    async submit() {



      try {
        await this.signIn(this.form);
        this.loginError = false;

        if (this.$store.state.auth.user.is_admin) {
          this.$router.replace({ name: "Admin" });
        } else {
          this.$router.replace({ name: "Documents" });
        }
      } catch (error) {
        console.log("error while logging in wrong user/password");
        this.loginError = true;
      }
    },
  },
};
</script>