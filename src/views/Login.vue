<template>
    <div class=login>
        <div class="login-container">
            <b-field label="Email">
                <b-input value=""></b-input>
            </b-field>
            <b-field label="Username"
                type="is-success"
                message="This username is available">
                <b-input value="" maxlength="30"></b-input>
            </b-field>

            <b-field label="Password"
                type="is-warning"
                :message="['Password is too short', 'Password must have at least 8 characters']">
                <b-input value="" type="password" maxlength="30"></b-input>
            </b-field>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login'
}
</script>

<style>

    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 100px;
        height: 500px;
        width: 300px;
        border: 1px solid black;
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