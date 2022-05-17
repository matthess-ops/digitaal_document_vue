<template>
  <div class="container">
    <h3>Downloads</h3>
    {{ animals }}
    <!-- {{ documents }} -->
    <button class="btn btn-primary" @click="testadd()">add animal</button>

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
          <!-- document.updated_at | duration("humanize") -->
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
        </tr>
      </tbody>
    </table>

    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Laravel Vue JS File Upload Demo</div>
          <div class="card-body">
            <div v-if="success != ''" class="alert alert-success">
              {{ success }}
            </div>
            <!-- <form @submit="formSubmit" enctype="multipart/form-data">
              <input type="file" class="form-control" v-on:change="onChange" />
              <button class="btn btn-primary btn-block">Upload</button>
            </form> -->


              <input type="file" class="form-control" v-on:change="onChange" />

                <button class="btn btn-primary" @click="uploadFile()">upload fle</button>

          </div>
        </div>
      </div>
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
      animals: ["pigs", "goats", "sheep"],
    };
  },
  methods: {
    testadd() {
      console.log(this.documents);
      this.documents.push({
        id: 999999,
        created_at: "2022-05-17T10:19:38.000000Z",
        updated_at: "2022-05-17T10:19:38.000000Z",
        user_id: "95",
        filepath:
          "storage\\app\\public\\documents/1652782778_epoxytestprint.gcode",
        filename: "1652782778_epoxytestprint.gcode",
      });
      this.animals.push("dog");
      console.log(this.animals);
    },

    calculateDuration(date) {
      let duration = moment.duration(moment().diff(moment(date)));
      return duration.humanize();
    },

    destroyFile(id) {
      console.log("download works function called id= ".id);
      axios.delete(`/api/document/${id}`).then((response) => {
        console.log("delte file with id ", id);
        console.log(this.documents.length);
        this.documents = this.documents.filter(function (document) {
          return document.id != id;
        });
        console.log(this.documents.length);

        console.log(response);
      });
    },

    downloadFile(id, filename) {
      console.log("download works function called id= ".id);
      axios
        .get(`/api/downloadfile/${id}`, { responseType: "blob" })
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
      axios.get(`/api/documents/${this.userId}`).then((response) => {
        if (response.status == 200) {
          this.documents = response.data.reverse();
        } else {
          console.log("Error occurred " + response.data.status);
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

      axios
        .post("api/upload", data, config)
        .then((response)=> {
          console.log("file uploaded succeeded");
          console.log(response)
          console.log("dit moet werken")
          this.animals.push("catto")
          this.documents.push(response.data.data)
          console.log(this.animals)
        })
       
    },

    formSubmit(e) {
      e.preventDefault();
      let existingObj = this;
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      let data = new FormData();
      data.append("file", this.file);
      data.append("userId", this.userId);

      axios
        .post("api/upload", data, config)
        .then(function (res) {
          console.log("add sizzle");
          existingObj.success = res.data.success;
          const testadd = {
            id: 111111,
            created_at: "2022-05-17T10:19:38.000000Z",
            updated_at: "2022-05-17T10:19:38.000000Z",
            user_id: "95",
            filepath:
              "storage\\app\\public\\documents/1652782778_epoxytestprint.gcode",
            filename: "1652782778_epoxytestprint.gcode",
          };
          this.documents.push(testadd);
          console.log("heef gerwerkt");
        })
        .catch(function (err) {
          existingObj.output = err;
        });
    },
  },
  mounted() {},
  beforeMount() {
    this.getUserDocuments();
  },
};
</script>