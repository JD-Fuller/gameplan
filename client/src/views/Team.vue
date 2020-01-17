<template>
  <div class="team">
    <div class="row container-fluid">
      <div class="col-md-12">
        <navbar />
      </div>
      <div class="row container-fluid mt-5 ml-5 d-flex justify-content-center">
        <div class="col-md-9">
          <div class="d-flex">
            <h1>TEAM ROSTER</h1>
            <button class="btn btn-sm bg-danger addButton">Add Player</button>
          </div>
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
    <div class="row container-fluid d-flex justify-content-center">
      <div class="col-md-10">
        <player />
      </div>
    </div>
  </div>
</template>

<script>
import player from "@/components/Player.vue";
import navbar from "@/components/BoardNav.vue";
export default {
  name: "team",
  props: ["teamData", "playerData"],

  mounted() {
    this.$store.dispatch("getTeams");
    this.$store.dispatch("getPlayers");
  },
  components: {
    navbar,
    player
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    },
    player() {
      return this.$store.state.players;
    }
  }
};
</script>

<style>
.addButton {
  justify-content: end;
  margin-left: auto;
}
</style>