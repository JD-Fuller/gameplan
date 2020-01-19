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

        <div id="accordion" role="tablist" aria-multiselectable="true">
          <div class="card">
            <h5 class="card-header" role="tab" id="headingOne">
              <a
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                class="d-block"
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
          </div>
          <div class="card">
            <h5 class="card-header" role="tab" id="headingTwo">
              <a
                class="collapsed d-block"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Event 2
                <i class="fa fa-chevron-down float-right"></i>
              </a>
            </h5>
            <div
              id="collapseTwo"
              class="collapse"
              role="tabpanel"
              aria-labelledby="headingTwo"
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
          </div>
          <div class="card">
            <h5 class="card-header" role="tab" id="headingThree">
              <a
                class="collapsed d-block"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Event 3
                <i class="fa fa-chevron-down float-right"></i>
              </a>
            </h5>
            <div
              id="collapseThree"
              class="collapse"
              role="tabpanel"
              aria-labelledby="headingThree"
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
          </div>
        </div>

        <div class="container-fluid row">
          <div class="col-md-12">
            <ul>
              <strong>Next Game</strong>
              <li>-Details</li>
              <li>-Start Time</li>
              <li>-Location</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <h2 style="font-variant: all-small-caps">Bulletin Board</h2>
        <div class="container-fluid row border p-4 shadow">
          <div class="col-md-12">
            <ul
              v-for="post in posts"
              :key="post._id"
              class="d-flex justify-content-start"
            >
              <h4 class="mr-3">{{ post.content }}</h4>
              <p>Coach: {{ user.name }}</p>

              <a
                @submit.prevent="deletePost()"
                class="mx-3"
                style="color: red"
                type="submit"
                @click="deletePost(post._id)"
              >
                <i class="fas fa-minus-circle"></i></a
              ><a
                @submit.prevent="editPost()"
                type="submit"
                @click="editPost(post._id)"
              >
                <i class="far fa-edit" style="color: grey"></i>
              </a>
            </ul>
          </div>
          <div class="container-fluid row">
            <div class="col-md-12 d-flex justify-content-center">
              <input
                v-model="newPost.content"
                type="text"
                class="d-block chat-row"
                placeholder="comments here"
                required
              />
              <button @click="addPost()">ADD COMMENT</button>
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
