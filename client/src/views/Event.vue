<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col" style=" margin-bottom: 50px;">
          <boardnav />
          <h1>EVENTS PAGE</h1>
          <div>
            <form @submit.prevent="createEvent">
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
              <!-- <input
                type="time"
                placeholder="Time..."
                v-model="newEvent.time"
              /> -->
              <input
                type="text"
                placeholder="Location..."
                v-model="newEvent.location"
              />
              <button class="btn btn-primary" style="margin:5px;">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="table-wrapper shadow p-4">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6 " style="text-align: left;">
                  <h2>Events</h2>
                </div>
                <div class="col-sm-6"></div>
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <!-- <th>
                    <span class="custom-checkbox">
                      <input type="checkbox" id="selectAll">
                      <label for="selectAll"></label>
                    </span
                  </th> -->
                  <th>Title</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Date</th>
                  <!-- <th>Time</th> -->
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in events" :key="event._id">
                  <!-- <td><span class="custom-checkbox">
            <input type="checkbox">
            </span></td> -->
                  <td>{{ event.title }}</td>
                  <td>{{ event.description }}</td>
                  <td>{{ event.location }}</td>
                  <td>{{ event.date | formatDate }}</td>
                  <!-- <td>{{ event.time | formatTime }}</td> -->
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
                          @submit.prevent="editEvent()"
                          class="dropdown-item mx-1 float-right"
                          type="submit"
                          @click="editEvent(event._id)"
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
            <div class="clearFix">Coming Soon</div>
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
      newEvent: {
        title: "",
        description: "",
        date: "",
        location: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("getEvents");
  },
  methods: {
    createEvent() {
      let event = { ...this.newEvent };
      this.$store.dispatch("createEvent", event);
      this.newEvent = { title: "", description: "", date: "", location: "" };
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
    async editEvent(eventId) {
      let eventInfo = await NotificationService.editEvent();
      eventInfo.id = eventId;
      this.$store.dispatch("editEvent", eventInfo);
    }
  },
  computed: {
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
.table-wrapper {
  margin-bottom: 50px;
}
</style>
