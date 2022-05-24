<template>
  <div class="about">
    <h1>Signing overview</h1>
    <!-- {{ signedDocuments[0].user.firstname }} -->
    <div class="input-group mb-3">
      <input
        v-model="searchText"
        type="text"
        class="form-control"
        placeholder="Zoek client"
        aria-label="Zoek client"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" @click="searchDocuments()">Zoek</button>
      </div>
    </div>
    <div>
  
      <button
        v-bind:class="{ 'btn-success': signedStatus === 'open' }"
        class="btn btn-primary"
        @click="filterDocuments('open')"
      >
        Open
      </button>
      <button
        v-bind:class="{ 'btn-success': signedStatus === 'signed' }"
        class="btn btn-primary"
        @click="filterDocuments('signed')"
      >
        Gesigneerd
      </button>
      <button
        v-bind:class="{ 'btn-success': signedStatus === 'not_agreed' }"
        class="btn btn-primary"
        @click="filterDocuments('not_agreed')"
      >
        Afgewezen
      </button>
    </div>

    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <div v-if="filteredSignedDocuments != []">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Voornaam</th>
              <th scope="col">Achternaam</th>
              <th scope="col">Email</th>
              <th scope="col">Bestand</th>
              <th scope="col">Te verzenden naar</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(filteredSignedDocument, index) in filteredSignedDocuments"
              :key="filteredSignedDocument.id"
            >
              <th>{{ index }}</th>
              <td>{{ filteredSignedDocument.user.firstname }}</td>
              <td>{{ filteredSignedDocument.user.lastname }}</td>
              <td>{{ filteredSignedDocument.user.email }}</td>
              <td>{{ filteredSignedDocument.filename }}</td>
              <td>{{ filteredSignedDocument.send_to }}</td>
              <td>{{ filteredSignedDocument.signed_status }}</td>

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
      loading: true,
      signedDocuments: [],
      filteredSignedDocuments: [],
      loading: true,
      searchText: "mat",
      signedStatus: "open",
    };
  },
  computed: {},
  methods: {
    searchDocuments() {
      console.log("search documents");
      console.log(this.searchText);
      if (this.searchText != "") {
        let filtered = [];
        this.signedDocuments.forEach((signedDocument) => {
          if (signedDocument.user.firstname.indexOf(this.searchText) !== -1) {
            filtered.push(signedDocument);
          }
        });
        this.filteredSignedDocuments = filtered;
        this.signedStatus = "searched"
      } else {
        this.filterDocuments("open");
      }
    },
    filterDocuments(status) {
      console.log("filter documents called");

      var filtered = this.signedDocuments.filter(
        (signedDocument) => signedDocument.signed_status == status
      );
      this.filteredSignedDocuments = filtered;
      this.signedStatus = status;
    },

    getSignedDocuments() {
      console.log("getSignedDocuments() called");
      this.loading = true;
      axios.get(`/api/adminsigneddocuments`).then((response) => {
        if (response.status == 200) {
          console.log(response);
          if (response.data.status === "success") {
            console.log("dit moet gecalled worden");
            this.signedDocuments = response.data.data;
            this.filteredSignedDocuments = this.signedDocuments;
            // this.filterDocuments('open')
          }
        } else {
          console.log("Error occurred");
        }
        this.loading = false;
      });
    },
  },
  beforeMount() {
    this.getSignedDocuments();
  },
};
</script>
