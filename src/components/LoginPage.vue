<template>
    <div id="login-panel">
        <p>
            <label>
                Username:
                <input type="text" v-model="userName">
            </label>
        </p>
        <p>
            <label>
                Password:
                <input type="password" v-model="password">
            </label>
        </p>
        <button @click="login">Login</button>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                userName: null,
                password: null,
                authenticated: false
            }
        },
        methods: {
            login: function () {
                if('V3gaAdmin' === this.userName && 'V3ga123456' === this.password) {
                    localStorage.authInfo = JSON.stringify({
                        expires: Date.now() + 1000 * 60 * 60 * 60 * 24
                    });

                    this.$emit('authenticated');
                } else {
                    console.log('incorrect login or password');
                }
            },
        }
    }
</script>

<style>
    #login-panel {
        margin-top: 40%;
    }

    #login-panel label {

    }

    #login-panel input {
        width: 150px;
        height: 20px;
        border-radius: 3px;
        border: 1px solid #bbbaba;
    }

    #login-panel button {
        width: 234px;
        height: 26px;
        border-radius: 3px;
        border: 1px solid #bbbaba;
    }
</style>