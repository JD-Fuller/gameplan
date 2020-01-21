<template>
  <div class="team">
    <div class="row">
      <div class="col-md-12">
        <navbar />
      </div>
      <div class="container-fluid mt-5 ml-4 d-flex justify-content-center">
        <div class="row"></div>
        <div class="col-md-9">
          <div class="d-flex">
            <h1>TEAM ROSTER</h1>
            <button
              class="btn btn-sm text-light 
               addButton py-0"
              data-toggle="modal"
              data-target="#addPlayerForm"
              @click="show = !show"
            >
              <i class="fas fa-user-plus"> Add Player</i>
            </button>
          </div>
        </div>
      </div>
      <div class="row container-fluid">
        <div class="col-md-12 d-flex justify-content-center mt-4">
          <p>Team(s):</p>
          <dl v-for="team in teams" :key="team._id" class="text-center">
            <dt class="text-center li mx-1">{{ team.title }} |</dt>
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
          class="playerForm bg-light formPad justify-content-center"
        >
          <div class="text-center addHeader text-light">
            <h1>Add Player</h1>
          </div>
          <div class="form-row">
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
          <div class="form-row">
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
          <div class="form-row">
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
          <div class="form-row">
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
          <!-- <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck">Coach</label>
            </div>
            <div>
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck">Player</label>
            </div>
          </div>-->
          <button type="submit" class="btn btn-primary">Submit</button>
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
        teamId: this.teamId
      },
      show: false
    };
  },
  methods: {
    addPlayer() {
      let player = { ...this.newPlayer };
      this.$store.dispatch("addPlayer", player);
      this.newPlayer = {
        firstName: "",
        lastName: "",
        position: "",
        grade: "",
        jerseyNumber: Number,
        homeCity: "",
        homeState: "",
        email: "",
        phoneNumber: "",
        authorId: this.authorId,
        teamId: this.teamId
      };
    }
  },

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
  display: inline-block;
  max-height: 45px;
  background-color: purple;
}
.addButton:hover {
  text-shadow: 10px;
  background-color: #a9059e;
}
.addHeader {
  background-color: #3e3f3a;
}
.team {
  background-image: url(https://images.pexels.com/photos/54567/pexels-photo-54567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);
  background-size: cover;
  min-height: 950px;
}
.formPad {
  margin-bottom: 20px;
}
</style>
