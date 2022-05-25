<template>
  <div>
    <h3>Maak digitale handtekening voor file aan voor</h3>
    <div>{{ user.firstname }} {{ user.lastname }}</div>
    <div>
      {{ user.email }}
    </div>
    <div class="mt-3 mb-3">filename: {{ filename }}</div>
    <div>
      <div class="form-group">
        <label for="sendTo">Email ontvanger</label>
        <input
          v-model="form.sendTo"
          type="email"
          name="sendTo"
          class="form-control"
          id="sendTo"
          placeholder="Email Ontvanger"
          v-bind:class="{ 'is-invalid': errors.sendTo != null }"
        />
      </div>
      <div v-if="errors.sendTo != null" class="text-danger">
        {{ errors.sendTo[0] }}
      </div>

      <div class="form-group">
        <label for="text">Uitleggende tekst client</label>
        <textarea
          v-model="form.text"
          rows="3"
          type="text"
          name="text"
          class="form-control"
          id="text"
          placeholder="Uitleggende tekst"
          v-bind:class="{ 'is-invalid': errors.text != null }"
        />
      </div>
      <div v-if="errors.text != null" class="text-danger">
        {{ errors.text[0] }}
      </div>

      <button class="btn btn-primary" @click="sendSignRequest()">
        Verzenden
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.userid,
      documentId: this.$route.params.documentid,
      filename: this.$route.params.filename,
      user: [],
      document: [],
      admin: [],
      form: {
        userId: this.$route.params.userid,
        documentId: this.$route.params.documentid,
        sendTo: "",
        text: "",
      },
      errors: [],
    };
  },



  methods: {
    // create siging request for a document
    sendSignRequest() {
      axios.post("/api/createsigning", this.form).then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.status == "success") {
        
            this.$router.push({ name: 'AdminUserDocumentsView', params: { id: this.userId } })
            // after making a sign request for a user redirect to page.
          }
          if (response.data.status == "failed") { //form errors
            this.errors = response.data.errors;
          }
        } else {
          console.log("server error ", response.status);
        }
      });
    },
    //function that gets document, user, admin data
    getUserDocument() {
      axios
        .get(`/api/getuserDocument/${this.userId}/${this.documentId}`)
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status === "success") {
              this.document = response.data.document;
              this.user = response.data.user;
              this.admin = response.data.admin;
              this.form.applicant =
                this.admin.firstname + " " + this.admin.lastname;
            }
          } else {
            console.log("Error occurred");
          }
          this.loading = false;
        });
    },
  },
  beforeMount() {
    this.getUserDocument();
  },
};
</script>
