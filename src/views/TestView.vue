<template>
  <div class="about">
    <h1>Test view </h1>
               <button @click="submitForm">test submit</button>

   </div>


  
</template>


<script>
export default {
  data() {
    return {
        form: {
            firstname:'test',
         
        },
  
    };
  },
  computed: {},
  methods: {
 
   
        submitForm(){
               console.log("submitForm called");
               console.log(this.form);
            axios.post('/api/test', this.form)
                 .then((res) => {
                     console.log(res)
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                 }).finally(() => {
                     //Perform action in always
                 });},
   
  },
 
};
</script>


