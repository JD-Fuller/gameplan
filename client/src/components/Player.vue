<template>
  <div class="table shadow">
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
          <th scope="col"></th>
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
          <td class="d-flex">
            <i
              class="far fa-edit text-success px-1 py-1"
              @click="editPlayer(player._id)"
            ></i>
            <i
              class="fas fa-trash-alt text-danger px-1 py-1"
              @click="deletePlayer(player._id)"
            ></i>
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
      Swal.fire({
        title: "Delete this player?",
        text: "You won't be able to undo this delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete player!"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("deletePlayer", playerId);
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        }
      });
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
i:hover {
  color: white;
  cursor: pointer;
}
</style>
