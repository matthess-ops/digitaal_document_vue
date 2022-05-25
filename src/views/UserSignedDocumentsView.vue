<template>
  <div class="about">
    <h1>User signed documents view</h1>

    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <!-- signed document status buttons -->
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
            <div v-if="filteredSignedDocuments.length >0">

        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Bestand</th>
              <th scope="col">Aangemaakt</th>
              <th scope="col">Aanmaker</th>
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
              <td>{{ filteredSignedDocument.filename }}</td>
              <td>
                {{ calculateDuration(filteredSignedDocument.created_at) }}
              </td>
              <td>{{ filteredSignedDocument.applicant }}</td>
              <td>{{ filteredSignedDocument.send_to }}</td>
              <td>{{ filteredSignedDocument.signed_status }}</td>
              <td v-if="signedStatus == 'open'">
                <button
                  class="btn btn-primary"
                  @click="updateState('signed', filteredSignedDocument.id)"
                >
                  Akkoord
                </button>
              </td>
              <td v-if="signedStatus == 'open'">
                <button
                  class="btn btn-primary"
                  @click="updateState('not_agreed', filteredSignedDocument.id)"
                >
                  Niet Akkoord
                </button>
              </td>

              <td v-if="signedStatus == 'not_agreed'">
                <button
                  class="btn btn-primary"
                  @click="updateState('signed', filteredSignedDocument.id)"
                >
                  Akkoord
                </button>
              </td>

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
        <h3>Geen documenten gevonden</h3>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from "moment/moment";

export default {
  data() {
    return {
      signedDocuments: [], // all signed documents belonging to user
      filteredSignedDocuments: [], //
      loading: true,
      signedStatus: "open",
    };
  },
  computed: {},
  methods: {

// download the file of interest
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




    // update the state of signed document
    //newStatus = open,not_agreed, signed
    // id= is document id
    updateState(newStatus, id) {
        const data = {id:id,newStatus:newStatus}
      axios.post(`/api/changestatus`, data).then((response) => {
        if (response.status == 200) {
            console.log(response)
            if(response.data.status == "success"){
                this.getSignedDocuments(); // retrieving all signed documents again. Next time just concat the new document to signedDocument array 
     
            }else{

                alert("Er is iets fout gegaan. Probeer opnieuwe te ondertekenen");

            }
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },
    // filter the documents according to status button input
    // open,not_agreed, signed
    filterDocuments(status) {

      var filtered = this.signedDocuments.filter(
        (signedDocument) => signedDocument.signed_status == status
      );
      this.filteredSignedDocuments = filtered;
      this.signedStatus = status;
    },

    // sortOrder() {
    //   const openStatus = this.signedDocuments.filter(
    //     (signedDocument) => signedDocument.signed_status == "open"
    //   );
    //   const notAgreedStatus = this.signedDocuments.filter(
    //     (signedDocument) => signedDocument.signed_status == "not_agreed"
    //   );
    //   const signedStatus = this.signedDocuments.filter(
    //     (signedDocument) => signedDocument.signed_status == "signed"
    //   );
    //   this.filteredSignedDocuments = openStatus;
    // },
      // humanize elapsed time
    calculateDuration(date) {
      let duration = moment.duration(moment().diff(moment(date)));
      return duration.humanize();
    },
    // get all signed documents op user
    getSignedDocuments() {
      this.loading = true;
      axios.get(`/api/usersigneddocuments`).then((response) => {
        if (response.status == 200) {
          console.log(response.data.data);
          if (response.data.status === "success") {
            console.log("dit moet gecalled worden");
            this.signedDocuments = response.data.data;
            this.filteredSignedDocuments = this.signedDocuments;
            this.filterDocuments(this.signedStatus) // show the current column after server fetch
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
