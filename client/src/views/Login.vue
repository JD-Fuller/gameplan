<template>
  <body class="login container-fluid pr-0 pl-0">
    

      <!-- <div
        class="login row-container d-flex align-items-center justify-content-center"
      > -->
            <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/9YffrCViTVk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
<!-- <video autoplay loop muted role="presentation"> <source src="//videos.ctfassets.net/u860i9c783wb/2n0DUCAebiSoM74GCZyedW/d981293f74c04b945b207f20f3c87ce1/SC_HomePage_V2.mp4" type="video/mp4"> </video> -->

        <video autoplay loop muted id="myVideo">
        <source src="https://media.cdn-equinox.com/website/impossiblehappens/30Sec_MASTERMix_Fit_1920x1080_20190521_WithoutTextOverlays1.mp4" type="video/mp4">
        </video>

        <div class="content">
          <h1 class="d-flex justify-content-center"><i class="fas fa-running mr-3"></i>GamePlan</h1>
          <form @submit.prevent="loginUser">
            <div class="d-flex justify-content-center">
            <div class="md-form">
              <i class="fas fa-envelope prefix"></i>
              <input type="email" v-model="creds.email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail">
              <label for="defaultLoginFormEmail" data-error="wrong" data-success="right">Type your email</label>
            </div>
            </div>
            <div class="d-flex justify-content-center">
            <div class="md-form"> 
              <i class="fas fa-lock prefix"></i>
              <input type="password" v-model="creds.password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password">
              <label for="defaultLoginFormPassword" data-error="wrong" data-success="right">Type your password</label>
            <button class="btn btn-danger my-4 d-flex justify-content-center" type="submit">
              Sign in
            </button>
            </div>
            </div>
          </form>        
        </div>
        
        <!-- <div class="col-lg-4 d-flex align-items-center pl-0"> -->
          <!-- <img
            src="https://images.unsplash.com/photo-1557512367-660ba857c399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
            alt="Stadium with fans and shooting fireworks"
            class="login-picture d-none d-lg-block"
          />   -->
        <!-- </div> -->
      <!-- </div> -->
    
    
  </body>
</template>

<script>
import router from "@/router/index.js";
import navbar from "@/components/Nav.vue";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  },

  components: {
    navbar
  }
};
</script>

<style>
/* .video{
min-height: 200px;
} */
/* .stretch{
  min-width: 225%;
} */
/* .row {
  min-height: 100px;
} */
/* .workout {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
} */

/* /* .action {
  cursor: pointer;
} */
 /* .login-background { 
  background-color: #696969;
  background-size: cover;
  background-repeat: no-repeat;
  height: 663px;
  z-index: -1000;
}  */
/* .login-picture {
  padding-right: 53px;
  max-height: 485px;
  min-width: 10px;
  margin-top: 36px;
} */
/* .login-form {
  padding-top: 36px;
}
.sign-login {
  padding-top: 100px;
  padding-top: 0px;
  margin-top: 0px;
}
.p-5 {
  padding: 4rem;
}
.login-link {
  padding-top: 5px;
}
.form-for-login {
  background-color: lightgrey;
  margin-left: 8px;
}
.login {
  font-family: "Montserrat", sans-serif;
} */
/* .video{
  position:absolute
} */
/* .signIn{
  position: absolute;
} */
* {
  box-sizing: border-box;
}
.md-form {
  min-width: 45%;
}

body {
  margin: 0;
  font-family: Arial;
  font-size: 17px;
}

.content {
  position: fixed;
  top: 250px;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  min-width: 100%;
  padding: 20px;
}

#myBtn {
  width: 200px;
  font-size: 18px;
  padding: 10px;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
}

#myBtn:hover {
  background: #ddd;
  color: black;
}

 #myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
}
</style>
