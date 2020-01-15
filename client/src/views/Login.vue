<template>
  <div class="login container-fluid d-flex pr-0 pl-0">
    <div class="col-lg-5 justify-content-center mt-5">
      <form
        v-if="loginForm"
        @submit.prevent="loginUser"
        class="text-center border border-light p-5"
        action="#!"
      >
        <p class="h4 mb-4">Sign in</p>

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
            <a href>Forgot password?</a>
          </div>
        </div>

        <!-- Sign in button -->
        <button class="btn btn-info btn-block my-4" type="submit">Sign in</button>

        <!-- Register -->
        <div class="action" @click="loginForm = !loginForm">
          <p>Not a member?</p>
          <p v-if="loginForm">Register</p>
          <form v-else @submit.prevent="register">
            <input type="text" v-model="newUser.name" placeholder="name" />
            <input type="email" v-model="newUser.email" placeholder="email" />
            <input type="password" v-model="newUser.password" placeholder="password" />
            <button class="btn btn-warning" type="submit">Create Account</button>
          </form>
        </div>

        <!-- Social login -->
        <p>or sign in with:</p>

        <a href="#" class="mx-2" role="button">
          <i class="fab fa-facebook-f light-blue-text"></i>
        </a>
        <a href="#" class="mx-2" role="button">
          <i class="fab fa-twitter light-blue-text"></i>
        </a>
        <a href="#" class="mx-2" role="button">
          <i class="fab fa-linkedin-in light-blue-text"></i>
        </a>
        <a href="#" class="mx-2" role="button">
          <i class="fab fa-github light-blue-text"></i>
        </a>
      </form>
      <!-- Default form register -->
      <form class="text-center border border-light p-5" action="#!">
        <p class="h4 mb-4">Sign up</p>

        <div class="form-row mb-4">
          <div class="col">
            <!-- First name -->
            <input
              type="text"
              id="defaultRegisterFormFirstName"
              class="form-control"
              placeholder="First name"
            />
          </div>
          <div class="col">
            <!-- Last name -->
            <input
              type="text"
              id="defaultRegisterFormLastName"
              class="form-control"
              placeholder="Last name"
            />
          </div>
        </div>

        <!-- E-mail -->
        <input
          type="email"
          id="defaultRegisterFormEmail"
          class="form-control mb-4"
          placeholder="E-mail"
        />

        <!-- Password -->
        <input
          type="password"
          id="defaultRegisterFormPassword"
          class="form-control"
          placeholder="Password"
          aria-describedby="defaultRegisterFormPasswordHelpBlock"
        />
        <small
          id="defaultRegisterFormPasswordHelpBlock"
          class="form-text text-muted mb-4"
        >At least 8 characters and 1 digit</small>

        <!-- Phone number -->
        <input
          type="text"
          id="defaultRegisterPhonePassword"
          class="form-control"
          placeholder="Phone number"
          aria-describedby="defaultRegisterFormPhoneHelpBlock"
        />
        <small
          id="defaultRegisterFormPhoneHelpBlock"
          class="form-text text-muted mb-4"
        >Optional - for two step authentication</small>

        <!-- Newsletter -->
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="defaultRegisterFormNewsletter" />
          <label
            class="custom-control-label"
            for="defaultRegisterFormNewsletter"
          >Subscribe to our newsletter</label>
        </div>

        <!-- Sign up button -->
        <button class="btn btn-info my-4 btn-block" type="submit">Sign in</button>

        <!-- Social register -->
        <p>or sign up with:</p>

        <a href="#" class="mx-2" role="button">
          <i class="fab fa-facebook-f light-blue-text"></i>
        </a>
        <a href="#" class="mx-2" role="button">
          <i class="fab fa-twitter light-blue-text"></i>
        </a>
        <a href="#" class="mx-2" role="button">
          <i class="fab fa-linkedin-in light-blue-text"></i>
        </a>
        <a href="#" class="mx-2" role="button">
          <i class="fab fa-github light-blue-text"></i>
        </a>

        <hr />

        <!-- Terms of service -->
        <p>
          By clicking
          <em>Sign up</em> you agree to our
          <a href target="_blank">terms of service</a>
        </p>
      </form>
      <!-- Default form register -->

      <!-- <div class="action" @click="loginForm = !loginForm"> -->
      <!-- <p v-if="loginForm">No account? Click here to Register</p> -->
      <!-- <p>Already have an account? Click here to Login</p>
      </div>-->
      <!-- Default form login -->
    </div>
    <div class="col-lg-7 pl-0 pr-0">
      <img
        src="https://images.unsplash.com/photo-1557512367-660ba857c399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
        class="img-fluid w-100 login-image"
        alt
      />
    </div>
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
.login-image {
  display: block;
}
</style>