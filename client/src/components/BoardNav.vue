<template>
  <div class="row">
    <div class="col-12">
      <nav class="navbar navbar-expand-lg navbar-light navColor mb-3">
        <router-link :to="{ name: 'boards' }">
          <a class="navbar-brand" href="#">
            <i class="fas fa-running logo"> GamePlan</i>
            <!-- <h3 class="">GamePlan</h3> -->
          </a>
        </router-link>

        <h1
          style="font-variant: all-small-caps; font-family: montserrat; color: darkgreen"
          v-for="team in activeTeam"
          v-bind:value="team._id"
          :key="team._id"
        >
          <b> Active Team: {{ team.title }} </b>
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <button class="btn btn-sm" @click="createTeam()">
                <i class="fa fas-plus">+</i>
              </button>
            </li>
            <li>
              <div>
                <select
                  class="form-control"
                  v-model="selected"
                  style="mx-2"
                  @change="setActiveTeam($event)"
                >
                  <option value="" disabled>Select Team</option>
                  <option
                    v-for="team in teams"
                    v-bind:value="team._id"
                    :key="team._id"
                    >{{ team.title }}</option
                  >
                </select>
              </div>
            </li>
            <li class="nav-item active mx-auto">
              <router-link :to="{ name: 'events' }">
                <button class="btn btn-sm">Events</button>
              </router-link>
            </li>
            <li class="nav-item mx-auto">
              <button class="btn btn-sm">Notes</button>
            </li>
            <li class="nav-item mx-auto">
              <router-link :to="{ name: 'team' }">
                <button class="btn btn-sm">Roster</button>
              </router-link>
            </li>
            <li>
              <button class="btn btn-sm mx-auto" @click="logout()">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import NotificationService from "../NotificationService.js";
export default {
  name: "boardnav",
  data() {
    return {
      selected: ""
    };
  },
  mounted() {
    this.$store.dispatch("getTeams");
  },

  methods: {
    setActiveTeam(event) {
      this.activeTeamId =
        event.target.options[event.target.options.selectedIndex].value;
      this.$store.commit("setActiveTeamId", this.activeTeamId);
      this.$store.dispatch("getPostsByTeamId", this.activeTeamId);
      this.$store.dispatch("getEventsByTeamId", this.activeTeamId);
      console.log(
        "Congrats, we now have an activeTeam",
        this.activeTeamId,
        "Here is the active team id in the store",
        this.$store.state.activeTeamId
      );
    },
    async createTeam() {
      let taskInfo = await NotificationService.inputData("Create a new Team");
      if (taskInfo) {
        this.$store.dispatch("createTeam", taskInfo);
        this.newTask = { title: "" };
      }
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    },
    activeTeam() {
      let activeTeam = this.$store.state.teams.filter(
        t => t._id == this.$store.state.activeTeamId
      );
      return activeTeam;
    }
  }
};
</script>

<style>
.btn:hover {
  background-color: purple;
  color: white;
  cursor: pointer;
}
.navColor {
  background: #a29164;
}
.logo {
  font-size: 2rem;
}
</style>
