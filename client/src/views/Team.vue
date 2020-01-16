<template>
  <div class="team">
    <div class="row container-fluid">
      <div class="col-md-12">
        <navbar />
      </div>
      <div class="row container-fluid mt-5 ml-5 d-flex justify-content-center">
        <div class="col-md-9">
          <h1>TEAM ROSTER</h1>
        </div>
      </div>
      <div class="row container-fluid">
        <div class="col-md-12 ml-5 d-flex mt-4">
          <ul v-for="team in teams" :key="team._id">
            <li>{{team.title}}</li>
          </ul>
        </div>
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
    teams() {
      return this.$store.state.teams;
    }
  }
};
</script>

<style>
</style>