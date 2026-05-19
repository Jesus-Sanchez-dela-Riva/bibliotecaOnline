<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBooksAvailable, solicitarPrestamo } from '@/services/user.service'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const books = ref<any[]>([])
const mensaje = ref<string | null>(null)
const error = ref<string | null>(null)

const cargarLibros = async () => {
  try {
    books.value = await getBooksAvailable()
  } catch (error) {
    console.error(error)
  }
}

const solicitar = async (libroId: number) => {
  try {
    error.value = null
    mensaje.value = null

    const usuarioId = Math.floor(Math.random() * 2) + 2

    console.log("Usuario random:", usuarioId)
    console.log("Libro:", libroId)

    await solicitarPrestamo(usuarioId, libroId)

    mensaje.value = 'Préstamo realizado correctamente'

    await cargarLibros()

  } catch (err) {
    console.error(err)
    error.value = 'No se ha podido solicitar el préstamo'
  }
}

onMounted(cargarLibros)
</script>

<template>
  <div class="container mt-5">
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
                    'bg-success': book.estadoLibro === 'DISPONIBLE'
                  }"
              >
                {{ book.estadoLibro }}
              </span>
            </p>
            <button class="btn btn-primary w-100 mt-3" @click="solicitar(book.id)">
              Solicitar préstamo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>