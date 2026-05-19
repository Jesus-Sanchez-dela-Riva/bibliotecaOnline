<script setup lang="ts">
  import { ref, watch } from 'vue'

  const props = defineProps<{
    libro?: any
  }>()

  const emit = defineEmits<{
    (e: 'guardar-libro', libro: any): void
  }>()

  const libroEditado = ref<any>(null)

  watch(
      () => props.libro,
      (nuevo) => {
        libroEditado.value = nuevo ? { ...nuevo } : null
      },
      { immediate: true }
  )

  const guardar = () => {
    emit('guardar-libro', libroEditado.value)
  }
</script>

<template>
  <div class="modal fade" id="editarLibroModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">Editar libro</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body" v-if="libroEditado">
          <input v-model="libroEditado.titulo" class="form-control mb-2" />
          <input v-model="libroEditado.autor" class="form-control mb-2" />
          <input v-model="libroEditado.isbn" class="form-control mb-2" />
          <input v-model="libroEditado.anioPublicacion" class="form-control mb-2" />
          <input v-model="libroEditado.editorial" class="form-control mb-2" />
          <select v-model="libroEditado.estadoLibro" class="form-select mb-2">
            <option disabled value="">Selecciona estado</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="RESERVADO">Reservado</option>
            <option value="PRESTADO">Prestado</option>
          </select>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button class="btn btn-success" @click="guardar" data-bs-dismiss="modal">
            Guardar
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>