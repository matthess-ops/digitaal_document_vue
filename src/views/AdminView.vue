<template>
  <div class="about">
    <h1>Admin</h1>
    {{ users }}
    <input @input="searchUser()" v-model="searchText" />

    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <ul id="users">
        <li v-for="searchedUser in searchedUsers" :key="searchedUser.id">
          {{ searchedUser.firstname }} || {{ searchedUser.lastname }}||
          {{ searchedUser.email }}
<button @click="$router.push({name: 'UserUpload', params: { id: searchedUser.id },})">Click to Navigate</button>

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
      users:[],
      searchedUsers: [],
      loading: null,
      searchText: "",
    };
  },
  computed: {},
  methods: {
    test() {
      console.log("dit werkt");
      console.log(this.searchText);
    },
    getUsers() {
      console.log("werlt dot");
      this.loading = true;
      axios.get(`/api/users`).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.users = response.data.sort((a, b) => a.firstname - b.firstname);
          this.searchedUsers = response.data.sort(
            (a, b) => a.firstname - b.firstname
          );
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },
    searchUser() {
      let results = [];
      this.users.forEach((user) => {
        const foundFirstname = user.firstname.indexOf(this.searchText);
        const foundLastname = user.lastname.indexOf(this.searchText);
        const foundEmail = user.email.indexOf(this.searchText);

        const combined = foundFirstname+foundLastname+foundEmail

        if (combined != -3 ) {
          results.push(user);
        }
      });
      this.searchedUsers = results;

    },
  },
  beforeMount() {
    this.getUsers();
  },
};
</script>


