<script setup>
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
</script>

<template>
  <div class="app">
    <NavMenu class="navigation" />
    <main class="content pt-4">
      <RouterView v-slot="{ Component }" class="w-100">
        <transition name="fade" mode="out-in" class="w-100">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <div class="footer">
      <p>Toca da Barba © Copyright 2024. Todos os direitos reservados.</p>
      <div class="d-flex justify-content-center gap-3">
        <router-link to="/area-do-cliente" class="footer-link">Área do Cliente</router-link>
        <router-link to="/area-do-gerente" class="footer-link">Área do Gerente</router-link>
        <router-link to="/area-do-barbeiro" class="footer-link">Área do Barbeiro</router-link>
        <router-link to="/area-do-recepcionista" class="footer-link">Área do Recepcionista</router-link>
      </div>
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

.app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "navigation"
    "content"
    "footer";
  min-height: 100vh;
}

.navigation {
  grid-area: navigation;
}

.content {
  grid-area: content;
  display: flex;
  justify-content: center;
  background-color: #e8e2e2;
}

.footer {
  padding: 10px;
  grid-area: footer;
  background-color: #381818;
  color: white;
  text-align: center;
}

.footer-link {
  text-decoration: none;
  color: white;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
