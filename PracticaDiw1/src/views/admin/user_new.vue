<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { createAdminUser } from '@/services/admin.service'

  const router = useRouter()

  /*const user = ref({
    nombre: '',
    rol: 'ADMIN',
    libros: [
      {
        titulo: '',
        autor: '',
        isbn: '',
        anioPublicacion: 0,
        editorial: '',
        estadoLibro: 'DISPONIBLE'
      }
    ]
  })

  const guardarUsuario = async () => {
    console.log('CLICK EN GUARDAR')
    console.log(user.value)

    try {
      console.log('JSON ENVIADO:', JSON.stringify(user.value, null, 2))
      await createAdminUser(user.value)
      console.log('USUARIO ENVIADO AL BACKEND')
      router.push('/usuarios')
    } catch (e) {
      console.error('ERROR AL CREAR USUARIO', e)
      alert('Error al crear el usuario')
    }
  }*/
  const user = ref({
    nombre: '',
    rol: ''
  })

  const guardarUsuario = async () => {
    try {
      // Payload EXACTO que espera el backend
      const usuarioParaEnviar = {
        nombre: user.value.nombre,
        rol: user.value.rol
      }

      console.log(
          'JSON ENVIADO:',
          JSON.stringify(usuarioParaEnviar, null, 2)
      )

      await createAdminUser(usuarioParaEnviar)

      router.push('/usuarios')
    } catch (e) {
      console.error('ERROR COMPLETO:', e)

      if (e.response) {
        console.error('STATUS:', e.response.status)
        console.error('DATA:', e.response.data)
      }

      alert('Error al crear el usuario')
    }
  }
</script>

<template>
  <div class="container mt-5">
    <div class="card bg-dark text-light p-4 shadow-lg">

      <h2 class="text-center mb-4">Crear nuevo usuario</h2>

      <form @submit.prevent="guardarUsuario" method="POST">

        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input class="form-control bg-secondary text-light border-0" type="text" v-model="user.nombre" placeholder="Nombre" required>
        </div>

        <!--<div class="mb-3">
          <label class="form-label">Rol</label>
          <select class="form-select bg-secondary text-light border-0" v-model="user.rol">
            <option value="USER">USER</option>
          </select>
        </div>

        <h4 class="mt-5 mb-3">Libros</h4>

        <div class="card bg-black border border-secondary p-4 mb-4 text-white">

        <div class="row">

            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Título</label>
                <input class="form-control bg-secondary text-light border-0" type="text" v-model="user.libros[0].titulo" placeholder="Título">
              </div>

              <div class="mb-3">
                <label class="form-label">Autor</label>
                <input class="form-control bg-secondary text-light border-0" type="text" v-model="user.libros[0].autor" placeholder="Autor">
              </div>

              <div class="mb-3">
                <label class="form-label">ISBN</label>
                <input class="form-control bg-secondary text-light border-0" type="text" v-model="user.libros[0].isbn" placeholder="ISBN">
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Año de publicación</label>
                <input class="form-control bg-secondary text-light border-0" type="number" v-model.number="user.libros[0].anioPublicacion" placeholder="Año">
              </div>

              <div class="mb-3">
                <label class="form-label">Editorial</label>
                <input class="form-control bg-secondary text-light border-0" type="text" v-model="user.libros[0].editorial" placeholder="Editorial">
              </div>
              <div class="mb-3 text-center">
                <label class="form-label d-block">Estado del libro</label>
                <select class="form-select bg-secondary text-light border-0 w-50 mx-auto" v-model="user.libros[0].estadoLibro">
                  <option value="DISPONIBLE">DISPONIBLE</option>
                  <option value="PRESTADO">PRESTADO</option>
                </select>
              </div>
            </div>
          </div>
        </div>-->
        <div class="mb-3">
          <label class="form-label">Rol</label>
          <select class="form-select bg-secondary text-light border-0" name="rol" v-model="user.rol">
            <option value="ADMIN">ADMIN</option>
            <option value="PROFESOR">PROFESOR</option>
            <option value="ALUMNO">ALUMNO</option>
          </select>
        </div>

        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary px-5">
            Guardar usuario
          </button>
        </div>

      </form>

    </div>
  </div>


</template>

<style scoped>

</style>