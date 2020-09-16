<template>
  <div class="task-container">
    <div class="task-ui">
      <div class="task-list">
        <div class="task" v-for="task of tasks" v-bind:key="task.id" v-bind:id="task.id" @click="getOneTask">
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
    <b-modal v-model="isCardModalActive" can-cancel :width="640">
      <div class="card" id="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p>Hello</p>
            </div>
          </div>
          <b-tabs v-model="activeTab" expanded>
            <b-tab-item label="Items">
              <div v-for="item in items" v-bind:key="item.id">
                {{item.name}}
              </div>
            </b-tab-item>
            <b-tab-item label="Description">
              <div class="description">
                {{this.description}}
              </div>
                <b-field>
                    <b-input type="textarea"
                        placeholder="Add or edit a description for your task">
                    </b-input>
                </b-field>
                <b-button class="create-description">Submit</b-button>
            </b-tab-item>
            <b-tab-item label="Due Date">
              <b-datepicker v-model="date" 
                  inline 
                  :unselectable-days-of-week="[0, 6]">
              </b-datepicker>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'Task',
  data: function (){
    return {
      tasks: [],
      createNewTask: false,
      newTask: "",
      isCardModalActive: false,
      openModal: 0,
      activeTab: 1,
      items: [],
      description: null,
      date: new Date(),
      month: null,
      day: null,
      year: null,
      dueDate: null,
      name: null
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
    },
    getOneTask: function(event){
      this.isCardModalActive = true
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${event.target.id}`, {
      method: "get",
      headers: {
        authorization: `JWT ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      this.name = data.name
      this.description = data.description
      this.getTaskItems(event.target.id)
    })
    },
    getTaskItems: function(event){
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${event}/items`, {
      method: "get",
      headers: {
        authorization: `JWT ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      this.items = data.results
      console.log(data.results)
    })
    },
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

  #card {
    height: 600px;
    border-radius: 20px;
    color: black;
    background: white;
  }

  .media-content > p {
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .tabs > ul > li {
    font-family: 'Roboto', sans-serif;
    width: 40px;
  }

  .textarea {
    resize: none !important
  }

  .card-content {
    height: 100%;
  }

  .control {
    width: 100%;
  }

  .description {
    height: 300px;
  }

  .create-description {
    position: absolute;
    float: right;
    bottom: 53px;
    right: 1px;
    border: none !important;
  }

  .create-description:hover {
    background: #d9d9d9;
    border-radius: none !important;
  }

  .datepicker-header > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .pagination-list > div > div > div {
    display: flex;
    flex-direction: row;
  }

</style>