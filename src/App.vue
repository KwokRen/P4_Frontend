<template>
  <div id="app">
    <div id="nav">
      <Header v-bind:URL="URL" v-bind:loggedIn="loggedIn" @logout="logout"/>

      
    </div>
    <router-view @loggedIn="login($event)" @register="register($event)"/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data: function(){
    return {
      loggedIn: false,
      token: '',
      URL: 'http://localhost:8000'
    }
  },
  methods: {
    login: function(event){
      this.loggedIn = true,
      this.token = event.token
      this.$router.push({ 
         path: 'Task',
        query: { token: this.token, URL: this.URL }
      });
    },
    logout: function(){
      this.loggedIn = false,
      this.token = {}
    },
    register: function(event){
      this.loggedIn = true,
      this.token = event.token
      this.$router.push({ 
         path: 'Task',
        query: { token: this.token, URL: this.URL }
      });
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lato', sans-serif;
}

#nav {
  padding: 30px;
  width: 100vw;
  font-family: 'Roboto', sans-serif;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.buttons > a {
  width: 100px;
}

</style>
