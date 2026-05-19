<script setup lang="ts">

</script>

<template>
  <h1 class="text-center mt-5">Biblioteca del IES Juan García Valdemora</h1>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="p-5 bg-light rounded-3 text-center shadow-sm">
          <h2 class="text-muted">Aquí puedes ver los listados de los Libros y Usuarios</h2>
          <br>
          <div class="d-flex justify-content-center align-items-center gap-3">
            <router-link to="/libros" class="btn btn-lg rounded-pill px-4" style="background-color: #5f8fa3;">
              Ver Listado de Libros
            </router-link>
            <router-link to="/usuarios" class="btn btn-lg rounded-pill px-4" style="background-color: #5f8fa3;">
              Ver Listado de Usuarios
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>