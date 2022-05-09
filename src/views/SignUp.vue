<template>
  <div class="signup">
    <h1>Sign up</h1>
    <form action="#" @submit.prevent="submitForm">
      <div>
        <label for="firstname">First name</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          v-model="form.firstname"
        />
        <h4 v-if="errors.password">{{ errors.firstname }}</h4>
      </div>
      <div>
        <label for="lastname">Last name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          v-model="form.lastname"
        />
        <h4 v-if="errors.lastname">{{ errors.lastname }}</h4>
      </div>
      <div>
        <label for="email">Email address</label>
        <input type="text" name="email" id="email" v-model="form.email" />
        <h4 v-if="errors.email">{{ errors.email }}</h4>
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          v-model="form.password"
        />
        <h4 v-if="errors.password">{{ errors.password }}</h4>
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
      <h2>      {{ succes }}
</h2>
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        firstname: "nieuw",
        lastname: "nieuw",
        email: "nieuw@gmail.com",
        password: "password",
      },
      errors: {},
      succes: undefined,
    };
  },

  methods: {
    submitForm() {
      this.errors = {}
      console.log("submitForm called");
      console.log(this.form);
      axios
        .post("/api/signup", this.form)
        .then((res) => {
          console.log(res)
          console.log(res.status)
          if (res.status === 200) {
            console.log("check for erros")
            if (res.data.error !== undefined) {
              console.log("form errros found");
              this.errors = res.data.error;
            }
            if(res.data.worked == 'yes'){
              this.succes = "account has beend maade"
            }
          }else{
            console.log("server error ",res.status)
          }
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
    },
  },
};
</script>