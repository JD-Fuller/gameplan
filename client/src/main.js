import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import AuthService from "./AuthService";
import moment from "moment";

//Vue.config.productionTip = false

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  }
});

Vue.filter("eventDate", function(value) {
  if (value) {
    return moment(String(value)).format("ddd, MMM Do YYYY - hh:mm a");
  }
});

async function init() {
  let user = await AuthService.Authenticate();
  if (user) {
    store.commit("setUser", user);
  } else {
    router.push({ name: "login" });
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
init();
