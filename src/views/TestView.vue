<template>
  <div class="about">
    <h1>Test view</h1>
    <button @click="submitForm">test submit</button>
    <button @click="sendMail">send basic mail</button>
    <button @click="testUnprotected">unprotected</button>
    <button @click="testUnprotectedpost">unprotected post</button>
    <button @click="removeCookie">remove cookie</button>

  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        firstname: "test",
      },
    };
  },
  computed: {},
  methods: {

    removeCookie(){
      console.log("remove cokkies called")
      document.cookie = "username=John Doe";
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // var theCookies = document.cookie.split(';');
    // var aString = '';
    // for (var i = 1 ; i <= theCookies.length; i++) {
    //     aString += i + ' ' + theCookies[i-1] + "\n";
    // }
    // console.log(theCookies);
    },
    testUnprotected() {
      console.log("testunprotected");
      axios
        .get("api/unprotected")
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (err) {
        });
    },
       testUnprotectedpost() {
      console.log("testunprotectedpost");
      axios
        .get("api/unprotectedpost",this.form)
        .then(function (response) {
          console.log(response.data);
        })
      
    },

    sendMail() {
      console.log("sending mail function called");
      axios
        .get("/api/sendbasicemail")
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
    },

    submitForm() {
      console.log("submitForm called");
      console.log(this.form);
      axios
        .post("/api/test", this.form)
        .then((res) => {
          console.log(res);
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


