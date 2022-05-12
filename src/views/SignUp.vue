<template>
  <!-- <div class="signup">
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
  </div> -->

  <div>
    <form action="#" @submit.prevent="submit">

 <div class="form-group">
        <label for="lastname">Achternaam</label>
        <input
          v-model="form.lastname"
          type="lastname"
          name="lastname"
          class="form-control"
          id="lastname"
          aria-describedby="lastnameHelp"
          placeholder="Enter achternaam"
        />
        <small id="lastnameHelp" class="form-text text-muted"
          >Voor hier uw achternaam in.</small
        >
      </div>


       <div class="form-group">
        <label for="firstname">Voornaam</label>
        <input
          v-model="form.firstname"
          type="firstname"
          name="firstname"
          class="form-control"
          id="firstname"
          aria-describedby="firstnameHelp"
          placeholder="Enter voornaam"
        />
        <small id="firstnameHelp" class="form-text text-muted"
          >Voor hier uw voornaam in.</small
        >
      </div>
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
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
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