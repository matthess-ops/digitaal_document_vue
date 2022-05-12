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
        />
      </div>

      <button type="submit" class="btn btn-primary">Send</button>
    </form>
  </div>
</template>


<script>
import { axios as newaxios } from 'axios';
export default {
  data() {
    return {
      form: {
        email: "matthijn@gmail.com",
      },
      message: "",

    };
  },
  computed: {},
  methods: {
      submit() {
      console.log("called reset password");
      axios.post(`/api/resetpassword`, this.form).then((response) => {
          console.log(response.status)
          console.log("email is ",response)
          // console.log(response.data)
        // if (response.status == "success") {
        //   this.message = response.data
        // } 
        //  if (response.status == "success") {
        //   this.message = response.data
        // } 
        //  if (response.status == "success") {
        //   this.message = response.data
        // } 
      });
    },
  },
};
</script>


