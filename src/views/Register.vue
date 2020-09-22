<template>
    <div class=register>
         <b-field>
            <b-input placeholder="Email" v-model="email"></b-input>
        </b-field>
        <b-field>
            <b-input placeholder="Username" v-model="username"></b-input>
        </b-field>
        <b-field message="Password must have at least eight characters.">
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
            email: '',
            user: '',
            token: '',
            emailAddress: '',
            successfulRegister: false,
            loggedIn: false
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
                    if (Array.isArray(data.username)) {
                        this.username_error()
                        this.successfulRegister = false
                    } else if (Array.isArray(data.password)) {
                        this.password_error()
                        this.successfulRegister = false
                    } else if (data.email[0] == "Enter a valid email address.") {
                        this.invalid_email()
                        this.successfulRegister = false
                    } else if (data.email[0] == "user with this email already exists.") {
                        this.email_exists()
                        this.successfulRegister = false
                    } else {
                        this.$emit('register', data)
                        console.log(data)
                        this.successfulRegister = true
                        this.user = data.username
                        this.token = data.token
                        this.email = data.email
                        this.loggedIn = true
                    }
                })
                .then(() => {
                    if (this.successfulRegister == true) {
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
        empty_fields() {
            this.$buefy.toast.open(
                {
                    duration: 4000,
                    message: `Fields may not be left blank.`,
                    type: 'is-danger'
                }
            )
        },
        username_error() {
            this.$buefy.toast.open(
                {
                    duration: 4000,
                    message: `This username has already been taken. Please try another one.`,
                    type: 'is-danger'
                }
            )
        },
        password_error() {
            this.$buefy.toast.open(
                {
                    duration: 4000,
                    message: `Your password must contain at least eight characters.`,
                    type: 'is-danger'
                }
            )
        },
        invalid_email() {
            this.$buefy.toast.open(
                {
                    duration: 4000,
                    message: `This email is invalid. Please try again.`,
                    type: 'is-danger'
                }
            )
        },
        email_exists() {
            this.$buefy.toast.open(
                {
                    duration: 4000,
                    message: `A user with this email already exists.`,
                    type: 'is-danger'
                }
            )
        }
    }
}
</script>

<style>

    .register {
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