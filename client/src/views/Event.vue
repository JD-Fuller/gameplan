<template>
  <div class="page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12" style=" margin-bottom: 50px;">
          <keep-alive>
            <boardnav />
          </keep-alive>
          <h1 style="color: #f1f1f1;">EVENTS</h1>
          <div>
            <form class="event-form" @submit.prevent="createEvent">
              <!-- Removed items because we were doubling our code -->
              <!-- <h2 class="team-select">
                Select Team:
                <select
                  class="form-control ml-2"
                  v-model="selected"
                  style="mx-2"
                  @change="setActiveTeam($event)"
                >
                  <option value selected disabled>Select Team</option>
                  <option
                    v-for="team in teams"
                    v-bind:value="team._id"
                    :key="team._id"
                    >{{ team.title }}</option
                  >
                </select>
              </h2> -->
              <input
                type="text"
                placeholder="Title..."
                v-model="newEvent.title"
                required
              />
              <input
                type="text"
                placeholder="Description..."
                v-model="newEvent.description"
                required
              />

              <input
                type="date"
                placeholder="Date..."
                v-model="newEvent.date"
              />
              <input
                type="text"
                placeholder="Location..."
                v-model="newEvent.location"
              />
              <button class="btn btn-primary" style="margin:5px;">
                Add Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="table-wrapper shadow p-4" style="overflow-x:auto;">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6" style="text-align: left;">
                  <h2 style="color: #f1f1f1;">Events</h2>
                </div>
                <div class="col-sm-6"></div>
              </div>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in events" :key="event._id">
                  <td>{{ event.title }}</td>
                  <td>{{ event.description }}</td>
                  <td>{{ event.location }}</td>
                  <td>{{ event.date | formatDate }}</td>
                  <td>
                    <div class="dropdown">
                      <button
                        class="btn p-0 mr-1"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-ellipsis-h"></i>
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div
                          class="dropdown-item mx-1 float-right"
                          type="submit"
                          @click="editEvent(event)"
                        >
                          Edit
                          <i class="far fa-edit" style="color: grey"></i>
                        </div>
                        <div
                          @submit.prevent="deleteEvent()"
                          class="mx-1 dropdown-item float-right"
                          style="color: red;"
                          type="submit"
                          @click="deleteEvent(event._id)"
                        >
                          Delete
                          <i class="fas fa-minus-circle"></i>
                        </div>
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import boardnav from "../components/BoardNav";
import NotificationService from "../NotificationService.js";
import Swal from "sweetalert2";
export default {
  name: "Events",
  data() {
    return {
      selected: "Select Team",
      newEvent: {
        title: "",
        description: "",
        date: "",
        location: "",
        teamId: this.$store.state.activeTeamId
      }
    };
  },
  mounted() {
    this.$store.dispatch("getTeams");
    debugger;
    let activeTeamId = this.$store.state.activeTeamId;
    this.$store.dispatch("getEventsByTeamId", activeTeamId);
  },
  methods: {
    setActiveTeam(event) {
      let activeTeamId =
        event.target.options[event.target.options.selectedIndex].value;
      this.$store.commit("setActiveTeamId", activeTeamId);
      this.$store.dispatch("getEventsByTeamId", this.activeTeamId);
    },
    activeTeam() {
      let activeTeam = this.$store.state.activeTeamId;
    },
    createEvent() {
      let event = { ...this.newEvent };
      debugger;
      this.$store.dispatch("createEvent", event);
      this.newEvent = {
        title: "",
        description: "",
        date: "",
        location: "",
        teamId: this.$store.state.activeTeamId
      };
    },
    deleteEvent(eventId) {
      Swal.fire({
        title: "Are you sure you want to delete this event?",
        text: "You will not be able to undo this delete.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#D33",
        confirmButtonText: "Yes, Delete Event"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("deleteEvent", eventId);
          Swal.fire("Deleted!", "Your post has been deleted.", "Success");
        }
      });
    },
    async editEvent(event) {
      let eventInfo = await NotificationService.editEvent(event);
      // eventInfo.id = eventId;
      this.$store.dispatch("editEvent", eventInfo);
    }
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    },
    events() {
      return this.$store.state.events;
    }
  },
  components: {
    boardnav
  }
};
</script>

<style>
.page {
  background-image: url("../assets/grass.jpg");
  background-size: cover;
  min-height: 950px;
}
.table-wrapper {
  margin-bottom: 50px;
}
.table {
  background: rgba(106, 105, 105, 0.5);
  color: #f1f1f1;
  border-radius: 8px;
}
.event-form {
  /* background: rgba(84, 83, 83, 0.5); */
  color: #f1f1f1;
  /* border-radius: 8px; */
}
.form-control {
  max-width: 26vw;
  display: flex;
  align-content: center;
  background: rgba(77, 76, 76, 0.5);
  background-color: rgba(77, 76, 76, 0.5);
}
.event-form {
  text-align: -webkit-center;
}
.team-select {
  display: flex;
  justify-content: center;
}
input,
select,
option {
  background: rgba(77, 76, 76, 0.5);
  color: #f1f1f1;
  border-radius: 8px;
}
</style>
