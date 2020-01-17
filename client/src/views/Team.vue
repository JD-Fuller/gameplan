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
            <button class="btn btn-sm bg-danger addButton" @click="show = !show">Add Player</button>
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
    <div class="row container-fluid">
      <div class="col-md-6">
        <form v-if="show" class="playerForm">
          <div class="text-center addHeader text-light">
            <h1>Add Player</h1>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">First Name</label>
              <input type="text" class="form-control" id="inputEmail4" placeholder="first" />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Last Name</label>
              <input type="text" class="form-control" id="inputPassword4" placeholder="last" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputCity">Position</label>
              <input type="text" class="form-control" id="inputCity" placeholder="position" />
            </div>
            <div class="form-group col-md-4">
              <label for="inputState">Grade</label>
              <input id="inputState" class="form-control" placeholder="11th" />
            </div>
            <div class="form-group col-md-4">
              <label for="inputZip">Jersey Number</label>
              <input type="text" class="form-control" id="inputZip" placeholder="#" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input type="text" class="form-control" id="inputCity" placeholder="City" />
            </div>
            <div class="form-group col-md-6">
              <label for="inputState">State</label>
              <input id="inputState" class="form-control" placeholder="State" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">Email</label>
              <input type="email" class="form-control" id="inputCity" placeholder="john@doe.com" />
            </div>
            <div class="form-group col-md-6">
              <label for="inputState" type="tel">Phone</label>
              <input id="inputState" class="form-control" placeholder="(123) 456-7890" />
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck">Check me out</label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import player from "@/components/Player.vue";
import navbar from "@/components/BoardNav.vue";
export default {
  name: "team",
  data() {
    return {
      show: false
    };
  },
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
.addHeader {
  background-color: #3e3f3a;
}
.playerForm {
  position: absolute;
  z-index: 1;
}
</style>