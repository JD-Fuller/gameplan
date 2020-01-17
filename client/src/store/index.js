import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    posts: [],
    teams: [],
    notes: [],
    activePost: {},
    events: [],
    players: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    resetState(state) {
      state.user = {};
      state.posts = [];
      state.activePost = {};
    },
    addPost(state, post) {
      state.posts.push(post);
    },
    allPosts(state, data) {
      state.posts = data;
    },
    setEvents(state, events) {
      state.events = events;
    },
    setTeams(state, teams) {
      state.teams = teams;
    },
    setPlayers(state, players) {
      state.players = players;
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "events" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "events" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    //#endregion

    //#region -- BOARDS --
    // getPosts({ commit, dispatch }) {
    //   api.get("posts").then(res => {
    //     commit("setPosts", res.data);
    //   });
    // },
    // addPost({ commit, dispatch }, postData) {
    //   api.post('posts', postData)
    //     .then(serverBoard => {
    //       dispatch('getPosts')
    //     })
    // },
    // //#endregion

    //#region -- LISTS --
    async addPost({ commit, dispatch }, postData) {
      console.log(postData);
      let res = await api.post("posts", postData);
      commit("addPost", res.data);
      // dispatch("getPosts")
    },

    async getPosts({ commit, dispatch }) {
      let res = await api.get("posts");
      commit("allPosts", res.data);
    },
    async deletePost({ commit, dispatch }, id) {
      let res = await api.delete(`posts/${id}`);
      dispatch("getPosts");
    },

    //#endregion

    //#EVENTS
    async getEvents({ commit, dispatch }) {
      let res = await api.get("events");
      commit("setEvents", res.data);
    },
    async createEvent({ commit, dispatch }, eventData) {
      let res = await api.post("events", eventData);
    },
    //#endregion - events
    // #region Teams
    async getTeams({ commit, dispatch }) {
      let res = await api.get("teams");
      commit("setTeams", res.data);
    },
    async createTeam({ commit, dispatch }, teamData) {
      let res = await api.post("/teams", teamData);
      commit("setTeams", res.data);
    },
    // #endregion

    //#region Players
    async getPlayers({ commit, dispatch }) {
      let res = await api.get("players");
      commit("setPlayers", res.data);
    }
    //#endregion
  }
});
