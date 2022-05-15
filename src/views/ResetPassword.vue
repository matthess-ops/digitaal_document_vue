<template>
  <div class="resetPassword">
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
          v-bind:class="{ 'is-invalid': status === 'failed', 'is-valid': status === 'success'}"
        />
        <div v-if="status === 'failed'" class="text-danger">
          {{ message }}
        </div>
         <div v-if="status === 'success'" class="text-success">
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
        email: "matthijn@gmail.com",
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

    ...mapActions({
      signOutAction: "auth/signOut",
    }),

    async signOut() {
      await this.signOutAction();

      this.$router.replace({ name: "SignIn" });
    },


    submit() {
      console.log("called reset password");
      axios.post(`/api/resetpassword`, this.form).then((response) => {
        console.log("email is ", response.data);
        this.status = response.data.status;
        this.message = response.data.message;
        this.signOut()

      });
    },
  },
};
</script>
