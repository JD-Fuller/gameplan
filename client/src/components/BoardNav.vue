<template>
  <div class="row container-fluid">
      <div class="col-12">
          <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
    <a class="navbar-brand" href="#"><i class="fas fa-running mr-3"></i>GamePlan</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
          <button class="btn btn-none">Events</button>
      </li>
      <li class="nav-item ml-4">
          <button class="btn btn-none">Notes</button>
      </li>
      <li class="nav-item ml-4">
          <button class="btn btn-none">Roster</button>
      </li>
      <li>
        <button class="btn btn-none" @click="logout()">Logout</button>
      </li>
    </ul> 
  </div>
</nav>
      </div>
  </div>
</template>

<script>
export default {
name: "boardnav",
methods: {
  logout(){
this.$store.dispatch("logout")
  }
}
}

</script>

<style>
.btn:hover{
background-color: red
}
</style>