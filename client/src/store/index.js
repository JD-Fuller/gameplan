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
    activeTeam: {},
    notes: [],
    activePost: {},
    events: [],
    activeAdmin: {},
    players: [],
    fans: []
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
      state.events = [];
      state.players = [];
      state.notes = [];
      state.teams = [];
      state.fans = [];
      state.activeTeam = {};
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
    putEvent(state, event) {
      state.events.push(event);
    },
    setTeams(state, teams) {
      debugger;
      state.teams = teams;
    },
    setActiveTeam(state, team) {
      debugger;
      state.activeTeam = team;
    },
    allPlayers(state, data) {
      state.players = data;
    },
    createPlayer(state, players) {
      state.players.push(players);
    },
    addFan(state, fans) {
      state.fans.push(fans);
    },
    setFans(state, fans) {
      state.fans = fans;
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
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
    async editPost({ commit, dispatch }, postData) {
      let res = await api.put("posts/" + postData.id, postData);
      dispatch("getPosts");
    },

    //#endregion

    //#region EVENTS
    async getEvents({ commit, dispatch }) {
      let res = await api.get("events");

      commit("setEvents", res.data);
    },
    async createEvent({ commit, dispatch }, eventData) {
      let res = await api.post("events", eventData);
      commit("putEvent", res.data);
    },
    async editEvent({ commit, dispatch }, eventData) {
      debugger;
      let res = await api.put("events/" + eventData._id, eventData);
      dispatch("getEvents");
    },
    async deleteEvent({ commit, dispatch }, eventId) {
      let res = await api.delete("events/" + eventId);
      dispatch("getEvents");
    },
    //#endregion - events

    // #region Teams
    async getTeams({ commit, dispatch }) {
      debugger;
      let res = await api.get("teams");
      commit("setTeams", res.data);
    },
    async createTeam({ commit, dispatch }, teamData) {
      let res = await api.post("/teams", teamData);
      commit("setTeams", res.data);
      console.log(teamData);
    },
    // #endregion

    //#region Players
    async getPlayers({ commit, dispatch }) {
      let res = await api.get("players");

      commit("allPlayers", res.data);
      console.log("players in store", res.data);
    },
    async addPlayer({ commit, dispatch }, playerData) {
      debugger;
      let res = await api.post("players", playerData);
      debugger;
      commit("createPlayer", res.data);
      console.log(playerData);
    },
    async deletePlayer({ commit, dispatch }, playerId) {
      let res = await api.delete("players/" + playerId);
      dispatch("getPlayers");
    },
    async editPlayer({ commit, dispatch }, playerData) {
      let res = await api.put("players/" + playerData.id, playerData);
      dispatch("getPlayers");
    },
    //#endregion

    //#region Fans
    async getFans({ commit, dispatch }) {
      let res = await api.get("fans");
      commit("setFans", res.data);
    },
    async updateTeamGroup({ commit, dispatch }, fanData) {
      let res = await api.put("team/" + fanData.id, fanData);
      commit("setFans", res.data);
    }

    // async createFan({ commit, dispatch }, fanData) {
    //   let res = await api.put("events/" + fanData.);
    //   commit("addFan", res.data);
    // }
  }
});
