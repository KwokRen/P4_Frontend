<template>
  <div class="task-container">
    <img alt="Vue logo" src="../assets/logo.png">
    <ul class="task-list">
      <li class="task" v-for="task of tasks" v-bind:key="task.id">{{task.name}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Task',
  data: function (){
    return {
      tasks: []
    }
  },
  created: function(){
    const {token, URL} = this.$route.query
    fetch(`${URL}/todo/tasks`, {
      method: "get",
      headers: {
        authorization: `JWT ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.results)
      this.tasks = data.results
    })
  }
}
</script>

<style>

  .task-list {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .task {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    border: 1px solid green;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    background: green;
    height: 30px;
    width: 100px;
  }

</style>