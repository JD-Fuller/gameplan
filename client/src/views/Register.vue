<template>
  <div class="register">
    <div class="row container-fluid register-background pb-5 m-0">
      <div class="col-md-12 pr-5 m-0">
        <navbar />
        <div class="row container-fluid d-flex justify-content-center mt-4">
          <div class="col-md-5">
            <form
              @submit.prevent="register"
              class="text-center border border-light p-5 form-for-login"
            >
              <p class="h4 mb-4 sign-login">Register</p>
              <input
                type="userName"
                v-model="newUser.name"
                id="defaultRegisterFormName"
                class="form-control mb-4"
                placeholder="User Name"
              />
              <!-- Email -->
              <input
                type="email"
                v-model="newUser.email"
                id="defaultLoginFormEmail"
                class="form-control mb-4"
                placeholder="E-mail"
              />

              <!-- Password -->
              <input
                type="password"
                v-model="newUser.password"
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
                Register
              </button>

              <!-- Register -->
              <div>
                <div>
                  <p>
                    Already have an account? Click
                    <router-link to="/login">here to login</router-link>
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
        </div>
      </div>
    </div>
  </div>
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
.register-background {
  background: url("https://images.unsplash.com/photo-1578134260566-d4083893996a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  padding-left: 0px;
  margin-right: 0px;
}
</style>
