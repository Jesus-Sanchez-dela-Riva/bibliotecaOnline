<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  const authStore = useAuthStore()
  const isAdmin = computed(() => authStore.user?.role === 'admin')
  const isUser = computed(() => authStore.user?.role === 'user')
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const router = useRouter()

  const logout = () => {
    authStore.logout()
    router.push('/login')
  }

</script>

<template>
  <div v-if="isAuthenticated" class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg" style="background-color: #5f8fa3;">
      <div class="container-fluid">

          <router-link class="navbar-brand" to="/inicio">
            <img src="./assets/images/logo_insti.png" alt="" style="height: 60px; width: 200px;">
          </router-link>


          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarExample" aria-controls="navbarExample" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarExample">

            <ul v-if="isAuthenticated" class="navbar-nav me-auto mb-2 mb-lg-0">

              <li v-if="isAdmin" class="nav-item">
                <router-link class="nav-link fs-5" to="/home">Home</router-link>
              </li>

              <li v-if="isAdmin" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle fs-5" href="#" id="adminDropdown" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                  Admin
                </a>
                <ul class="dropdown-menu" aria-labelledby="adminDropdown">
                  <li><router-link class="dropdown-item" to="/usuarios">Listar usuarios</router-link></li>
                  <li><router-link class="dropdown-item" to="/usuarios/nuevo">Crear usuario</router-link></li>
                  <li><router-link class="dropdown-item" to="/libros">Listar libros</router-link></li>
                  <li><router-link class="dropdown-item" to="/libros/nuevo">Crear libro</router-link></li>
                </ul>
              </li>

              <li v-if="isUser" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle fs-5" href="#" id="userDropdown" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                  Usuario
                </a>
                <ul class="dropdown-menu" aria-labelledby="userDropdown">
                  <li><router-link class="dropdown-item" to="/librosbyIdUser">Listar préstamos de usuario</router-link></li>
                  <li><router-link class="dropdown-item" to="/librosDisponibles">Listar libros disponibles</router-link></li>
                </ul>
              </li>
            </ul>

            <div class="d-flex">
              <router-link v-if="!isAuthenticated" class="btn btn-success rounded-pill me-2 fs-5" to="/login">
                Login
              </router-link>
              <button @click="logout" class="btn btn-secondary rounded-pill fs-5">
                Salir
              </button>
            </div>
          </div>
        </div>
    </nav>

    <main class="flex-fill">
      <router-view />
    </main>
    <br>

    <footer class="text-white text-center py-3" style="background-color: #2f2f2f;">
      <div class="container">
        <p class="mb-1">
          © 2026 · Biblioteca IES — Jesús Sánchez de la Riva
        </p>
        <small class="text-secondary">
          Desarrollado en {{ new Date().getFullYear() }}
        </small>
      </div>
    </footer>
  </div>

  <div v-else>
    <router-view />
  </div>

</template>

<style scoped>
</style>
