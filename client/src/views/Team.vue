<template>
  <div class="team">
    <div class="row container-fluid">
      <div class="col-md-12">
        <navbar />
      </div>
      <div class="row container-fluid mt-5 ml-5 d-flex justify-content-center">
        <div class="col-md-9">
          <h1>TEAM ROSTER</h1>
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
    </div>
  </div>
</template>

<script>
import navbar from "@/components/BoardNav.vue";
export default {
  name: "team",
  mounted() {
    this.$store.dispatch("getTeams");
  },
  components: {
    navbar
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    },
    team() {
      return this.$store.state.teams;
    }
  }
};
</script>

<style>
</style>