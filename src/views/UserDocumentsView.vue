
   
<template>
  <div class="container">
    <h3>Documenten</h3>
    <div v-if="documents.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Db id</th>
            <th scope="col">Updated at</th>
            <th scope="col">Filename</th>
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
            <td>{{ document.filename }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="downloadFile(document.id, document.filename)"
              >
                download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h4>Geen documenten gevonden</h4>
    </div>
  </div>
</template>

<script>
import * as moment from "moment/moment";

export default {
  data() {
    return {
      documents: [],
      loading: true,
    };
  },
  computed: {},
  methods: {
    // humanize elapsed type
    calculateDuration(date) {
      let duration = moment.duration(moment().diff(moment(date)));
      return duration.humanize();
    },
    // get all user documents
    getUserDocuments() {
      this.loading = true;
      axios.get(`/api/userdocuments`).then((response) => {
        if (response.status == 200) {
          console.log(response);
          this.documents = response.data.reverse(); // reverse document so that they newest is on top
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },
    //download file
    downloadFile(id, filename) {
      axios
        .get(`/api/download/${id}`, { responseType: "blob" })
        .then((response) => {
          let blob = new Blob([response.data], { type: response.data.type });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        });
    },
  },
  beforeMount() {
    this.getUserDocuments();
  },

};
</script>
