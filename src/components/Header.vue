<template>
  <div class="header">
    <b-navbar>
      <template slot="brand" v-if="!loggedIn">
        <router-link :to="{ name: 'Login', query: { URL: this.URL }}" v-if="!loggedIn" v-bind:URL="URL" class="logo"></router-link>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons" id="buttons">
            <router-link :to="{ name: 'Register', query: { URL: this.URL }}" v-if="!loggedIn" v-bind:URL="URL"><a class="button is-light" id="purple">Register</a></router-link>
            <router-link :to="{ name: 'Login', query: { URL: this.URL }}" v-if="!loggedIn" v-bind:URL="URL"><a class="button is-light" id="purple">Log in</a></router-link>
            <router-link to="#" v-if="loggedIn" v-bind:URL="URL"><a class="button is-light" id="purple" v-on:click="logout">Logout</a></router-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["URL", "loggedIn", "token"],
  methods: {
    logout: function(){
      this.$emit('logout')
      console.log('hello again')
    }
  }
};
</script>

<style>

.logo {
  background: url("https://res.cloudinary.com/dpggcudix/image/upload/v1600528997/Screen_Shot_2020-09-19_at_11.22.53_AM_s3977i.png");
  background-size: cover;
  width: 150px;
}

.navbar {
  background: purple;
}

.navbar-brand, .navbar-tabs {
  background: purple;
}

.navbar-burger {
  color: white !important;
}

.navbar-menu {
  height: 100%;
  background: purple;
}

.header {
    width: 90%;
    margin: 0px auto
}

#no-click {
  cursor: initial;
  background: transparent;
}

#no-click:hover {
  background: transparent;
}

#buttons {
  justify-content: center;
}

#purple {
  background: purple;
}

#purple:hover {
  background: rgb(165, 1, 165);
}

#tasks-nav:hover {
  color: #d2d2d2;
}

a > a {
  color: white !important;
}

.tasks-nav {
  margin-left: 5px;
}

</style>
