import Vue from "vue";
import Router from "vue-router";
import Boards from "../views/Boards.vue";
import Event from "../views/Event.vue";
import Login from "../views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "boards",
      component: Boards
    },
    {
      path: "/events",
      name: "event",
      props: true,
      component: Event
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
