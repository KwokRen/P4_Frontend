<template>
  <div class="header">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item>
          <router-link :to="{name: 'Home', query: {URL: this.URL, token: this.token, loggedIn: this.loggedIn}}">In Check</router-link>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item id="no-click">
          <router-link :to="{name: 'Task', query: {URL: this.URL, token: this.token, loggedIn: this.loggedIn}}" v-if="loggedIn">Tasks</router-link>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons" id="buttons">
            <router-link :to="{ name: 'Register', query: { URL: this.URL }}" v-if="!loggedIn" v-bind:URL="URL"><a class="button is-light" id="purple">Register</a></router-link>
            <router-link :to="{ name: 'Login', query: { URL: this.URL }}" v-if="!loggedIn" v-bind:URL="URL"><a class="button is-light">Log in</a></router-link>
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
.header {
    width: 90%;
    height: 60px;
    margin: 10px auto
}

#no-click {
  cursor: initial;
}

#no-click:hover {
  background: white;
}

#buttons {
  justify-content: center;
}

#purple {
  background: purple;
  color: white;
}

#purple:hover {
  background: rgb(165, 1, 165);
}

</style>
