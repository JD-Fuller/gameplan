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
            <button>Edit</button>
            <button @click="deletePlayer(player._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
