<template>
  <div class="boards">
    <boardnav />
    <!-- WELCOME TO THE BOARDS!!!
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
    </div> -->

    <div class="container-fluid row">
      <div class="col-md-4">
        <h2>Upcoming Events</h2>
        <div
          id="accordion"
          role="tablist"
          aria-multiselectable="true"
          v-for="date in dates"
          :key="date._id"
          class="justify-content-start"
        >
          <!-- <div class="card">
            <h5 class="card-header" role="tab" id="headingOne">
              <a
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                class="d-block"
                style="color: red; text-align: left;"
                >Event 1
                <i class="fa fa-chevron-down float-right"></i>
              </a>
            </h5>

            <div
              id="collapseOne"
              class="collapse show"
              role="tabpanel"
              aria-labelledby="headingOne"
            >
              <div class="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div> -->
          <div class="card">
            <h5 class="card-header" role="tab" id="heading">
              <a
                class="collapsed d-block font-weight-bold"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapse"
                aria-expanded="false"
                style="color: red; text-align: left"
              >
                Event: {{ date.date | eventDate }}
                <i class="fa fa-chevron-down float-right"></i>
              </a>
            </h5>
            <div id="collapse" class="collapse" role="tabpanel">
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
          <div class="row border p-4 shadow">
            <div class="col-md-12">
              <div v-for="post in posts" :key="post._id">
                <p class="mr-3" style="text-align: left">
                  {{ post.content }}
                </p>
                <p class="text-secondary float-right" style="text-align: right">
                  {{ user.name }}, {{ post.createdAt | postFormat }}
                </p>

                <a
                  @submit.prevent="deletePost()"
                  class="mx-1 float-right"
                  style="color: red;"
                  type="submit"
                  @click="deletePost(post._id)"
                >
                  <i class="fas fa-minus-circle"></i></a
                ><a
                  @submit.prevent="editPost()"
                  type="submit"
                  class="mx-1 float-right"
                  @click="editPost(post._id)"
                >
                  <i class="far fa-edit" style="color: grey"></i>
                </a>
              </div>
            </div>
            <div class="container-fluid row">
              <div class="col-md-12 d-flex justify-content-center">
                <input
                  v-model="newPost.content"
                  type="text"
                  class="d-block chat-row mr-3"
                  placeholder="Add post here..."
                  required
                />
                <button @click="addPost()"><i class="fas fa-plus"></i></button>
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
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getEvents");
  },
  data() {
    return {
      newPost: {
        content: ""
      }
    };
  },
  methods: {
    addPost() {
      let post = { ...this.newPost };
      this.$store.dispatch("addPost", post);
      this.newPost = {
        content: ""
      };
    },
    deletePost(postId) {
      this.$store.dispatch("deletePost", postId);
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
        .slice(0, 3);
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
