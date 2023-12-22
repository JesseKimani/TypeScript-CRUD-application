import { createRouter, createWebHistory } from 'vue-router';
import Login from '../src/components/Login.vue';
import App from '../src/components/App';

const routes = [
    { path: '/', component: Login },
    { path: '/app', component: App },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;
