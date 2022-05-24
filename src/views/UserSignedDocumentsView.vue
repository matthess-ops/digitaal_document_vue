<template>
  <div class="about">
    <h1>User signed documents view</h1>

    <div v-if="loading">Data is loading...</div>
    <div v-else>
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
      <div v-if="filteredSignedDocuments != []">
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
import * as moment from "moment/moment";

export default {
  data() {
    return {
      signedDocuments: [],
      filteredSignedDocuments: [],
      loading: true,
      signedStatus: "open",
    };
  },
  computed: {},
  methods: {
    updateState(newStatus, id) {
        const data = {id:id,newStatus:newStatus}
      axios.post(`/api/changestatus`, data).then((response) => {
        if (response.status == 200) {
            console.log(response)
            if(response.data.status == "success"){
                alert("Ondertekenen is goed gegaan");
                this.getSignedDocuments();
        //           this.signedDocuments = this.signedDocuments .filter(function (document) {
        //     return document.id != response.data.data;
        //   });
        //     this.filteredSignedDocuments = this.signedDocuments
        //     this.filterDocuments(this.signedStatus)
            }else{

                alert("Er is iets fout gegaan. Probeer opnieuwe te ondertekenen");

            }
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },

    filterDocuments(status) {
      console.log("filter documents called");

      var filtered = this.signedDocuments.filter(
        (signedDocument) => signedDocument.signed_status == status
      );
      this.filteredSignedDocuments = filtered;
      this.signedStatus = status;
    },

    sortOrder() {
      const openStatus = this.signedDocuments.filter(
        (signedDocument) => signedDocument.signed_status == "open"
      );
      const notAgreedStatus = this.signedDocuments.filter(
        (signedDocument) => signedDocument.signed_status == "not_agreed"
      );
      const signedStatus = this.signedDocuments.filter(
        (signedDocument) => signedDocument.signed_status == "signed"
      );
      this.filteredSignedDocuments = openStatus;
    },

    calculateDuration(date) {
      let duration = moment.duration(moment().diff(moment(date)));
      return duration.humanize();
    },
    getSignedDocuments() {
      console.log("getSignedDocuments() called");
      this.loading = true;
      axios.get(`/api/usersigneddocuments`).then((response) => {
        if (response.status == 200) {
          console.log(response.data.data);
          if (response.data.status === "success") {
            console.log("dit moet gecalled worden");
            this.signedDocuments = response.data.data;
            this.filteredSignedDocuments = this.signedDocuments;
            this.filterDocuments(this.signedStatus)
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
