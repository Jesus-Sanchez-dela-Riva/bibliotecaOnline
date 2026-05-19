<script setup lang="ts">

</script>

<template>
  <h1 class="text-center mt-5">Bienvenidos a la Biblioteca</h1>

  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="p-5 bg-light rounded-3 text-center shadow-sm">

          <h2 class="text-muted">
            Aquí puedes consultar tus libros y los disponibles
          </h2>

          <br>

          <div class="d-flex justify-content-center align-items-center gap-3 flex-wrap">

            <router-link
                to="/librosbyIdUser"
                class="btn btn-lg rounded-pill px-4"
                style="background-color: #5f8fa3; color: white;"
            >
              Ver libros del usuario
            </router-link>

            <router-link
                to="/librosDisponibles"
                class="btn btn-lg rounded-pill px-4"
                style="background-color: #5f8fa3; color: white;"
            >
              Ver libros disponibles
            </router-link>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>