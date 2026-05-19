import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import UserList from '@/views/admin/user_list.vue'
import Books_list from "@/views/admin/books_list.vue";
import User_new from "@/views/admin/user_new.vue";
import Login from "@/views/login.vue";
import Home from "@/views/admin/home.vue";
import Inicio from "@/views/user/inicio.vue";
import BooksNew from '@/views/admin/books_new.vue'
import BooksAvailable from '@/views/user/books_available.vue'
import BooksIdUser from '@/views/user/books_byIdUser.vue'
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/inicio',
        name: 'inicio',
        component: Inicio
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: { public: true },
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: UserList,
        meta: {requiresAuth: true, roles: 'admin'}
    },
    {
        path: '/libros',
        name: 'libros',
        component: Books_list,
        meta: {requiresAuth: true, roles: 'admin'}
    },
    {
        path: '/usuarios/nuevo',
        name: 'usuarios-new',
        component: User_new,
        meta: {requiresAuth: true, roles: 'admin'}
    },
    {
        path: '/libros/nuevo',
        name: 'libros-nuevo',
        component: BooksNew,
        meta: {requiresAuth: true, roles: 'admin'}
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/librosDisponibles',
        name: 'librosDisponibles',
        component: BooksAvailable,
        meta: {requiresAuth: true, roles: 'user'}
    },
    {
        path: '/librosbyIdUser',
        name: 'librosByIdUser',
        component: BooksIdUser,
        meta: {requiresAuth: true, roles: 'user'}
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if(to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login')
    }

    if(to.meta.roles){
        if(authStore.user?.role !== to.meta.roles){
            if(authStore.user?.role === 'user'){
                return next('/inicio')
            }

            if(authStore.user?.role === 'admin'){
                return next('/home')
            }
        }
    }

    next()
})

export default router
