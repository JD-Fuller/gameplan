<template>
  <div class="boards">
    <keep-alive>
      <boardnav />
    </keep-alive>
    <div class="container-fluid row">
      <div class="col-md-4">
        <h2>Upcoming Events</h2>
        <div
          v-for="mainEvent in mainEvents"
          :key="mainEvent._id"
          class="justify-content-start"
        >
          <div class="card">
            <h5
              class="card-header"
              role="tab"
              id="heading"
              style="text-align: left"
            >
              Event: {{ mainEvent.date | eventDate }}
            </h5>
            <div>
              <div class="card-body pb-5">
                <h3
                  class="font-weight-bold"
                  style="text-align: left; font-variant: all-small-caps"
                >
                  {{ mainEvent.title }}
                </h3>
                <p style="text-align: left">
                  <i class="fas fa-map-marker-alt mr-2"></i
                  >{{ mainEvent.location }}
                </p>
                <p style="text-align: left">
                  <i class="far fa-calendar-alt mr-2"></i
                  >{{ mainEvent.date | eventDate }}
                </p>
                <p class="card-text mb-0 float-left">
                  <i class="fas fa-info-circle mr-2"></i
                  >{{ mainEvent.description }}
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
              style="color: red; text-align: left; font-variant: all-small-caps; font-size: 22px"
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
                >
                  {{ date.title }}
                </h3>
                <p style="text-align: left">
                  <i class="fas fa-map-marker-alt mr-2"></i>{{ date.location }}
                </p>
                <p style="text-align: left">
                  <i class="far fa-calendar-alt mr-2"></i
                  >{{ date.date | eventDate }}
                </p>
                <p class="card-text mb-0 float-left">
                  <i class="fas fa-info-circle mr-2"></i>{{ date.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <h2 style="font-variant: all-small-caps">Bulletin Board</h2>
        <div class="container-fluid">
          <div class="row border p-3 shadow">
            <div class="col-md-12">
              <div v-for="post in posts" :key="post._id">
                <p class="mr-3" style="text-align: left">
                  {{ post.content }}
                </p>
                <p class="text-secondary float-right">
                  <i
                    >Coach {{ user.name }},
                    <small>{{ post.createdAt | postFormat }}</small></i
                  >
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
                    <i class="fas fa-ellipsis-h"></i>
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
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
                      @click="deletePost(post._id)"
                    >
                      Delete
                      <i class="fas fa-minus-circle"></i>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <div class="container-fluid row">
              <div class="col-md-12 d-flex justify-content-center">
                <form @submit.prevent="addPost">
                  <input
                    v-model="newPost.content"
                    type="text"
                    class="d-block chat-row mr-3"
                    placeholder="Add post here..."
                    required
                  />
                  <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "../NotificationService.js";
import boardnav from "@/components/BoardNav.vue";
import Swal from "sweetalert2";

export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getPostsByTeamId", this.$store.state.activeTeamId);
    this.$store.dispatch("getEventsByTeamId", this.$store.state.activeTeamId);
  },
  data() {
    return {
      selected: "Select Team",
      newPost: {
        content: "",
        teamId: ""
      }
    };
  },
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
    deletePost(postId) {
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
          this.$store.dispatch("deletePost", postId);
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
.card-header .fa {
  transition: 0.3s transform ease-in-out;
}
.card-header .collapsed .fa {
  transform: rotate(90deg);
}
</style>
