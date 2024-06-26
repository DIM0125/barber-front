<script setup>
import { ref, onBeforeMount } from 'vue';
import api from '../../services/api.js';

const pagamentos = ref([]);
const loading = ref(true);
const found = ref(false);

onBeforeMount(() => {
    api.get('/pagamentos')
        .then(response => {
            if (response.data.success) {
                pagamentos.value = response.data.data
                found.value = pagamentos.value.length > 0
                console.log(pagamentos.value);
            }
            loading.value = false
        })
        .catch(error => {
            console.log(error)
            loading.value = false
            found.value = false
        })
})
</script>

<template>

    <div>
        <div>
            <div class="d-flex align-items-center justify-content-between">
                <h1>Pagamentos Realizados</h1>
                <button class="btn btn-outline-secondary" @click="window.location.reload()"><i
                        class="bi bi-arrow-clockwise"></i></button>
            </div>


        </div>

        <div v-if="loading">
            <h1 class="text-center">Carregando...</h1>
        </div>

        <div v-else>

            <div v-if="found">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID Agendamento</th>
                            <th>Status</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pagamento in pagamentos" :key="pagamento.id_pagamento">
                            <td>{{ pagamento.id_agendamento }}</td>
                            <td>{{ pagamento.status }}</td>
                            <td>R$ {{ pagamento.valor }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else>
                <h3 class="text-center">Nenhum item encontrado.</h3>
            </div>
        </div>
    </div>

</template>

<style scoped></style>