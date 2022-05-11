
   
<template>
  <div>
    <h1>documents overview</h1>
    <button @click="resetPassword()">reset password</button>

    <button @click="downloadtxt()">DownLoad txt</button>
    <button @click="downloadpdf()">DownLoad pdf</button>

    <!-- <div></div> -->
    <!-- <button v-on:click="huh()">Add 1</button> -->

    <!-- <button @click="downloadFile()">doehet</button> -->

    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <div v-for="document in documents" :key="document.id">
        <span>{{ document.id }}</span>
        <span>{{ document.filename }}</span>
        <button @click="downloadWorks(document.id)">download</button>
      </div>
    </div>
    <button @click="submitForm">test submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstname: "test",
        email: "hendrik@gmail.com",
      },

      documents: null,
      loading: true,
      userId: this.$store.state.auth.user.id,
    };
  },
  computed: {},
  methods: {
    resetPassword() {
      console.log("called reset password");
      axios.post(`/api/resetpassword`, this.form).then((response) => {
        if (response.status == 200) {
          this.documents = response.data;
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },
    huh() {
      console.log("kom op");
    },
    getDocuments() {
      this.loading = true;
      axios.get(`/api/documents`).then((response) => {
        if (response.status == 200) {
          this.documents = response.data;
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },
    submitForm() {
      console.log("submitForm called");
      console.log(this.form);
      axios
        .post("/api/test", this.form)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
    },
    downloadWorks(id) {
      console.log("download works function called id= ".id);
      axios
        .get(`/api/downloadworksttttt/${id}`, { responseType: "blob" })
        .then((response) => {
          console.log(response);
          console.log(response.data.type);
          console.log(this.documents[id - 1].filename);

          let blob = new Blob([response.data], { type: response.data.type });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = this.documents[id - 1].filename;
          link.click();

          // var FILE = window.URL.createObjectURL(new Blob([res.data]));
          // var docUrl = document.createElement("x");
          // docUrl.href = FILE;
          // docUrl.setAttribute("download", this.documents[id - 1].filename);
          // document.body.appendChild(docUrl);
          // docUrl.click();
          // docUrl.remove();
        });
    },

    download(id) {
      axios.get(`/api/download/${id}`).then((response) => {
        if (response.status == 200) {
          console.log("download worked");
          // this.documents = response.data;
        } else {
          console.log("Error occurred " + response.data.status);
        }
        this.loading = false;
      });
    },
    testresponse() {
      axios.get(`/api/testresponse`).then((response) => {
        console.log(response);
      });
    },
    downloadFile() {
      console.log("wat");
      axios
        .get("/api/downloaddddffdd", { responseType: "blob" })
        .then((res) => {
          console.log(res);
          var FILE = window.URL.createObjectURL(new Blob([res.data]));
          var docUrl = document.createElement("x");
          docUrl.href = FILE;
          docUrl.setAttribute("download", "file.pdf");
          document.body.appendChild(docUrl);
          docUrl.click();
          docUrl.remove();
        });
    },
    downloadpdf() {
      axios
        .get(`/api/downloadpdf/${3}`, { responseType: "arraybuffer" })
        .then((response) => {
          console.log(response.data);
          let blob = new Blob([response.data], { type: "application/pdf" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "testt.pdf";
          link.click();
          console.log("donwloaded pdf");
        });
    },
    downloadtxt() {
      //https://stackoverflow.com/questions/67983200/download-file-from-backend-laravel-using-vue-as-frontend
      axios
        .post("/api/downloadtxt", { responseType: "blob" })
        .then((response) => {
          try {
            // Service that handles ajax call
            // console.log(response.data.name);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "testggrtt.txt");
            document.body.appendChild(link);
            link.click();
            // link.remove();
            console.log("donwloaded txt");
          } catch (error) {
            console.error(error);
          }
        });
    },
  },
  beforeMount() {
    this.getDocuments();
  },
  mounted() {},
  created() {},
};
</script>
