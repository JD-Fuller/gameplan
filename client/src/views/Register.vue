<template>
  <body class="register container-fluid pr-0 pl-0">
    

      <!-- <div
        class="login row-container d-flex align-items-center justify-content-center"
      > -->
            <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/9YffrCViTVk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
<!-- <video autoplay loop muted role="presentation"> <source src="//videos.ctfassets.net/u860i9c783wb/2n0DUCAebiSoM74GCZyedW/d981293f74c04b945b207f20f3c87ce1/SC_HomePage_V2.mp4" type="video/mp4"> </video> -->

        <video autoplay loop muted id="myVideo">
        <source src="https://media.cdn-equinox.com/website/impossiblehappens/30Sec_MASTERMix_Fit_1920x1080_20190521_WithoutTextOverlays1.mp4" type="video/mp4">
        </video>

        <div class="content">
          <router-link :to="{ name: 'boards' }">
          <h1 class="d-flex justify-content-center"><i class="fas fa-running mr-3"></i>GamePlan</h1>
          </router-link>
          <form @submit.prevent="register">
            <div class="d-flex justify-content-center">
            <div class="md-form">
              <i class="fas fa-envelope prefix"></i>
              <input type="userName" v-model="newUser.name" id="defaultRegisterFormName" class="form-control mb-4" placeholder="User Name" required>
              <label for="defaultRegisterFormName" data-error="wrong" data-success="right">Register</label>
            </div>
            </div>
            <div class="d-flex justify-content-center">
            <div class="md-form">
              <i class="fas fa-envelope prefix"></i>
              <input type="email" v-model="newUser.email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail" required>
              <label for="defaultLoginFormPassword" data-error="wrong" data-success="right">Email</label>
            </div>
            </div>
            <div class="d-flex justify-content-center">
            <div class="md-form">
              <i class="fas fa-lock prefix"></i>
              <input type="password" v-model="newUser.password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password" required> 
              <label for="defaultLoginFormPassword" data-error="wrong" data-success="right">Password</label>
              <button class="btn btn-danger my-4 d-flex justify-content-center" type="submit">Register</button>
            </div>
        </div>
            <div class="d-flex justify-content-around">
                <div>
                  <!-- Remember me -->
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="defaultLoginFormRemember"
                    />
                    <label
                      class="custom-control-label"
                      for="defaultLoginFormRemember"
                      >Remember me</label
                    >
                  </div>
                </div>
                <div>
                  <!-- Forgot password -->
                  <p class="text-danger">Forgot password?</p>
                </div>
              </div>

              <!-- Sign in button -->
              <!-- <button class="btn btn-danger btn-block my-4" type="submit">
                Register
              </button> -->

              <!-- Register -->
              <div>
                <div>
                  <p>
                    Already have an account? Click
                    <router-link to="/login">here to login</router-link>
                  </p>
                </div>
              </div>
          </form>
          <div class="d-flex justify-content-center">
          <p class="login-link d-lg-block d-none">Or sign in with:</p>

              <a href="https://www.facebook.com" class="mx-2" role="button">
                <i class="fab fa-facebook-f text-primary"></i>
              </a>
              <a href="https://www.twitter.com" class="mx-2" role="button">
                <i class="fab fa-twitter text-primary"></i>
              </a>
              <!-- <a href="https://www.linkedin.com" class="mx-2" role="button">
                <i class="fab fa-linkedin-in text-danger"></i>
              </a> -->
              <a href="https://www.github.com" class="mx-2" role="button">
                <i class="fab fa-github text-dark"></i>
              </a>
              </div>            
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
import navbar from "@/components/Nav.vue";
export default {
  name: "register",
  data() {
    return {
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    }
  },
  components: {
    navbar
  }
};
</script>

<style>
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
