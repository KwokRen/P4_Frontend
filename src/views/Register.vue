<template>
    <div class=login>
         <b-field>
            <b-input placeholder="Email" v-model="email"></b-input>
        </b-field>
        <b-field>
            <b-input placeholder="Username" v-model="username"></b-input>
        </b-field>
        <b-field>
            <b-input type="password" placeholder="Password" v-model="password" password-reveal></b-input>
        </b-field>
        <button class="button is-light" @click="handleRegister">Register</button>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data: function (){
        return {
            username: '',
            password: '',
            email: ''
        }
    },
    methods: {
        handleRegister: function(){
            if (this.username && this.password && this.email){
                fetch(`${this.$route.query.URL}/auth/users/register/`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                        email: this.email
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (Array.isArray(data.email) || Array.isArray(data.username) || Array.isArray(data.password)){
                        alert("Creation unsuccessful. Please try again.")
                    } else {
                        this.$emit('register', data)
                    }
                });
            } else {
                alert("All fields must be valid.")
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