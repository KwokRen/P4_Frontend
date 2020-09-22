<template>
    <div class=login>
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
            password: '',
            user: '',
            token: '',
            email: '',
            loggedIn: false,
            successful: false
        }
    },
    methods: {
        handleLogin: function(){
            if (this.username && this.password){
                fetch(`${this.$route.query.URL}/auth/users/login/`, {
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
                    if (data.non_field_errors){
                        this.invalid_credentials()
                        this.successful = false
                    } else {
                        this.user = data.username
                        this.email = data.email
                        this.token = data.token
                        this.successful = true
                        this.loggedIn = true
                        this.$emit('loggedIn', data)
                    }
                })
                .then(() => {
                    if (this.successful == true) {
                        localStorage.setItem("username", this.user)
                        localStorage.setItem("email", this.email)
                        localStorage.setItem("token", this.token)
                        localStorage.setItem("loggedIn", this.loggedIn)
                    }
                })
            } else {
                this.empty_fields()
            }
        },
        invalid_credentials() {
            this.$buefy.toast.open(
                {
                    duration: 4000,
                    message: `The credentials you have provided are invalid. Please try again.`,
                    type: 'is-danger'
                }
            )
        },
        empty_fields() {
            this.$buefy.toast.open(
                {
                    duration: 4000,
                    message: `Fields may not be left blank.`,
                    type: 'is-danger'
                }
            )
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
        margin-top: 100px;
        margin-left: 25px;
        margin-right: 25px;
        margin-bottom: 25px;
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