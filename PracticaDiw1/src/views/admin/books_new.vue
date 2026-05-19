<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { createBook } from '@/services/admin.service'

  const router = useRouter()

  const book = ref({
    titulo: '',
    autor: '',
    isbn: '',
    anioPublicacion: '',
    editorial: '',
    estadoLibro: 'DISPONIBLE'
  })

  const guardarLibro = async () => {
    try {
      const libroParaEnviar = {
        titulo: book.value.titulo,
        autor: book.value.autor,
        isbn: book.value.isbn,
        anioPublicacion: book.value.anioPublicacion,
        editorial: book.value.editorial,
        estadoLibro: book.value.estadoLibro
      }


      await createBook(libroParaEnviar)

      router.push('/libros')
    } catch (e) {
      alert('Error al crear el libro')
    }
  }
</script>

<template>
  <div class="container mt-5">
    <div class="card bg-dark text-light p-4 shadow-lg">

      <h2 class="text-center mb-4">Crear nuevo libro</h2>

      <form @submit.prevent="guardarLibro">

        <div class="mb-3">
          <label class="form-label">Título</label>
          <input class="form-control bg-secondary text-light border-0" v-model="book.titulo" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Autor</label>
          <input class="form-control bg-secondary text-light border-0" v-model="book.autor" required>
        </div>

        <div class="mb-3">
          <label class="form-label">ISBN</label>
          <input class="form-control bg-secondary text-light border-0" v-model="book.isbn" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Año de publicación</label>
          <input type="number" class="form-control bg-secondary text-light border-0" v-model.number="book.anioPublicacion" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Editorial</label>
          <input class="form-control bg-secondary text-light border-0" v-model="book.editorial" required>
        </div>

        <div class="mb-4">
          <label class="form-label">Estado</label>
          <select class="form-select bg-secondary text-light border-0" v-model="book.estadoLibro">
            <option value="DISPONIBLE">DISPONIBLE</option>
            <option value="PRESTADO">PRESTADO</option>
            <option value="RESERVADO">RESERVADO</option>
          </select>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-success px-5">
            Guardar libro
          </button>
        </div>

      </form>

    </div>
  </div>
</template>

<style scoped>

</style>