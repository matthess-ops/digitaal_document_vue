<template>
  <div>
    <h1>User docs</h1>
    <!-- search input -->
    {{ nextLink }}
    <div class="input-group mb-3">
      <input
        v-model="searchText"
        type="text"
        class="form-control"
        placeholder="Zoek client"
        aria-label="Zoek client"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" @click="searchForUser()">Zoek</button>
      </div>
    </div>

    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <div v-if="users != []">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Voornaam</th>
              <th scope="col">Achternaam</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="user.id"
              scope="row"
              @click="
                $router.push({
                  name: 'AdminUserDocumentsView',
                  params: { id: user.id },
                })
              "
            >
              <th>{{ index }}</th>
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.email }}</td>
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
      searchedUsers: [], // search results of users
      loading: true,
      searchText: "", // user firstname search string
      nextLink: "", // link to next batch of users
      loadingNextLink: false, // bool if there is a next page of users
    };
  },
  computed: {},
  methods: {
    // get user data
    getInitialUsers() {
      axios.get(`/api/users`).then((response) => {
        if (response.data.status == "success") {
          this.users = response.data.data.data; // first page of users
          this.nextLink = response.data.data.next_page_url; // next page of users
          this.loading = false;
        }
      });
    },
    // infinite scroll function that checks if the scroll bar is near the bottom of the page
    // if this is the case get the next page of users and concatenate these to this.users
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
          this.loadingNextLink == false && // if the axios get request below is not done retrieving data wait till it is done for sending next request
          this.nextLink != null // if there is not nextLink all users have been retrieved
        ) {
          this.loadingNextLink = true;
          axios.get(this.nextLink).then((response) => {
            this.users = this.users.concat(response.data.data.data); /// concat the new batch of users to users
            this.nextLink = response.data.data.next_page_url; // update next page user link
            this.loadingNextLink = false;
          });
        }
      };
    },
    // search user firstname for searchText.
    // since all the matched users are returned by the server, infinite scroll needs
    // to be disabled by setting nextLink to null
    searchForUser() {
      if (this.searchText != "") {
        axios.get(`/api/searchuser/${this.searchText}`).then((response) => {
          if (response.data.status == "success") {
            this.users = response.data.data;
            this.nextLink = null;
            this.loading = false;
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


