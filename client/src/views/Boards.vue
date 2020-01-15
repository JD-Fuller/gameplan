<template>
  <div class="boards">
    <boardnav/>
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
      <div class="col-md-4">Events
<div class="container-fluid row">
  <div class="col-md-12">
    <ul>
      <strong>Next Game</strong>
    <li>-Details </li>
   <li> -Start Time</li>
    <li>-Location</li>
    </ul>
  </div>
</div>
      </div>
      <div class="col-md-8">Bulletin
<div class="container-fluid row">
  <div class="col-md-12">
    <ul v-for="post in posts" :key="post.id" class="d-flex justify-content-start">
    <li>{{post.content}}</li>
    </ul>
  </div>
  <div class="container-fluid row">
    <div class="col-md-12 d-flex justify-content-center">
      <input v-model="newPost.content" type="text" class="d-block chat-row" placeholder="comments here" required>      
      <button @click="addPost()">ADD COMMENT</button>
    </div>
  </div>
</div>
      </div>

    </div>
  </div>
</template>

<script>
import boardnav from "@/components/BoardNav.vue"
  export default {
    name: "boards",
    mounted() {
this.$store.dispatch("getPosts")
    },
    data() {
      return {
        newPost: {
          content: "",
        }
      }
    },
    methods: {
      addPost() {
        let post = {...this.newPost};
        this.$store.dispatch("addPost", post);
        this.newPost = {
          content: "",
        }
      }
    },
    computed: {
      posts() {
        return this.$store.state.posts;
      }
    },


  components:{
    boardnav
  }
  };
</script>
<style scoped>
.chat-row{
 min-width: 200px;
}
</style>