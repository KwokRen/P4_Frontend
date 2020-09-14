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
          <router-link to="/Task">About</router-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link :to="{ name: 'Register', query: { URL: this.URL }}" v-if="!loggedIn" v-bind:URL="URL"><a class="button is-primary">Register</a></router-link>
            <router-link :to="{ name: 'Login', query: { URL: this.URL }}" v-if="!loggedIn" v-bind:URL="URL"><a class="button is-light">Login</a></router-link>
            <router-link to="#" v-if="loggedIn" v-bind:URL="URL"><a class="button is-light" v-on:click="logout">Logout</a></router-link>
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
  methods: {
    logout: function(){
      this.$emit('logout')
      console.log('hello again')
    }
  }
};
</script>

<style>
.header {
    width: 90%;
    margin: 10px auto
}

</style>
