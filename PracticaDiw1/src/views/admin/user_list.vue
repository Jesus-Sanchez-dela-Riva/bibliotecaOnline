<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { getUsers } from '@/services/admin.service'
  const users = ref<any[]>([])
  onMounted(async () => {
    try {
      users.value = await getUsers()
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center g-4">

      <div class="col-12 col-md-6 col-lg-4" v-for="user in users" :key="user.id">
        <div class="card h-100 shadow-sm">

          <div class="card-header bg-dark text-white text-center">
            <strong>{{ user.nombre }}</strong>
          </div>

          <div class="card-body">
            <p class="mb-2">
              <strong>ID:</strong> {{ user.id }}
            </p>

            <p class="mb-3">
              <strong>Rol:</strong>
              <span
                  class="badge"
                  :class="user.rol === 'ADMIN' ? 'bg-info' : 'bg-success'"
              >
                {{ user.rol }}
              </span>
            </p>

            <div>
              <strong>Libros:</strong>

              <ul v-if="user.libros.length" class="mt-2">
                <li
                    v-for="libro in user.libros"
                    :key="libro.id"
                >
                  {{ libro.titulo }}
                  <span class="badge text-muted" :class="{
                          'bg-success': libro.estadoLibro === 'DISPONIBLE',
                          'bg-warning text-dark': libro.estadoLibro === 'RESERVADO',
                          'bg-info': libro.estadoLibro === 'PRESTADO'
                        }"
                  >
                    {{ libro.estadoLibro }}
                  </span>
                </li>
              </ul>

              <p v-else class="text-muted mt-2">
                No tiene libros
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>

</style>