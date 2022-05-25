

<template>
  <!-- big problem in the code is to show the current signing status of the document. 
        it is implemented in a not elegant matter. Best fix would be to implement a new boolean data field on the document object, for example "signing_requested"
        that gets flipped once the admin send a signing request to the user. -->

  <div class="container">
    <div v-if="user.lenght != {}">
      <div class="mb-3 mt-3">
        <div>{{ user.firstname }} {{ user.lastname }}</div>

        <div>{{ user.email }}</div>
      </div>

      <div class="mb-3">
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <!-- document upload code -->

              <div class="card-header">Upload een document</div>
              <div class="card-body">
                <div v-if="success != ''" class="alert alert-success">
                  {{ success }}
                </div>

                <input
                  type="file"
                  class="form-control"
                  v-on:change="onChange"
                />

                <button class="btn btn-primary mt-2" @click="uploadFile()">
                  upload fle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- documents table -->

        <div v-if="documents.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Db id</th>
                <th scope="col">Updated at</th>
                <th scope="col">Filename</th>
                <th scope="col">document id</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(document, index) in documents"
                :key="document.id"
                scope="row"
              >
                <th>{{ index }}</th>
                <td>{{ document.id }}</td>
                <td>{{ calculateDuration(document.updated_at) }}</td>
                <!-- humanized updated_at -->

                <td>{{ document.filename }}</td>
                <td>{{ document.id }}</td>
                <td>{{ getStatus(document.id) }}</td>

                <td>
                  <button
                    class="btn btn-primary"
                    @click="downloadFile(document.id, document.filename)"
                  >
                    download
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-primary"
                    @click="destroyFile(document.id, document.filename)"
                  >
                    delete
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-primary"
                    @click="
                      $router.push({
                        name: 'AdminUserSigningView',
                        params: {
                          userid: user.id,
                          filename: document.filename,
                          documentid: document.id,
                        },
                      })
                    "
                  >
                    Sign
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <h4>The user has no documents</h4>
        </div>
      </div>
    </div>
    <div v-else>
      <h4>Gebruiker is niet gevonden</h4>
    </div>
  </div>
</template>
<script>
import * as moment from "moment/moment";

export default {
  data() {
    return {
      // name: "",
      file: "",
      success: "",
      userId: this.$route.params.id,
      documents: [],
      user: {},
      userNotFound: null,
      signedDocuments: [],
    };
  },
  methods: {
    // checks if an document has an signed document. If so change the state of the document to the signed document status. See the top of this file for more information.
    getStatus(documentId) {
      let state = "niet aangevraagd"; // since not every document has a signed document an default not requested to be signed var is needed
      this.signedDocuments.forEach((signedDocument) => {
        if (signedDocument.document_id == String(documentId)) {
          // needed a type change since documentId was an int
          state = signedDocument.signed_status;
        }
      });
      return state;
    },
    //humanize the input date
    calculateDuration(date) {
      const duration = moment.duration(moment().diff(moment(date)));
      return duration.humanize();
    },

    // this removes an document from the document folder. If the document has a to be signed document in the signedDocument folder this is not deleted.
    destroyFile(id) {
      axios.delete(`/api/document/${id}`).then((response) => {
        if (response.status == 200) {
          this.documents = this.documents.filter(function (document) {
            return document.id != id;
          }); // remove the removed document from this.document state.
        } else {
          console.log("error");
        }
      });
    },
    // download functions.
    downloadFile(id, filename) {
      axios
        .get(`/api/download/${id}`, { responseType: "blob" })
        .then((response) => {
          const blob = new Blob([response.data], { type: response.data.type });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        });
    },

    // the request returns 3 data, user data, user documents data and user signed documents data
    getUserDocuments() {
      this.loading = true;
      axios.get(`/api/adminuserdocuments/${this.userId}`).then((response) => {
        if (response.status == 200) {
          console.log(response);
          if (response.data.status === "success") {
            this.documents = response.data.documents.reverse();
            this.signedDocuments = response.data.signatures;
            this.user = response.data.user;
          }
        } else {
          console.log("Error occurred");
        }
        this.loading = false;
      });
    },

    onChange(e) {
      this.file = e.target.files[0];
    },

    // document upload function
    uploadFile() {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      let data = new FormData();
      data.append("file", this.file);
      data.append("userId", this.userId);

      axios.post("api/upload", data, config).then((response) => {
        this.documents.push(response.data.data);
        this.documents = this.documents.reverse(); // update dom
      });
    },
  },
  beforeMount() {
    this.getUserDocuments();
  },
};
</script>