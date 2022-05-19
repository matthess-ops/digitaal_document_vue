<template>
  <div>
    <h3>Maak digitale handtekening voor file aan voor</h3>
    {{ admin }}
    <div>{{ user.firstname }} {{ user.lastname }}</div>
    <div>
      {{ user.email }}
    </div>
    <div class="mt-3 mb-3">filename: {{ filename }}</div>
    {{ admin }}
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
          v-bind:class="{ 'is-invalid': errors.send_to != null }"
        />
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
          <button class="btn btn-primary" @click="sendSignRequest()">Verzenden</button>

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
        applicant: "",
        text: "",
      },
      errors: [],
    };
  },

  //  $table->string('user_id');
  // $table->string('filepath');
  // $table->string('filename');
  // $table->string('signed_status'); // signed, open, not_agreed
  // $table->string('send_to');
  // $table->string('applicant');
  // $table->string('text');

  methods: {

sendSignRequest(){


},



    getUserDocument() {
      axios
        .get(`/api/getuserDocument/${this.userId}/${this.documentId}`)
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
            if (response.data.status === "success") {
              console.log("ik heb data");
              this.document = response.data.document;
              this.user = response.data.user;
              this.admin = response.data.admin;
              this.form.applicant =
                this.admin.firstname + " " + this.admin.lastname;
                //admin is eigenlijk niet eens nodig.
            
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