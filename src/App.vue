<script setup>
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
</script>

<template>
  <NavMenu />
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <div class="footer justify-content-center align-items-center py-3 my-3 container-fluid">
    <p>Toca da Barba © Copyright 2024. Todos os direitos reservados.</p>
    <div class="d-flex justify-content-center gap-3">

      <router-link to="/area-do-cliente" class="footer-link">Área do Cliente</router-link>

      <router-link to="/area-do-gerente" class="footer-link">Área do Gerente</router-link>

      <router-link to="/area-do-barbeiro" class="footer-link">Área do Barbeiro</router-link>

      <router-link to="/area-do-recepcionista" class="footer-link">Área do Recepcionista</router-link>

    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.footer {
  background-color: #381818;
  color: white;
  text-align: center;
  position: absolute;
  bottom: 100;
  margin-top: auto;
}

.footer-link {
  text-decoration: none;
  color: white;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
