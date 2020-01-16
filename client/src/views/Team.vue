<template>
  <div class="team">
    <div class="row container-fluid">
      <div class="col-md-12">
        <navbar />
      </div>
      <div class="row container-fluid mt-5 ml-5">
        <div class="col-md-9 d-flex justify-content-start">
          <h1>TEAM ROSTER</h1>
        </div>
      </div>
      <div class="row container-fluid">
        <div class="col-md-5">{{team}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/BoardNav.vue";
export default {
  name: "team",
  mounted() {
    this.$store.dispatch("getTeams");
  },
  components: {
    navbar
  },
  computed: {
    team() {
      return this.$store.teams;
    }
  }
};
</script>

<style>
</style>