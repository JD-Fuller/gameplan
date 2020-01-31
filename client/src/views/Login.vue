<template>
  <div class="login row container-fluid pr-0 pl-0">
    <div class="col-12 pr-0 pl-0">
      <navbar />

      <div
        class="login row-container d-flex align-items-center justify-content-center"
      >
            <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/9YffrCViTVk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
<!-- <video autoplay loop muted role="presentation"> <source src="//videos.ctfassets.net/u860i9c783wb/2n0DUCAebiSoM74GCZyedW/d981293f74c04b945b207f20f3c87ce1/SC_HomePage_V2.mp4" type="video/mp4"> </video> -->

 <video class="stretch" autoplay loop muted role="presentation">
        <source src="https://media.cdn-equinox.com/website/impossiblehappens/30Sec_MASTERMix_Fit_1920x1080_20190521_WithoutTextOverlays1.mp4" type="video/mp4">
      </video>
        <div class="col-lg-4 login-form pr-0 ml-4 signIn">
          <!-- Default form login -->
          <form
            @submit.prevent="loginUser"
            class="text-center border border-light p-5 form-for-login"
          >
            <p class="h4 mb-4 sign-login">Sign in</p>

            <!-- Email -->
            <input
              type="email"
              v-model="creds.email"
              id="defaultLoginFormEmail"
              class="form-control mb-4"
              placeholder="E-mail"
            />

            <!-- Password -->
            <input
              type="password"
              v-model="creds.password"
              id="defaultLoginFormPassword"
              class="form-control mb-4"
              placeholder="Password"
            />

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
            <button class="btn btn-danger btn-block my-4" type="submit">
              Sign in
            </button>

            <!-- Register -->
            <div>
              <div>
                <p>
                  Dont have an account? Click
                  <router-link to="/register"> here to register </router-link>
                </p>
              </div>
              <!-- Social login -->
              <p class="login-link d-lg-block d-none">or sign in with:</p>

              <a href="https://www.facebook.com" class="mx-2" role="button">
                <i class="fab fa-facebook-f text-primary"></i>
              </a>
              <a href="https://www.twitter.com" class="mx-2" role="button">
                <i class="fab fa-twitter text-primary"></i>
              </a>
              <a href="https://www.linkedin.com" class="mx-2" role="button">
                <i class="fab fa-linkedin-in text-primary"></i>
              </a>
              <a href="https://www.github.com" class="mx-2" role="button">
                <i class="fab fa-github text-dark"></i>
              </a>
            </div>

            <!-- Default form login -->
          </form>
        </div>
        <div class="col-lg-4 d-flex align-items-center pl-0">
          <!-- <img
            src="https://images.unsplash.com/photo-1557512367-660ba857c399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
            alt="Stadium with fans and shooting fireworks"
            class="login-picture d-none d-lg-block"
          />   -->
        </div>
      </div>
    </div>
  </div>
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
.stretch{
  min-width: 225%;
}
.action {
  cursor: pointer;
}
/* .login-background {
  background-color: #696969;
  background-size: cover;
  background-repeat: no-repeat;
  height: 663px;
  z-index: -1000;
} */
.login-picture {
  padding-right: 53px;
  max-height: 485px;
  min-width: 10px;
  margin-top: 36px;
}
.login-form {
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
}
/* .video{
  position:absolute
} */
.signIn{
  position: absolute;
}
</style>
