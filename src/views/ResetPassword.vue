<template>
  <div>
    <!-- reset password form -->
    <form action="#" @submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          v-model="form.email"
          type="text"
          name="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-bind:class="{ 'is-invalid': status === 'failed' }"
        />
        <div v-if="status === 'failed'" class="text-danger">
          {{ message }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Send</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
      },
      message: "",
      status: "",
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    // import vuex signout action
    ...mapActions({
      signOutAction: "auth/signOut",
    }),
    // sign out function. After resetting password this function is called
    // to sign the user out and is then directed to the sign in view. Signing out
    // is needed because else the password reset wont work
    async signOut() {
      await this.signOutAction();

      this.$router.replace({ name: "SignInView" });
    },

    submit() {
      axios.post(`/api/resetpassword`, this.form).then((response) => {
        this.status = response.data.status;
        this.message = response.data.message;
        if (this.status == "success") { //only sign out when the reset password email link is send
          this.signOut();
        }
      });
    },
  },
};
</script>
