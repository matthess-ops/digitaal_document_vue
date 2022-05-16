<template>
  <div class="about">
    <h1>Admin</h1>

    <div class="input-group mb-3">
      <input
        v-model="searchText"
        type="text"
        class="form-control"
        placeholder="Zoek client"
        aria-label="Zoekj client"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" @click="searchForUser()">Zoek</button>
      </div>
    </div>

    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Voornaam</th>
            <th scope="col">Achternaam</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" scope="row">
            <th >{{ index }}</th>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>            <button class="btn btn-primary"
            @click="
              $router.push({ name: 'UserUpload', params: { id: user.id } })
            "
          >
            Documenten
          </button></td>

      
          </tr>
          
        </tbody>
      </table>

      <!-- <ul id="users">
        <li v-for="user in users" :key="user.id">
          {{ user.firstname }} || {{ user.lastname }}||
          {{ user.email }}
          <button
            @click="
              $router.push({ name: 'UserUpload', params: { id: user.id } })
            "
          >
            Click to Navigate
          </button>
        </li>
      </ul> -->
    </div>
  </div>
</template>


<script>
import ResetPasswordVue from "./ResetPassword.vue";
export default {
  data() {
    return {
      users: [],
      searchedUsers: [],
      loading: true,
      searchText: "",
      nextPage: "",
      loadingNextLink: false,
    };
  },
  computed: {},
  methods: {
    getInitialUsers() {
      console.log("get users fucntion called");
      axios.get(`/api/users`).then((response) => {
        console.log(response.data);
        if (response.data.status == "success") {
          this.users = response.data.data.data;
          this.nextLink = response.data.data.next_page_url;
          // this.searchedUsers = response.data.data.data.sort((a, b) => a.firstname - b.firstname);
          this.loading = false;
        }
        if (response.data.status == "unauthorized") {
          $router.push({ name: "Documents" });
        }
      });
    },

    getNextUsers() {
      window.onscroll = () => {
        let bottomOfWindowRangeA =
          document.documentElement.scrollTop + window.innerHeight >
          document.documentElement.offsetHeight - 10;
        let bottomOfWindowRangeB =
          document.documentElement.scrollTop + window.innerHeight <
          document.documentElement.offsetHeight + 10;
        if (
          bottomOfWindowRangeA &&
          bottomOfWindowRangeB &&
          this.loadingNextLink == false &&
          this.nextLink != null
        ) {
          this.loadingNextLink = true;
          axios.get(this.nextLink).then((response) => {
            console.log("next user response");
            console.log(response.data);
            this.users = this.users.concat(response.data.data.data);
            this.nextLink = response.data.data.next_page_url;
            this.loadingNextLink = false;
          });
        }
      };
    },

    searchForUser() {
      console.log("search for user called");
      console.log(this.searchText);

      if (this.searchText != "") {
        axios.get(`/api/searchuser/${this.searchText}`).then((response) => {
          console.log(response.data);
          if (response.data.status == "success") {
            this.users = response.data.data;
            this.nextLink = null;
            this.loading = false;
          }
          if (response.data.status == "unauthorized") {
            $router.push({ name: "Documents" });
          }
        });
      } else {
        this.getInitialUsers();
      }
    },

    test() {
      console.log("dit werkt");
      console.log(this.searchText);
    },
    getUserss() {
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

        const combined = foundFirstname + foundLastname + foundEmail;

        if (combined != -3) {
          results.push(user);
        }
      });
      this.searchedUsers = results;
    },
  },
  beforeMount() {
    this.getInitialUsers();
  },
  mounted() {
    this.getNextUsers();
  },
};
</script>


