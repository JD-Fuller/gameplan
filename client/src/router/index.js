import Vue from "vue";
import Router from "vue-router";
// @ts-ignore
import Boards from "../views/Boards.vue";
// @ts-ignore
import Event from "../views/Event.vue";
// @ts-ignore
import Login from "../views/Login.vue";
// @ts-ignore
import Team from "../views/Team.vue";

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
    },
    {
      path: "/team",
      name: "team",
      component: Team
    }
  ]
});
