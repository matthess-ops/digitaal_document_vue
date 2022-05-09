<template>
  <div class="signup">
    <h1>Sign up </h1>
     <form action="#" @submit.prevent="submitForm">
         <div>
      <label for="firstname">First name</label>
      <input type="text" name="firstname" id="firstname" v-model="form.firstname">
    </div>
    <div>
      <label for="lastname">Last name</label>
      <input type="text" name="lastname" id="lastname" v-model="form.lastname">
    </div>
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
  </form>
  </div>
</template>


<script>
  import axios from 'axios'

  export default {

    data () {
      return {
        form: {
            firstname:'',
            lastname:'',
          email: '',
          password: '',
        }
      }
    },

    methods: {
  

           submitForm(){
               console.log("submitForm called");
               console.log(this.form);
            axios.post('/api/signup', this.form)
                 .then((res) => {
                     console.log(res)
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                 }).finally(() => {
                     //Perform action in always
                 });
        }
    }
  }
</script>