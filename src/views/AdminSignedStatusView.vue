<template>
  <div>
    <h1>Ondertekening overzicht</h1>
    <!-- {{ Search the to be signed documenten input }} -->
    <div class="input-group mb-3">
      <input
        v-on:keyup.enter="searchDocuments()"
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
      
    <!-- {{ 3 buttons that filter the signed documenten depending on their status. The status are
    open, signed, not_agreed
    open = the document needs user input
    signed = the user signed the document
    not_agreed = the user doesnt want to sign the document }} -->
    <!-- make an component of these buttons -->

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
    <!-- {{ documents table }} -->

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
              <td>
                <!-- {{ download button of the documents }} -->

                <button
                  class="btn btn-primary"
                  @click="
                    downloadSignedFile(
                      filteredSignedDocument.id,
                      filteredSignedDocument.filename
                    )
                  "
                >
                  download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>

        <h3>No documents found</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      signedDocuments: [], // all signed documents
      filteredSignedDocuments: [], // the filtered documents, these are filterd by the search input or the 3 buttons input
      loading: true,
      searchText: "",
      signedStatus: "open", // open, not_agreed, signed, searched, have choosen open as default. This var is used in highlighting their corresponding filter buttons
    };
  },
  computed: {},
  methods: {
    // download the signed document.
    downloadSignedFile(id, filename) {
      axios
        .get(`/api/downloadsigned/${id}`, { responseType: "blob" })
        .then((response) => {
        
          const blob = new Blob([response.data], { type: response.data.type });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        });
    },
    // search the signed documents for user firstname.

    searchDocuments() {
      if (this.searchText != "") {
        let filtered = [];
        this.signedDocuments.forEach((signedDocument) => {
          if (signedDocument.user.firstname.indexOf(this.searchText) !== -1) {
            filtered.push(signedDocument);
          }
        });
        this.filteredSignedDocuments = filtered;
        this.signedStatus = "searched"; // change the status to searched this should deactivate the highlightin of the three buttons
      } else {
        this.filterDocuments("open"); // if there is not search string reload all documents with status open
      }
    },
    // filter fuction status (open, not_agreed signed) of documents
    filterDocuments(status) {

      const filtered = this.signedDocuments.filter(
        (signedDocument) => signedDocument.signed_status == status
      );
      this.filteredSignedDocuments = filtered;
      this.signedStatus = status;
    },
    // get the raw signed documente from server
    getSignedDocuments() {
      this.loading = true;
      axios.get(`/api/adminsigneddocuments`).then((response) => {
        if (response.status == 200) {
          console.log(response);
          if (response.data.status === "success") {
            this.signedDocuments = response.data.data;
            this.filterDocuments(this.signedStatus); // filter document for default signed status
          }
        } else {
          // do something with the failed status
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
