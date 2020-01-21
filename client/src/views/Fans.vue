<template> </template>

<script>
export default {
  name: "Fans",
  data() {
    return {
      newFan: {
        name: "",
        email: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("getFans");
  },
  computed: {
    fans() {
      return this.$store.state.fans;
    }
  }
};
</script>

<style></style>
