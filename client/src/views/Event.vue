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
                type="text"
                placeholder="Date..."
                v-model="newEvent.date"
              />
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
                  <td>
                    <button
                      @click="deleteEvent(event._id)"
                      class="btn btn-danger mr-4"
                    >
                      x</button
                    ><button @click="editEvent(event._id)">Edit</button>
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
      debugger;
      this.$store.dispatch("deleteEvent", eventId);
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
