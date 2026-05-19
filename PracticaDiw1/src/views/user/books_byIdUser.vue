<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBooksByUser, devolverPrestamo } from '@/services/user.service'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const usuarioId = ref<number | null>(null)
const books = ref<any[]>([])
const error = ref<string | null>(null)

onMounted(() => {
  if (authStore.user?.role === 'user') {
    usuarioId.value = Math.floor(Math.random() * 2) + 2
    console.log("Usuario asignado:", usuarioId.value)
  }
})

const buscarLibrosUsuario = async () => {

  if (usuarioId.value === null) {
    error.value = 'Id inválido'
    return
  }

  books.value = []

  try {
    error.value = null
    const resultado = await getBooksByUser(usuarioId.value)
    books.value = Array.isArray(resultado) ? resultado : []
  } catch (err) {
    error.value = 'No tienes libros asignados'
    books.value = []
  }
}

const devolver = async (libroId: number) => {
  try {
    error.value = null

    if (usuarioId.value === null) {
      error.value = 'Usuario inválido'
      return
    }

    await devolverPrestamo(usuarioId.value, libroId)

    await buscarLibrosUsuario()

  } catch (err) {
    console.error(err)
    error.value = 'No se pudo devolver el préstamo'
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center mb-4">
      <div class="col-md-6">
        <div class="text-center">
          <button class="btn btn-primary" @click="buscarLibrosUsuario">
            Ver mis libros
          </button>
        </div>

        <small v-if="error" class="text-danger">{{ error }}</small>
      </div>
    </div>

    <div class="row justify-content-center g-4">
      <div class="col-12 col-md-6 col-lg-4" v-for="book in books" :key="book.id">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-dark text-white text-center">
            <strong>{{ book.titulo }}</strong>
          </div>
          <div class="card-body">
            <p><strong>ID:</strong> {{ book.id }}</p>
            <p><strong>Autor:</strong> {{ book.autor }}</p>
            <p><strong>ISBN:</strong> {{ book.isbn }}</p>
            <p><strong>Año:</strong> {{ book.anioPublicacion }}</p>
            <p><strong>Editorial:</strong> {{ book.editorial }}</p>
            <p>
              <strong>Estado:</strong>
              <span class="badge" :class="{
                    'bg-success': book.estadoLibro === 'DISPONIBLE',
                    'bg-warning text-dark': book.estadoLibro === 'RESERVADO',
                    'bg-info': book.estadoLibro === 'PRESTADO'
                  }"
              >
                {{ book.estadoLibro }}
              </span>
            </p>
            <button v-if="book.estadoLibro === 'PRESTADO'" class="btn btn-danger w-100 mt-3" @click="devolver(book.id)">
              Devolver préstamo
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>