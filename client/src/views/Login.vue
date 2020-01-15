<template>
  <div
    class="login row-container d-flex align-items-center justify-content-center login-background"
  >
    <div class="col-lg-4 login-form pr-0 ml-4">
      <!-- Default form login -->
      <form
        v-if="loginForm"
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
              <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember" />
              <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
            </div>
          </div>
          <div>
            <!-- Forgot password -->
            <p class="text-danger">Forgot password?</p>
          </div>
        </div>

        <!-- Sign in button -->
        <button class="btn btn-danger btn-block my-4" type="submit">Sign in</button>

        <!-- Register -->
        <div class="d-none d-lg-block">
          <p>
            Not a member?
            <a href class="text-danger">Register</a>
          </p>

          <!-- Social login -->
          <p class="login-link">or sign in with:</p>

          <a href="#" class="mx-2" role="button">
            <i class="fab fa-facebook-f text-primary"></i>
          </a>
          <a href="#" class="mx-2" role="button">
            <i class="fab fa-twitter text-primary"></i>
          </a>
          <a href="#" class="mx-2" role="button">
            <i class="fab fa-linkedin-in text-primary"></i>
          </a>
          <a href="#" class="mx-2" role="button">
            <i class="fab fa-github text-dark"></i>
          </a>
        </div>

        <!-- Default form login -->
      </form>
      <form v-else @submit.prevent="register">
        <input type="text" v-model="newUser.name" placeholder="name" />
        <input type="email" v-model="newUser.email" placeholder="email" />
        <input type="password" v-model="newUser.password" placeholder="password" />
        <button class="btn btn-warning" type="submit">Create Account</button>
      </form>
    </div>
    <div class="col-lg-4 d-flex align-items-center pl-0">
      <img
        src="https://images.unsplash.com/photo-1557512367-660ba857c399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
        alt="Stadium with fans and shooting fireworks"
        class="login-picture d-none d-lg-block"
      />
    </div>
    <!-- <div class="action" @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? Click here to Register</p>
      <p v-else>Already have an account? Click here to Login</p>
    </div>-->
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
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
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style>
.action {
  cursor: pointer;
}
.login-background {
  background-color: #696969;
  background-size: cover;
  background-repeat: no-repeat;
  height: 663px;
}
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
  margin-left: 12px;
}
.login {
  font-family: "Montserrat", sans-serif;
}
</style>