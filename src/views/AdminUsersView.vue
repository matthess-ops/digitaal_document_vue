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

      <div v-if="users != []">
      <table  class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Voornaam</th>
            <th scope="col">Achternaam</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" scope="row"     @click="
              $router.push({ name: 'AdminUserDocumentsView', params: { id: user.id } })
            "
          >
            <th >{{ index }}</th>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <!-- <td>            <button class="btn btn-primary"
            @click="
              $router.push({ name: 'AdminUserDocumentsView', params: { id: user.id } })
            "
          >
            Documenten
          </button></td> -->

      
          </tr>
          
        </tbody>
      </table>
      </div>
      <div v-else>
        <h3>Geen clienten/gebruikers gevonden</h3>

      </div>

    </div>
  </div>
</template>


<script>
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
      axios.get(`/api/users`).then((response) => {
        console.log(response.data);
        if (response.data.status == "success") {
          this.users = response.data.data.data;
          this.nextLink = response.data.data.next_page_url;
          this.loading = false;
        }
        if (response.data.status == "unauthorized") {
          $router.push({ name: "Documents" });
          //misschien log out hier doen??
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
        
            this.users = this.users.concat(response.data.data.data);
            this.nextLink = response.data.data.next_page_url;
            this.loadingNextLink = false;
          });
        }
      };
    },

    searchForUser() {
      console.log("search for user called");

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

   
  },
  beforeMount() {
    this.getInitialUsers();
  },
  mounted() {
    this.getNextUsers();
  },
};
</script>


