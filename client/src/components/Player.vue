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
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>Attack</td>
          <td>Sophomore</td>
          <td>Boise, Idaho</td>
          <td>marcel@mima.com / 208-XXX-XXXX</td>
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
  }
};
</script>

<style>
</style>