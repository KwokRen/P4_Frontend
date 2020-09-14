import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Task from '../views/Task.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Task',
    name: 'Task',
    component: Task
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
