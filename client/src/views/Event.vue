<template>
  <div>
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
        <input type="text" placeholder="Date..." v-model="newEvent.date" />
        <input
          type="text"
          placeholder="Location..."
          v-model="newEvent.location"
        />
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="row">
      <div class="col">
        <ul v-for="event in events" :key="event._id">
          {{
            event
          }}
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  computed: {
    events() {
      return this.$store.state.events;
    }
  }
};
</script>

<style></style>
