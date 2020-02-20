<template>
  <div class="team page">
    <div class="row">
      <div class="col-md-12">
        <navbar />
      </div>
      <div class="container-fluid mt-5 ml-4 d-flex justify-content-center">
        <div class="row"></div>
        <div class="col-md-9">
          <div class="d-flex">
            <h1 class="text-light">TEAM ROSTER</h1>
            <button
              class="btn btn-sm text-light addButton py-0"
              style="border-radius:8px;"
              data-target="#addPlayerForm"
              @click="show = !show"
            >
              <span class="mx-1 add-player">Add</span>
              <i class="fas fa-user-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row container-fluid">
        <div class="col-md-12 d-flex justify-content-center mt-4">
          <h1 class="text-light">Team(s):</h1>
          <dl v-for="team in teams" :key="team._id" class="text-center">
            <dt class="text-center li mx-1 text-light">
              {{ team.title }} -
              <i class="fas fa-minus-circle" style="color: red;"
                ><a
                  @submit.prevent="deleteTeam(team._id)"
                  class="delete-team mx-1 float-right"
                  style="color: red;"
                  type="submit"
                  @click="deleteTeam(team._id)"
                >
                </a>
              </i>
            </dt>
          </dl>
        </div>
      </div>
    </div>
    <div class="row container-fluid d-flex justify-content-center">
      <div class="col-md-10 justify-content-center">
        <player />
      </div>
    </div>
    <div class="row container-fluid">
      <div class="col-md-6">
        <form
          id="addPlayerForm"
          @submit.prevent="addPlayer"
          v-if="show"
          class="playerForm formPad justify-content-center"
        >
          <div class="addHeader pt-3 d-flex justify-content-center">
            <h1>Add Player</h1>
          </div>
          <div class="form-row mt-4 mr-4 ml-4">
            <div class="form-group col-md-6">
              <label for="inputEmail4">First Name</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                placeholder="first"
                v-model="newPlayer.firstName"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="inputPassword4"
                placeholder="last"
                v-model="newPlayer.lastName"
                required
              />
            </div>
          </div>
          <div class="form-row mr-4 ml-4">
            <div class="form-group col-md-4">
              <label for="inputCity">Position</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                placeholder="position"
                v-model="newPlayer.position"
                required
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputState">Grade</label>
              <input
                id="inputState"
                class="form-control"
                placeholder="11th"
                v-model="newPlayer.grade"
                required
              />
            </div>
            <div class="form-group col-md-4">
              <label for="jerseyNumber">Jersey Number</label>
              <input
                type="text"
                class="form-control"
                id="jerseyNumber"
                placeholder="#"
                v-model="newPlayer.jerseyNumber"
              />
            </div>
          </div>
          <div class="form-row mr-4 ml-4">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                placeholder="City"
                v-model="newPlayer.homeCity"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputState">State</label>
              <input
                id="inputState"
                class="form-control"
                placeholder="State"
                v-model="newPlayer.homeState"
              />
            </div>
          </div>
          <div class="form-row mr-4 ml-4">
            <div class="form-group col-md-6">
              <label for="inputCity">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputCity"
                placeholder="john@doe.com"
                v-model="newPlayer.email"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputState" type="tel">Phone</label>
              <input
                id="inputState"
                class="form-control"
                placeholder="(123) 456-7890"
                v-model="newPlayer.phoneNumber"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary mb-4">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import player from "@/components/Player.vue";
import navbar from "@/components/BoardNav.vue";
import Swal from "sweetalert2";
export default {
  name: "team",
  mounted() {
    this.$store.dispatch("getTeams");
    this.$store.dispatch("getPlayersByTeamId", this.$store.state.activeTeamId);
  },
  props: ["teamData", "playerData"],
  data() {
    return {
      newPlayer: {
        firstName: "",
        lastName: "",
        position: "",
        grade: "",
        jerseyNumber: "",
        homeCity: "",
        homeState: "",
        email: "",
        phoneNumber: "",
        authorId: this.authorId,
        teamId: ""
      },
      show: false
    };
  },
  methods: {
    addPlayer() {
      let player = { ...this.newPlayer };
      player.teamId = this.$store.state.activeTeamId;
      this.$store.dispatch("addPlayer", player);
      this.newPlayer = {
        firstName: "",
        lastName: "",
        position: "",
        grade: "",
        jerseyNumber: "",
        homeCity: "",
        homeState: "",
        email: "",
        phoneNumber: "",
        authorId: this.authorId,
        teamId: this.$store.state.activeTeamId
      };
    },
    deleteTeam(teamId) {
      Swal.fire({
        title: "Delete this team?",
        text: "You won't be able to undo this delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete team!"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("deleteTeam", teamId);
          Swal.fire("Deleted!", "Your team has been deleted.", "success");
        }
      });
    }
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
  display: inline-block;
  max-height: 45px;
  background-color: rgb(4, 84, 21);
}
.addButton:hover {
  text-shadow: 10px;
  background-color: #a9059e;
}
.addHeader {
  background-color: #3e3f3a;
}
.page {
  background-image: url("../assets/grass.jpg");
  background-size: cover;
  min-height: 950px;
}
.formPad {
  margin-bottom: 20px;
}
.playerForm {
  position: absolute;
  background: rgba(84, 83, 83, 0.5);
  color: #f1f1f1;
  border-radius: 8px;
}
</style>
