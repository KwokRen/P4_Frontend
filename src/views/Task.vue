<template>
  <div class="task-container">
    <div class="task-ui">
      <div class="task-list">
        <div class="task" v-for="task of tasks" v-bind:key="task.id" v-bind:id="task.id">
          <div class="left-side-task">
            <div class="radio-button" v-bind:id="task.id">
                <b-checkbox v-bind:id="task.id" :value="false"
                type="is-success">
                </b-checkbox>
            </div>
            <div class="task-name" v-bind:id="task.id" @click="getOneTask"> 
              <p v-bind:id="task.id">{{task.name}}</p>
            </div>
            <div class="edit-name" v-if="editTaskName == task.id">
              <b-input v-model="updateName" v-bind:id="task.id"></b-input>
              <b-button @click="updateTaskName" v-bind:id="task.id"><span v-bind:id="task.id">Submit</span></b-button>
            </div>
          </div>
          <div class="right-side-task">
            <i class="fas fa-pencil-alt" v-bind:id="task.id" @click="editTaskName = editTaskName == task.id? 0: task.id"></i>
            <i class="fas fa-trash-alt" v-bind:id="task.id" @click="deleteTask"></i>
          </div>
        </div>
      </div>
      <div class="create-new-task">
        <div v-if="!createNewTask" @click="createNewTask = !createNewTask"><i class="fas fa-plus"></i><span class="add-task">Add Task</span></div>
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
              <p>{{this.name}}</p>
              <h2>Due: {{this.dueDate}}</h2>
            </div>
          </div>
          <b-tabs v-model="activeTab" expanded>
            <b-tab-item label="Items">
              <div class="items-container">
                <div class="items-list" v-for="item in items" v-bind:key="item.id" v-bind:id="item.id">
                  <div class="left-side-task">
                    <div class="radio-button" v-bind:id="item.id">
                        <b-checkbox v-bind:id="item.id" :value="false"
                        type="is-success">
                        </b-checkbox>
                    </div>
                    <div class="task-name" v-bind:id="item.id"> 
                      <p v-bind:id="item.id">{{item.name}}</p>
                    </div>
                    <div class="edit-item" v-if="editItemName == item.id">
                        <b-input v-model="updateItem" v-bind:id="item.id"></b-input>
                        <b-button v-bind:id="item.id"><span v-bind:id="item.id" @click="updateItemName">Submit</span></b-button>
                      </div>
                  </div>
                  <div class="right-side-task">
                    <i class="fas fa-pencil-alt" v-bind:id="item.id" @click="editItemName = editItemName == item.id ? 0: item.id"></i>
                    <i class="fas fa-trash-alt" v-bind:id="item.id" @click="deleteItem"></i>
                  </div>
                </div>
              </div>
              <div class="create-new-item">
                <div v-if="!createNewItem" @click="createNewItem = !createNewItem"><i class="fas fa-plus"></i><span class="add-task">Add Item</span></div>
              </div>
              <div class="text-area-create-item" v-if="createNewItem">
                <b-input class="text-area" placeholder="e.g. Read up documentation for Buefy" v-model="newItem"></b-input>
                <div class="create-button-container">
                  <button class="button is-light" id="create-button" @click="createItem">Create</button>
                  <button class="button is-light" @click="createNewItem = !createNewItem">Cancel</button>
                </div>
              </div> 
            </b-tab-item>
            <b-tab-item label="Description">
              <div class="description">
                {{this.description}}
              </div>
                <b-field>
                    <b-input type="textarea"
                        v-model="editDescription"
                        placeholder="Edit a description for your task">
                    </b-input>
                </b-field>
                <b-button class="create-description" @click="updateTaskDescription">Submit</b-button>
            </b-tab-item>
            <b-tab-item label="Due Date">
              <input type="date" id="dueDate" name="dueDate" v-model="dueDate">
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
      editDescription: "",
      dueDate: "",
      name: null,
      newName: '',
      taskId: 0,
      taskId2: 0,
      editTaskName: 0,
      taskName: 0,
      updateName: "",
      createNewItem: false,
      newItem: "",
      itemId2: 0,
      editItemName: 0,
      updateItem: ""
    }
  },
  created: function(){
    this.getTasks()
  },
  methods: {
    // editingTaskName: function(){
    //   // editTaskName = editTaskName == 0? task.id: 0; taskGone=task.id
    //   if(editTaskName == 0){

    //   }
    // }
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
    createItem: function(){
      const {token, URL} = this.$route.query
      const new_task = {name: this.newItem, task: this.taskId}
      fetch(`${URL}/todo/tasks/${this.taskId}/items`, {
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
        this.newItem = "",
        this.createNewItem = false
        this.getTaskItems(this.taskId)
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
      // this.editTaskName = this.tasks.id
    })
    },
    getOneTask: function(event){
      console.log(`event target id: ${event.target.id}`)
      this.isCardModalActive = true
      this.taskId = event.target.id
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskId}`, {
      method: "get",
      headers: {
        authorization: `JWT ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      this.name = data.name
      this.description = data.description
      console.log(this.description)
      console.log(this.taskId)
      this.getTaskItems(this.taskId)
    })
    },
    getTaskItems: function(event){
      console.log(event)
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
    updateTaskDescription: function(){
      const {token, URL} = this.$route.query
      console.log(this.taskId)
      fetch(`${URL}/todo/tasks/${this.taskId}/`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        name: this.name,
        description: this.editDescription
      })
    })
    .then(response => response.json())
    .then(() => {
      this.getOneTask()
      this.editDescription = ""
    })
    },
    updateTaskDate: function(){
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskId}/`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        name: this.name,
        date: this.dueDate
      })
    })
    .then(response => response.json())
    .then(() => {
      this.getOneTask()
    })
    },
    updateTaskName: function(event){
      this.taskId2 = event.target.id
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskId2}/`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        name: this.updateName
      })
    })
    .then(response => response.json())
    .then(() => {
      this.getTasks()
      this.updateName = ""
      this.editTaskName = 0
    })
    },
    updateItemName: function(event){
      this.itemId2 = event.target.id
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskId}/items/${this.itemId2}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        name: this.updateItem,
        task: this.taskId
      })
    })
    .then(response => response.json())
    .then(() => {
      this.getTaskItems(this.taskId)
      this.editItemName = 0
      this.updateItem = ""
    })
    },
    deleteTask: function(event){
      this.taskId2 = event.target.id
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskId2}/`, {
        method: "delete",
        headers: {
          authorization: `JWT ${token}`
        }
      })
      .then(response => response.json())
      .then(() => this.getTasks())
    },
    deleteItem: function(event){
      this.itemId2 = event.target.id
      console.log(this.itemId2)
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskId}/items/${this.itemId2}`, {
        method: "delete",
        headers: {
          authorization: `JWT ${token}`
        }
      })
      .then(response => response.json())
      .then(() => this.getTaskItems(this.taskId))
    }
  }
}

</script>

<style>

  .radio-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .task-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
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
    height: 350px;
    overflow: auto;
    margin-bottom: 20px;
  }

  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d2d2d2;
    color: black;
    background: #ffffff;
    height: 60px;
    width: 100%;
    margin-bottom: 10px;
  }

  .task-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 80%;
    cursor: pointer;
  }
  
  .task-name > p {
    display: flex;
    justify-content: flex-start;
  }

  .items-list > .left-side-task > .task-name > p {
    display: flex;
    align-items: center;
    width: 80%;
  }

  .left-side-task {
    display: flex;
    height: 100%;
    align-items: center;
    width: 90%;
  }

  .right-side-task {
    display: flex;
  }

  .right-side-task > i {
    font-size: 20px;
    margin-right: 10px;
  }

  .right-side-task > .fa-pencil-alt:hover {
    color: green;
    cursor: pointer;
  }

  .right-side-task > .fa-trash-alt:hover {
    color: red;
    cursor: pointer;
  }

  .edit-name {
    display: flex;
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

  .tab-item > .description {
    height: 300px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
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

  .tab-item > .field > .field-body > .field {
    flex-direction: row-reverse !important;
  }

  .tab-item {
    height: 400px;
  }

  .items-container {
    display: flex;
    flex-direction: column;
    height: 220px;
    overflow: auto;
  }

  .items-container > div {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #d2d2d2
  }

  .items-container > .items-list > div {
    height: 50px;
  }

  .items-container > .items-list > .right-side-task {
    margin-right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tab-content > .tab-item:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .create-new-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .items-list > .left-side-task > .task-name {
    cursor: initial;
  }

  .create-new-item > div:hover {
    cursor: pointer;
    color: purple;
  }

  .edit-item {
    display: flex;
    margin-right: 10px;
  }

</style>