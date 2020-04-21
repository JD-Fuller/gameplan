<template>
  <div class="boards page">
    <keep-alive>
      <boardnav />
    </keep-alive>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 upcoming-event">
          <h2 class="event-heading" style="color: white;">Upcoming Events</h2>
          <div v-for="mainEvent in mainEvents" :key="mainEvent._id" class="justify-content-start">
            <div class="card">
              <h5
                class="card-header"
                role="tab"
                id="heading"
                style="text-align: left"
              >Event: {{ mainEvent.date | eventDate }}</h5>
              <div>
                <div class="card-body pb-5">
                  <h3
                    class="font-weight-bold"
                    style="text-align: left; font-variant: all-small-caps"
                  >{{ mainEvent.title }}</h3>
                  <p style="text-align: left">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    {{ mainEvent.location }}
                  </p>
                  <p style="text-align: left">
                    <i class="far fa-calendar-alt mr-2"></i>
                    {{ mainEvent.date | eventDate }}
                  </p>
                  <p class="card-text mb-0 float-left">
                    <i class="fas fa-info-circle mr-2"></i>
                    {{ mainEvent.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h5 class="card-header" role="tab" id="heading">
              <a
                class="collapsed d-block font-weight-bold"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapse"
                aria-expanded="false"
                style="text-align: left; font-variant: all-small-caps; font-size: 22px"
              >
                On deck events
                <i class="fa fa-chevron-down float-right"></i>
              </a>
            </h5>
            <div id="collapse" class="collapse" role="tabpanel">
              <div
                id="accordion"
                role="tablist"
                aria-multiselectable="true"
                v-for="date in dates"
                :key="date._id"
                class="justify-content-start"
              >
                <div class="card-body pb-5">
                  <h3
                    class="font-weight-bold"
                    style="text-align: left; font-variant: all-small-caps"
                  >{{ date.title }}</h3>
                  <p style="text-align: left">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    {{ date.location }}
                  </p>
                  <p style="text-align: left">
                    <i class="far fa-calendar-alt mr-2"></i>
                    {{ date.date | eventDate }}
                  </p>
                  <p class="card-text mb-0 float-left">
                    <i class="fas fa-info-circle mr-2"></i>
                    {{ date.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h2 style="font-variant: all-small-caps; color: white; font-size: 20px;">Bulletin Board</h2>

          <div class="col-md-12">
            <div v-for="post in posts" :key="post._id">
              <p class="mr-3" style="text-align: left">{{ post.content }}</p>
              <p class="text-secondary float-right">
                <i>
                  Coach {{ user.name }},
                  <small>{{ post.createdAt | postFormat }}</small>
                </i>
              </p>
              <div class="dropdown">
                <button
                  class="btn p-0 mr-1 float-right"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-h" style="color: grey;"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div
                    @submit.prevent="editPost()"
                    type="submit"
                    class="dropdown-item mx-1 float-right"
                    @click="editPost(post._id)"
                  >
                    Edit
                    <i class="far fa-edit" style="color: grey"></i>
                  </div>
                  <div
                    @submit.prevent="deletePost()"
                    class="dropdown-item mx-1 float-right"
                    style="color: red;"
                    type="submit"
                    @click="deletePost(post)"
                  >
                    Delete
                    <i class="fas fa-minus-circle"></i>
                  </div>
                </div>
                <br />
              </div>
              <hr />
            </div>
          </div>
          <!-- end of one coloumn -->
          <!-- <div class="container-fluid row"> -->
          <!-- <div class="row"> -->
          <div class="col-md-12 d-flex justify-content-end">
            <form @submit.prevent="addPost" style="display: flex;">
              <input
                v-model="newPost.content"
                type="text"
                style="color: black; font-size: 12px;"
                class="form-control chat-row mr-3"
                placeholder="Add post here..."
                required
              />
              <button class="btn">
                <i class="fas fa-plus-circle" style="color:green; font-size: 20px;"></i>
              </button>
            </form>
          </div>
          <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="container-fluid"> -->

    <!-- </div> -->

    <!-- <div class="col-12 text-light justify-content-">
        {{ weather }}
        <div id="openweathermap-widget-22"></div>
    </div>-->
  </div>
</template>

<script>
import NotificationService from "../NotificationService.js";
import boardnav from "@/components/BoardNav.vue";
import Swal from "sweetalert2";

export default {
  name: "boards",
  mounted() {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Boise,us&appid=dc01cfbd8f10d91a05d0da86a4f7f27c"
      )
      .then(response =>
        (this.weather = Math.round(
          (response.data.main.temp * 9) / 5 - 459.67
        )).catch(error => console.log(error))
      );

    this.$store.dispatch("getPostsByTeamId", this.$store.state.activeTeamId);
    this.$store.dispatch("getEventsByTeamId", this.$store.state.activeTeamId);
  },
  data() {
    return {
      selected: "Select Team",
      weather: this.weather,
      newPost: {
        content: "",
        teamId: ""
      }
    };
  },
  // filters: {
  //   convert(weather) {
  //     return 9 / 5(weather - 273) + 34;
  //   },
  // },
  methods: {
    addPost() {
      let post = { ...this.newPost };
      post.teamId = this.$store.state.activeTeamId;
      this.$store.dispatch("addPost", post);

      this.newPost = {
        content: "",
        teamId: this.$store.state.activeTeamId
      };
    },
    deletePost(post) {
      Swal.fire({
        title: "Delete this post?",
        text: "You won't be able to undo this delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete post!"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("deletePost", post);
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        }
      });
    },
    async editPost(postId) {
      let postInfo = await NotificationService.editPost();
      postInfo.id = postId;
      this.$store.dispatch("editPost", postInfo);
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    user() {
      return this.$store.state.user;
    },
    dates() {
      let dateArray = this.$store.state.events;
      let newArray = dateArray
        .sort(function(a, b) {
          return new Date(a.date) - new Date(b.date);
        })
        .slice(1, 3);
      return newArray;
    },
    mainEvents() {
      let dateArray = this.$store.state.events;
      let newArray = dateArray
        .sort(function(a, b) {
          return new Date(a.date) - new Date(b.date);
        })
        .slice(0, 1);
      return newArray;
    }
  },

  components: {
    boardnav
  }
};
</script>
<style scoped>
.page {
  background-image: url("../assets/grass.jpg");
  background-size: cover;
  min-height: 950px;
}
.bulletin-board {
  background: rgba(84, 83, 83, 0.5);
  color: #f1f1f1;
  border-radius: 8px;
  /* text-shadow: -1px 2px 3px #000; */
}
.card {
  background: rgba(67, 66, 66, 0.8);
  color: #f1f1f1;
  text-shadow: -0.5px 1px 3px #000;
}
.card-header {
  background: rgba(191, 189, 189, 0.502);
  color: #f1f1f1;
  text-shadow: -0.5px 1px 3px #000;
}
.card-header .fa {
  transition: 0.3s transform ease-in-out;
}
.card-header .collapsed .fa {
  transform: rotate(90deg);
}
.main {
  margin-top: 50px;
}
.weather-panel {
  background-image: url("https://unsplash.it/600/400?image=1043&blur");
  background-size: cover;
  border-radius: 20px;
  box-shadow: 25px 25px 40px 0px rgba(0, 0, 0, 0.33);
  color: #fff;
  overflow: hidden;
  position: relative;
}
.small {
  color: #fff;
  font-size: 50%;
}
ul.forecast > li {
  border-top: 1px solid #fff;
}
.temperature {
  font-size: 2em;
}
</style>
