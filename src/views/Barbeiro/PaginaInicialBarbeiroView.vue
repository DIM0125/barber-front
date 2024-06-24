<script setup>
import { useAuthStore } from '../../stores/AuthStore';

</script>

<template>

    <div>
        <h1>Bem-vindo(a) de volta, {{ useAuthStore().userData.nome }}!</h1>
        <div class="row d-flex flex-column justify-content-center align-items-center">
            <img class="col-6" src=" /barber.svg" alt="Barbeiro" />
            <p class="h3 text-center">Essa é a Área do Barbeiro, onde voce pode gerenciar os seus horários, serviços
                ofertados e
                agendamentos
                com clientes.</p>
        </div>
    </div>

</template>

<style scoped></style>