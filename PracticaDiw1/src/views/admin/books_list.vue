<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { getBooks, updateBook, deleteBook } from '@/services/admin.service'
  import editarLibro from '@/components/editarLibro.vue'

  const books = ref<any[]>([])
  const libroSeleccionado = ref<any>(null)

  onMounted(async () => {
    try {
      books.value = await getBooks()
    } catch (error) {
      console.error(error)
    }
  })

  const actualizarLibro = async (libroActualizado: any) => {
    try {
      await updateBook(libroActualizado)
      books.value = await getBooks()
      libroSeleccionado.value = null
    } catch (error) {
      console.error(error)
    }
  }

  const borrarLibro = async (id: number) => {
    const confirmado = confirm(
        '¿Seguro que quieres borrar este libro?'
    )

    if (!confirmado) return

    try {
      await deleteBook(id)
      books.value = await getBooks()
    } catch (error) {
      console.error(error)
    }
  }
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
                    'bg-success': book.estadoLibro === 'DISPONIBLE',
                    'bg-warning text-dark': book.estadoLibro === 'RESERVADO',
                    'bg-info': book.estadoLibro === 'PRESTADO'
                  }"
              >
                {{ book.estadoLibro }}
              </span>
            </p>
          </div>
          <div class="card-footer text-center">
            <button class="btn btn-info rounded-pill me-2" data-bs-toggle="modal" data-bs-target="#editarLibroModal" @click="libroSeleccionado = book">
              Actualizar
            </button>
            <button class="btn btn-danger rounded-pill" @click="borrarLibro(book.id)">
              Borrar
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
  <editarLibro :libro="libroSeleccionado" @guardar-libro="actualizarLibro"/>
</template>

<style scoped>

</style>