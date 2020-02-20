<template>
  <div class="row">
    <div class="col-12">
      <nav class="navbar navbar-expand-lg navbar-light navColor mb-3">
        <router-link :to="{ name: 'boards' }">
          <a class="navbar-brand" href="#" style="display: inline-flex">
            <i class="fas fa-running fa-3x"></i>
            <h2 style="font-variant: all-small-caps; font-size: 3.5rem;">GamePlan</h2>
          </a>
        </router-link>
        <div class="active-team ml-5">
          <h1
            style="font-variant: all-small-caps; font-family: montserrat; color: white"
            v-for="team in activeTeam"
            v-bind:value="team._id"
            :key="team._id"
          >
            <b>Active Team: {{ team.title }}</b>
          </h1>
        </div>
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
              <button class="btn" @click="createTeam()">
                <i class="fa fas-plus-circle" style="font-size: 16px;">+</i>
              </button>
            </li>
            <li>
              <div>
                <select
                  class="form-control"
                  v-model="selected"
                  style="mx-2; color: white; font-size: 12px;"
                  @change="setActiveTeam($event)"
                >
                  <optgroup>
                    <option value disabled>Select Team</option>
                    <option
                      v-for="team in teams"
                      v-bind:value="team._id"
                      :key="team._id"
                    >{{ team.title }}</option>
                  </optgroup>
                </select>
              </div>
            </li>
            <li class="nav-item active mx-auto">
              <router-link :to="{ name: 'events' }">
                <button class="btn btn-sm text-light">Events</button>
              </router-link>
            </li>
            <li class="nav-item mx-auto">
              <router-link :to="{ name: 'team' }">
                <button class="btn btn-sm text-light">Roster</button>
              </router-link>
            </li>
            <li class="nav-item mx-auto disabled">
              <button class="btn btn-sm disabled text-light">Notes</button>
            </li>
            <li>
              <button class="btn btn-sm mx-auto text-light" @click="logout()">Logout</button>
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
      this.$store.dispatch("getPlayersByTeamId", this.activeTeamId);
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
  background-color: rgb(123, 125, 126);
  color: white;
  cursor: pointer;
}
.navColor {
  background: rgba(206, 205, 205, 0.5);
  /* color: #f1f1f1; */
  /* border-radius: 8px; */
}
.logo {
  font-size: 2rem;
}
.btn.disabled {
  cursor: not-allowed;
}
.btn.disabled:hover {
  color: transparent;
  background-color: transparent;
}
optgroup {
  font-size: 3rem;
}
</style>
