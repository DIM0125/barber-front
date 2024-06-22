<script setup>
import { RouterLink } from 'vue-router';

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
                    <RouterLink class="nav-link" to="/login">Login</RouterLink>
                    <RouterLink class="nav-link" to="/cadastro">Cadastro</RouterLink>
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