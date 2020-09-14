<template>
  <div class="header">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          In-Check
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#">
          <router-link to="/">Home</router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
          <router-link to="/Page2">About</router-link>
        </b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Contact
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <router-link to="/Login" v-if="!loggedIn" v-bind:URL="URL"><a class="button is-light">Login</a></router-link>
            <router-link to="#" v-if="loggedIn" v-bind:URL="URL"><a class="button is-light">Logout</a></router-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["URL", "loggedIn"],
  // methods: {
  //   logout: function(){
  //     this.$emit('logout')
  //   }
  // }
};
</script>

<style>
.header {
    width: 90%;
    margin: 10px auto
}

</style>
