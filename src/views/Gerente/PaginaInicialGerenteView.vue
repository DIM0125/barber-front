<script setup>
import { useAuthStore } from '../../stores/AuthStore';

</script>

<template>

    <div>
        <h1>Bem-vindo(a) de volta, {{ useAuthStore().userData.nome }}!</h1>
        <div class="row d-flex flex-column justify-content-center align-items-center">
            <img class="col-6" src=" /manager.svg" alt="Barbeiro" />
            <p class="h3 text-center">Essa é a Área do Gerente, onde voce pode gerenciar os funcionários, estoque e
                serviços Oferecidos pela Barbearia.</p>
        </div>
    </div>

</template>

<style scoped></style>