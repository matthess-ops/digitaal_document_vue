<template>
  <div class="about">
    <h1>Admin</h1>
    {{ users }}
<input @input="searchUser()" v-model="searchText">

    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <ul id="users">
        <li v-for="user in users" :key="user.id">
          {{ user.firstname }} {{ user.lastname }} {{ user.email }}
        </li>
      </ul>
    </div>
    {{ searchText }}
  </div>
  
</template>


<script>
export default {
  data() {
    return {
      users: {},
      loading: null,
      searchText:"",
    };
  },
  computed: {},
  methods: {

    test(){
      console.log("dit werkt")
      console.log(this.searchText)
    },
    getUsers() {
      console.log("werlt dot");
      this.loading = true;
      axios.get(`/api/users`).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.users = response.data;
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },
      searchUser() {
      console.log("search user");
      this.loading = true;
      axios.get(`/api/searchuser/${this.searchText}`).then((response) => {
        console.log(response);
        if (response.status == 200) {

          this.users = response.data;
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },
  },
  beforeMount() {
    this.getUsers();
  },
};
</script>


