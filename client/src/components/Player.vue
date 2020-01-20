<template>
  <div class="table">
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Attendance</th>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Position</th>
          <th scope="col">Grade</th>
          <th scope="col">Home Town</th>
          <th scope="col">Contact Info</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player._id">
          <th>
            <input type="checkbox" class="checkBox" />
          </th>
          <th>{{ player.jerseyNumber }}</th>
          <td>{{ player.firstName }}</td>
          <td>{{ player.lastName }}</td>
          <td>{{ player.position }}</td>
          <td>{{ player.grade }}</td>
          <td>{{ player.homeCity }}, {{ player.homeState }}</td>
          <td>{{ player.email }} / {{ player.phoneNumber }}</td>
          <td>
            <button @click="editPlayer(player._id)">Edit</button>
            <button @click="deletePlayer(player._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NotificationService from "../NotificationService";
import Swal from "sweetalert2";
export default {
  name: "player",
  mounted() {
    this.$store.dispatch("getPlayers");
  },
  computed: {
    players() {
      return this.$store.state.players;
    }
  },
  methods: {
    deletePlayer(playerId) {
      this.$store.dispatch("deletePlayer", playerId);
    },
    async editPlayer(playerId) {
      let playerInfo = await NotificationService.editPlayer();
      playerInfo.id = playerId;

      this.$store.dispatch("editPlayer", playerInfo);
    }
  }
};
</script>

<style>
.checkBox {
  height: 20px;
  width: 20px;
}
/* .tableBoarder {
  border-radius: 10%;
} */
</style>
