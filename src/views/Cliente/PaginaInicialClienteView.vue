<script setup>
import { useAuthStore } from '../../stores/AuthStore';

</script>

<template>

    <div>
        <h1>Bem-vindo(a), {{ useAuthStore().userData.nome }}!</h1>
        <div class="row d-flex flex-column justify-content-center align-items-center">
            <img class="col col-md-6" src=" /barber.svg" alt="Barbeiro" />
            <p class="h3 text-center">Essa é a Área do Cliente, onde você pode agendar e acompanhar seus agendamentos.
            </p>
        </div>
    </div>

</template>

<style scoped></style>