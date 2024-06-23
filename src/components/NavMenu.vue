<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/AuthStore';

const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
        useAuthStore().logout();
    }
}

</script>

<template>

    <nav class="navbar navbar-expand-md flex-column">
        <RouterLink to="/" class="navbar-brand" href="#">Toca da Barba</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container-fluid">
            <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <RouterLink class="nav-link" to="/">Home</RouterLink>
                    <RouterLink class="nav-link" to="/servicos">Serviços</RouterLink>
                    <RouterLink v-if="!useAuthStore().isAuthenticated" class="nav-link" to="/login">Login</RouterLink>
                    <RouterLink v-if="!useAuthStore().isAuthenticated" class="nav-link" to="/cadastro">Cadastro
                    </RouterLink>
                    <RouterLink v-if="useAuthStore().isAuthenticated && useAuthStore().userData.role === 'CLIENT'"
                        class="nav-link" to="/area-do-cliente">
                        Área do Cliente</RouterLink>
                    <RouterLink v-if="useAuthStore().isAuthenticated && useAuthStore().userData.role === 'BARBER'"
                        class="nav-link" to="/area-do-barbeiro">
                        Área do Barbeiro</RouterLink>
                    <RouterLink v-if="useAuthStore().isAuthenticated && useAuthStore().userData.role === 'RECEPT'"
                        class="nav-link" to="/area-do-recepcionista">
                        Área do Recepcionista</RouterLink>
                    <RouterLink v-if="useAuthStore().isAuthenticated && useAuthStore().userData.role === 'MANAGER'"
                        class="nav-link" to="/area-do-gerente">
                        Área do Gerente</RouterLink>
                    <RouterLink v-if="useAuthStore().isAuthenticated" class="nav-link" @click="handleLogout()" to="">
                        Logout</RouterLink>

                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar-brand {
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
    font-size: 2rem;
    line-height: 0.5;
}
</style>