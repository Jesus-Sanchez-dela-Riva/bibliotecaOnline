<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  const router = useRouter()
  const authStore = useAuthStore()

  const username = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)

  const handleLogin = async () => {
    error.value = ''
    loading.value = true

    try {
      await authStore.login({
        username: username.value,
        password: password.value
      })

      const role = authStore.user?.role
      if (role === 'admin') {
        router.push('/home')
      } else {
        router.push('/inicio')
      }
    } catch (e: any) {
      error.value = e.message || 'Error al conectar con el servidor'
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <section class="login-session">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-4">

          <div class="card shadow-lg p-4 mt-5">
            <h3 class="text-center mb-2">Login</h3>
            <p class="text-center text-muted mb-4">Por favor inicia sesión</p>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <input type="text" class="form-control form-control-lg" placeholder="Usuario" v-model="username">
              </div>

              <div class="mb-3">
                <input type="password" class="form-control form-control-lg" placeholder="Contraseña" v-model="password">
              </div>

              <button type="submit" class="btn btn-info btn-lg w-100">
                Enviar <i class="fa fa-sign-in"></i>
              </button>
            </form>
          </div>
          <p v-if="error" class="text-danger mt-3 text-center">
            {{ error }}
          </p>


        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>