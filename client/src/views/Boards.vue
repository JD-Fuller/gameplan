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
        Events
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
        <h1 style="font-variant: all-small-caps">Bulletin Board</h1>
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
import Swal from 'sweetalert2'

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
      Swal.fire({
      title: 'Delete this post?',
      text: "You won't be able to undo this delete!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete post!'
  }).then((result) => {
      if (result.value) {
      this.$store.dispatch("deletePost", postId);
      Swal.fire(
      'Deleted!',
      'Your post has been deleted.',
      'success'
    )
  }
})
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
<style scoped></style>
