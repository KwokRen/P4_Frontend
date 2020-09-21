<template>
  <div id="app">
    <div id="nav">
      <Header v-bind:URL="URL" v-bind:token="token" v-bind:loggedIn="loggedIn" @logout="logout"/>

      
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
      // URL: 'http://localhost:8000',
      URL: 'https://p4backendtest.herokuapp.com'
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
      localStorage.clear()
    },
    register: function(event){
      this.loggedIn = true,
      this.token = event.token
      this.$router.push({ 
         path: 'Task',
        query: { token: this.token, URL: this.URL }
      });
    }
  },
  beforeMount() {
    const checkIfLoggedIn = () => {
      let isLoggedIn = localStorage.getItem("loggedIn");
      console.log(isLoggedIn)
      if (isLoggedIn == "true") {
        this.user = localStorage.getItem("username")
        this.token = localStorage.getItem("token")
        this.email = localStorage.getItem("email")
        this.$router.push({ 
         path: 'Task',
        query: { token: this.token, URL: this.URL }
      });
        return true
      } else {
        return false
      }
    }
    this.loggedIn = checkIfLoggedIn()
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
  justify-content: flex-start;
  align-items: center;
  font-family: 'Lato', sans-serif;
  width: 100vw;
  height: 100vh;
}

#nav {
  width: 100vw;
  font-family: 'Roboto', sans-serif;
  height: 60px;
  background: purple;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.buttons > a {
  width: 100px;
}

</style>
