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
    <p>© Copyright 2024. Todos os direitos reservados.</p>
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
</style>
