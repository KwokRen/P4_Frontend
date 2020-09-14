<template>
    <div class=login>
        <div class="login-container">
            <input class="input is-primary" type="text" placeholder="Email" v-model="email">
            <input class="input is-primary" type="text" placeholder="Username" v-model="username">
            <input class="input is-primary" type="password" placeholder="Password" v-model="password">
            <button class="button is-light">Log In</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: function (){
        return {
            username: '',
            password: '',
            email: '',
        }
    },
    methods: {
        handleLogin: function(){
            fetch(`${URL}/auth/users/login`)
        }
    }
}
</script>

<style>

    .login {
        display: flex;
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