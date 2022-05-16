<template>
  <div class="container">
    <h3>Downloads</h3>
<span>{{ 3600000 | duration('humanize') }}</span>
 <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Db id</th>
            <th scope="col">created at</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(document, index) in documents" :key="document.id" scope="row">
            <th >{{ index }}</th>
            <td>{{ document.id }}</td>
            <td>{{ document.created_at }}</td>
            <td>{{ document.updated_at }}</td>
      
          </tr>
          
        </tbody>
      </table>



    {{ documents }}
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Laravel Vue JS File Upload Demo</div>
          <div class="card-body">
            <div v-if="success != ''" class="alert alert-success">
              {{ success }}
            </div>
            <form @submit="formSubmit" enctype="multipart/form-data">
              <input type="file" class="form-control" v-on:change="onChange" />
              <button class="btn btn-primary btn-block">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      file: "",
      success: "",
      userId:this.$route.params.id,
      documents:[],
    };
  },
  methods: {

    getUserDocuments() {
      this.loading = true;
      axios.get(`/api/documents/${this.userId}`).then((response) => {
        if (response.status == 200) {
          this.documents = response.data;
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },



    onChange(e) {
      this.file = e.target.files[0];
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
          existingObj.success = res.data.success;
        })
        .catch(function (err) {
          existingObj.output = err;
        });
    },
  },
  mounted() {
    console.log("user id  ",this.userId)
  },
  beforeMount(){
    this.getUserDocuments()
    console.log(this.documents)
  },
};
</script>