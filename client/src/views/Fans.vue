<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col" style=" margin-bottom: 50px;">
        <boardnav />
        <h1>FAN PAGE</h1>
        <form @submit.prevent="createFan">
          <input
            type="text"
            placeholder="Name"
            v-model="newFan.name"
            required
          />
          <input
            type="text"
            placeholder="Email"
            v-model="newFan.email"
            required
          />
          <button class="btn btn-primary" style="margin: 5px">+ Fan</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import boardnav from "../components/BoardNav";
export default {
  name: "Fans",
  data() {
    return {
      newFan: {
        name: "",
        email: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("getFans");
  },
  methods: {
    createFan() {
      // TODO PUSH FAN INFO TO TEAM GROUP ARRAY
      let fan = { ...this.newFan };
      this.store.dispatch("updateTeamGroup", fan);
      this.newFan = { name: "", email: "" };
    }
  },
  computed: {
    fans() {
      return this.$store.state.fans;
    }
  },
  componenets: {
    boardnav
  }
};
</script>

<style></style>
