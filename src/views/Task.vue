<template>
  <div class="task-container">
    <div class="task-list">
      <div class="task" v-for="task of tasks" v-bind:key="task.id">
        <div class="radio-button" v-bind:id="task.id">
            <b-checkbox :value="false"
            type="is-success">
            </b-checkbox>
        </div>
        {{task.name}}
      </div>
    </div>
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

  .radio-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .task-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100vh;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
  }

  .task {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px;
    cursor: pointer;
    border-bottom: 1px solid #d2d2d2;
    color: black;
    background: #ffffff;
    height: 60px;
    width: 100%;
    padding: 10px;
  }

</style>