<template>
    <div class=login>
        <!-- <div class="login-container">
            <input class="input is-primary" type="text" placeholder="Username" v-model="username">
            <input class="input is-primary" type="password" placeholder="Password" v-model="password">
            <button class="button is-light" @click="handleLogin">Log In</button>
        </div> -->
        <b-field>
            <b-input placeholder="Username" v-model="username"></b-input>
        </b-field>
        <b-field>
            <b-input type="password" placeholder="Password" v-model="password" password-reveal></b-input>
        </b-field>
        <button class="button is-light" @click="handleLogin">Log In</button>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: function (){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleLogin: function(){
            if (this.username && this.password){
                fetch(`http://localhost:8000/auth/users/login/`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.non_field_errors[0] === 'A username with that username or password is not found'){
                        alert("Invalid credentials.")
                    } else {
                        console.log(data.non_field_errors[0])
                        this.$emit('loggedIn', data)
                    }
                });
            } else {
                alert("Invalid credentials.")
            }
        }
    }
}
</script>

<style>

    .login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 25px;
    }

    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .login-container > input {
        margin: 20px;
        padding: 10px;
        border: 1px solid #d9d9d9;
    }

    .login-container > button {
        margin: 30px;
    }

    .field {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        width: 100%;
    }

</style>