<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="navbar">
      <nav>
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/servicos">Serviços</RouterLink>
        <RouterLink to="/agendamento">Agendamento</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fafafa;
}

nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}
</style>
