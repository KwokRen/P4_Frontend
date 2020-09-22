<template>
  <div class="task-container">
    <div class="task-ui">
      <div class="task-list">
        <h1 v-if="noTasks" class="noTasks">Click Add Task to get started!</h1>
        <div class="task" v-for="task of tasks" v-bind:key="task.id" v-bind:id="task.id">
          <div class="left-side-task">
            <div class="radio-button" v-bind:id="task.id">
              <div class="field" v-bind:id="task.id" v-bind:checked="task.completed">
                <input type="checkbox" v-bind:id="task.id" v-bind:checked="task.completed" v-bind:name="task.name" @click="checkComplete" v-bind:class="{taskName: editTaskName == task.id}">
              </div>
            </div>
            <div class="task-name" v-bind:id="task.id" v-bind:class="{taskName: editTaskName == task.id}" @click="getOneTask"> 
              <p v-bind:id="task.id">{{task.name}}</p>
            </div>
            <div class="edit-name" v-if="editTaskName == task.id">
              <b-input v-model="updateName" v-bind:id="task.id"></b-input>
              <b-button @click="updateTaskName" v-bind:id="task.id"><span v-bind:id="task.id"><i class="fas fa-arrow-alt-circle-right" v-bind:id="task.id"></i></span></b-button>
            </div>
          </div>
          <div class="right-side-task">
            <i class="fas fa-pencil-alt" v-bind:id="task.id" @click="editTaskName = editTaskName == task.id? 0: task.id; createNewTask = false; createNewItem = false; editItemName = 0"></i>
            <i class="fas fa-trash-alt" v-bind:id="task.id" @click="isDeleteModalActive = true; taskDelete = task.id; editItemName = 0; editTaskName = 0; createNewItem = false; createNewTask = false" v-bind:class="{taskName: editTaskName == task.id}"></i>
          </div>
        </div>
        <b-modal v-model="isDeleteModalActive" :width="640" scroll="keep" id="delete-modal">
            <div class="card" id="delete-card">
                <div class="card-content">
                    <div class="content">
                        Are you sure?
                    </div>
                    <b-button @click="deleteTask" v-bind:id="taskDelete">Yes</b-button>
                    <b-button @click="isDeleteModalActive = false">Cancel</b-button>
                </div>
            </div>
        </b-modal>
      </div>
      <div class="create-new-task">
        <div v-if="!createNewTask" @click="createNewTask = !createNewTask; editTaskName = 0; editItemName = 0; createNewItem = false"><i class="fas fa-plus"></i><span class="add-task">Add Task</span></div>
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
              <h2>Due: {{this.date}}</h2>
            </div>
          </div>
          <b-tabs v-model="activeTab" expanded>
            <b-tab-item label="Items">
              <div class="items-container">
                <div class="items-list" v-for="item in items" v-bind:key="item.id" v-bind:id="item.id">
                  <div class="left-side-task">
                    <div class="radio-button" v-bind:id="item.id">
                        <div class="field" v-bind:id="item.id" v-bind:checked="item.completed">
                          <input type="checkbox" v-bind:id="item.id" v-bind:checked="item.completed" v-bind:name="item.name" @click="itemComplete" v-bind:class="{taskName: editItemName == item.id}">
                        </div>
                    </div>
                    <div class="task-name" v-bind:id="item.id" v-bind:class="{taskName: editItemName == item.id}"> 
                      <p v-bind:id="item.id">{{item.name}}</p>
                    </div>
                    <div class="edit-item" v-if="editItemName == item.id">
                        <b-input v-model="updateItem" v-bind:id="item.id"></b-input>
                        <b-button v-bind:id="item.id"><span v-bind:id="item.id" @click="updateItemName"><i class="fas fa-arrow-alt-circle-right" v-bind:id="item.id"></i></span></b-button>
                      </div>
                  </div>
                  <div class="right-side-task">
                    <i class="fas fa-pencil-alt" v-bind:id="item.id" @click="editItemName = editItemName == item.id ? 0: item.id; editTaskName = 0; createNewTask = false; createNewItem = false"></i>
                    <i class="fas fa-trash-alt" v-bind:id="item.id" @click="isDeleteItemModalActive = true; itemDelete = item.id; editTaskName = 0; createNewItem = false; createNewTask = false; editItemName = 0" v-bind:class="{taskName: editItemName == item.id}"></i>
                  </div>
                </div>
                <b-modal v-model="isDeleteItemModalActive" :width="640" scroll="keep" id="delete-item-modal">
                    <div class="card" id="delete-item">
                        <div class="card-content">
                            <div class="content">
                                Are you sure?
                            </div>
                            <b-button @click="deleteItem" v-bind:id="itemDelete">Yes</b-button>
                            <b-button @click="isDeleteItemModalActive = false">Cancel</b-button>
                        </div>
                    </div>
                </b-modal>
              </div>
              <div class="create-new-item">
                <div v-if="!createNewItem" @click="createNewItem = !createNewItem; createNewTask = false; editItemName = 0; editTaskName = 0"><i class="fas fa-plus"></i><span class="add-task">Add Item</span></div>
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
              <div class="due-date">
                <input type="date" id="dueDate" name="dueDate" v-model="dueDate" placeholder="yyyy-mm-dd">
                <b-button @click="updateTaskDate">Submit</b-button>
              </div>
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
      date: null,
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
      updateItem: "",
      completedTaskId: 0,
      taskCompleted: false,
      completedItemId: 0,
      itemCompleted: false,
      noTasks: false,
      isDeleteModalActive: false,
      taskDelete: 0,
      isDeleteItemModalActive: false,
      itemDelete: 0
    }
  },
  created: function(){
    this.getTasks()
  },
  methods: {
    checkComplete: function(event){
      this.completedTaskId = event.target.id
      this.taskCompleted =event.target.parentElement.getAttribute('checked')
      if (this.taskCompleted) {
        this.taskCompleted = false
      } else {
        this.taskCompleted = true
      }


      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.completedTaskId}/`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: `JWT ${token}`
        },
        body: JSON.stringify({
          name: event.target.getAttribute('name'),
          completed: this.taskCompleted
        })
      })
      .then(response => response.json())
      .then(() => {
        this.getTasks()
      })
    },
    itemComplete: function(event){
      this.completedItemId = event.target.id
      this.itemCompleted = event.target.parentElement.getAttribute('checked')
      if (this.itemCompleted) {
        this.itemCompleted = false
      } else {
        this.itemCompleted = true
      }
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskId}/items/${this.completedItemId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: `JWT ${token}`
        },
        body: JSON.stringify({
          name: event.target.getAttribute('name'),
          completed: this.itemCompleted,
          task: this.taskId
        })
      })
      .then(response => response.json())
      .then(() => {
        this.getTaskItems(this.taskId)
      })
    },
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
      .then(() => {
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
      .then(() => {
        this.newItem = "",
        this.createNewItem = false
        this.getTaskItems(this.taskId)
      })
    },
    getTasks: function(){
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/`, {
      method: "get",
      headers: {
        authorization: `JWT ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.count == 0) {
        this.noTasks = true
        this.tasks = []
      } else {
        this.tasks = data.results
        this.noTasks = false
      }
    })
    },
    getOneTask: function(event){
      this.isCardModalActive = true
      // if(this.taskId == 0){
        if(event){
          this.taskId = event.target.id
        }
      // } 
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskId}/`, {
      method: "get",
      headers: {
        authorization: `JWT ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      this.name = data.name
      this.description = data.description
      this.date = data.date
      this.getTaskItems(this.taskId)
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
    })
    },
    updateTaskDescription: function(){
      const {token, URL} = this.$route.query
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
    deleteTask: function(){
      // this.taskId2 = event.target.id
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskDelete}/`, {
        method: "delete",
        headers: {
          authorization: `JWT ${token}`
        }
      })
      .then(response => response.json())
      .then(() => {
        this.getTasks()
        this.isDeleteModalActive = false
      })
    },
    deleteItem: function(){
      // this.itemId2 = event.target.id
      const {token, URL} = this.$route.query
      fetch(`${URL}/todo/tasks/${this.taskId}/items/${this.itemDelete}`, {
        method: "delete",
        headers: {
          authorization: `JWT ${token}`
        }
      })
      .then(response => response.json())
      .then(() => {
        this.getTaskItems(this.taskId)
        this.isDeleteItemModalActive = false
      })
    }
  }
}

</script>

<style>

  .noTasks {
    font-size: 30px;
    margin-top: 100px;
  }

  .navbar-burger:hover {
    background-color: #d9d9d9;
    border-radius: 30px;
}

  a.navbar-item:focus-within {
    background-color: transparent !important;
  }

  .radio-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  .radio-button > .field > input {
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

  .task-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90vh;
  }

  .task-ui {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85%;
  }

  .task-list {
    width: 100%;
    height: 400px;
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
    height: 70px;
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
    text-align: start;
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

  .left-side-task, .right-side-task {
    margin: 10px;
  }

  .right-side-task {
    display: flex;
  }

  .right-side-task {
    font-size: 25px;
  }

  .right-side-task > i:nth-child(1) {
    margin-right: 15px;
  }

  .right-side-task > .fa-pencil-alt:hover {
    color: purple;
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

  .text-area-create-item {
    margin-top: 10px;
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

  #delete-modal > .animation-content, #delete-item-modal > .animation-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #delete-card, #delete-item {
    border-radius: 20px;
    width: 300px;
  }

  #delete-card > .card-content > button, #delete-item > .card-content > button {
    margin: 10px;
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
    height: 250px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .create-description {
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
    height: 350px;
  }

  .items-container {
    display: flex;
    flex-direction: column;
    height: 250px;
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
    margin-right: 0px;
    width: 100%;
  }

  .edit-item > button {
    border: none;
  }

  .edit-item > button:hover {
    background: #d2d2d2;
  }

  .tab-content > .tab-item:nth-child(3) {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .tab-content > .tab-item:nth-child(3) > div {
    display: flex;
    flex-direction: column;
  }

  .taskName{
    display: none;
  }

  .edit-name > .control > input {
    margin-left: -20px;
  }

  .button:focus, .button.is-focused {
    border-color: none !important;
  }

  .button:focus:not(:active), .button.is-focused:not(:active) {
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
  }

  .edit-name {
    width: 100%;
  }

  .edit-name > button:hover {
    background: #d9d9d9;
  }

  .edit-name > button {
    border: none;
    margin-right: 5px;
  }

  .due-date {
    margin-top: 100px;
  }

  .due-date > input {
    margin-bottom: 10px;
  }

  @media only screen and (min-width: 800px) {

    .edit-name {
      width: 60%;
    }

    .task-ui {
      width: 60%;
    }

    .right-side-task > i:nth-child(1) {
      margin-right: 30px;
    }

    .edit-item {
      width: 60%;
    }

  }

</style>