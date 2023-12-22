/* eslint-disable vue/multi-word-component-names */

<template>
    <div id="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <label for="username">Username: </label>
            <input type="text" id="username" v-model="credentials.username" />

            <label for="password">Password: </label>
            <input type="password" id="password" v-model="credentials.password" />

            <button type="submit">Generate Token</button>
        </form>
    </div>

</template>



<script>

import axios from 'axios';

export default{
    name: 'LoginComponent',

    data() {
        return {
            credentials: {
                username: '',
                password: '',
            },
        };
    },

    methods: {
        login() {
            axios.post('http://localhost:3000/auth/login', this.credentials)
            .then(response => {
                const { token, refreshToken } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);

                this.$router.push('/app');
            })
            .catch(error => {
                console.error('Login failed: ', error);
            });
        },

    },

};


</script>
