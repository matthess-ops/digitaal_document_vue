<template>
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
              $router.push({ name: 'AdminUserSigningView', params: { userid: user.id, filename:document.filename, documentid:document.id } })
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
      name: "",
      file: "",
      success: "",
      userId: this.$route.params.id,
      documents: [],
      user: {},
      userNotFound: null,
    };
  },
  methods: {
    calculateDuration(date) {
      let duration = moment.duration(moment().diff(moment(date)));
      return duration.humanize();
    },

    destroyFile(id) {
      console.log("download works function called id= ",id);
      axios.delete(`/api/document/${id}`).then((response) => {
        console.log("response is")
        console.log(response)
        if (response.status == 200) {
          console.log("delte file with id ", id);
          console.log(this.documents.length);
          this.documents = this.documents.filter(function (document) {
            return document.id != id;
          });
          console.log(this.documents.length);

          console.log(response);
        }else{
          console.log("error")
        }
      });
    },

    downloadFile(id, filename) {
      console.log("download works function called id= ".id);
      axios
        .get(`/api/download/${id}`, { responseType: "blob" })
        .then((response) => {
          console.log(response);
          console.log(response.data.type);
          console.log("filename is  ", filename);

          let blob = new Blob([response.data], { type: response.data.type });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        });
    },

    getUserDocuments() {
      console.log("dit moet werke");
      this.loading = true;
      axios.get(`/api/adminuserdocuments/${this.userId}`).then((response) => {
        if (response.status == 200) {
          console.log(response);
          if (response.data.status === "success") {
            console.log("ik heb data");
            this.documents = response.data.documents.reverse();
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
        this.documents = this.documents.reverse();
        console.log(this.animals);
      });
    },

    // formSubmit(e) {
    //   e.preventDefault();
    //   let existingObj = this;
    //   const config = {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   };
    //   let data = new FormData();
    //   data.append("file", this.file);
    //   data.append("userId", this.userId);

    //   axios
    //     .post("api/upload", data, config)
    //     .then(function (res) {
    //       console.log("add sizzle");
    //       existingObj.success = res.data.success;
    //       const testadd = {
    //         id: 111111,
    //         created_at: "2022-05-17T10:19:38.000000Z",
    //         updated_at: "2022-05-17T10:19:38.000000Z",
    //         user_id: "95",
    //         filepath:
    //           "storage\\app\\public\\documents/1652782778_epoxytestprint.gcode",
    //         filename: "1652782778_epoxytestprint.gcode",
    //       };
    //       this.documents.push(testadd);
    //       console.log("heef gerwerkt");
    //     })
    //     .catch(function (err) {
    //       existingObj.output = err;
    //     });
    // },
  },
  mounted() {},
  beforeMount() {
    this.getUserDocuments();
  },
};
</script>