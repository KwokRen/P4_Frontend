<template>
  <div class="task-container">
    <div class="task-ui">
      <div class="task-list">
        <div class="task" v-for="task of tasks" v-bind:key="task.id">
          <div class="radio-button" v-bind:id="task.id">
              <b-checkbox v-bind:id="task.id" :value="false"
              type="is-success">
              </b-checkbox>
          </div>
          {{task.name}}
        </div>
      </div>
      <div class="create-new-task">
        <div v-if="!createNewTask" @click="createNewTask = !createNewTask"><i class="fas fa-plus"></i><span class="add-task">Add task</span></div>
      </div>
      <div class="text-area-create" v-if="createNewTask">
        <b-input class="text-area" placeholder="e.g. Work on a project for a software engineering program" v-model="newTask"></b-input>
        <div class="create-button-container">
          <button class="button is-light" id="create-button" @click="create">Create</button>
          <button class="button is-light" @click="createNewTask = !createNewTask">Cancel</button>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>

export default {
  name: 'Task',
  data: function (){
    return {
      tasks: [],
      createNewTask: false,
      newTask: ""
    }
  },
  created: function(){
    this.getTasks()
  },
  methods: {
    create: function(){
      const {token, URL} = this.$route.query
      const new_task = {name: this.newTask}
      fetch(`${URL}/todo/tasks/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "authorization": `JWT ${token}`
        },
        body: JSON.stringify(new_task)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.newTask = "",
        this.createNewTask = false
        this.getTasks()
      })
    },
    getTasks: function(){
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
}
</script>

<style>

  .radio-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }

  .task-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  .task-ui {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
  }

  .task-list {
    width: 100%;
    height: 400px;
    overflow: auto;
    margin-bottom: 20px;
  }

  .task {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #d2d2d2;
    color: black;
    background: #ffffff;
    height: 60px;
    width: 100%;
    margin-bottom: 10px;
  }

  .create-new-task {
    color: black;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .create-new-task > div {
    cursor: pointer;
  }

  .create-new-task > div:hover {
    color: purple;
  }

  .add-task {
    margin-left: 10px;
  }

  .text-area-create {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 20px;
  }

  .text-area > input {
    height: 50px;
    margin-bottom: 10px;
  }

  .create-button-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  #create-button {
    margin-right: 10px;
    background: purple;
    color: white;
  }

  #create-button:hover {
    background: rgb(155, 0, 155)
  }

</style>