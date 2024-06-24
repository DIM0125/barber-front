<script setup>
import { useAuthStore } from '../../stores/AuthStore';
import api from '../../services/api.js';
import { onBeforeMount, ref, reactive } from 'vue';

const servicosPrestados = reactive({})
const servicosDisponiveis = reactive([]);
const loading = ref(true);
const found = ref(false);

onBeforeMount(async () => {
    await api.get(`/servicos/${useAuthStore().userData.id_usuario}`)
        .then(async (response) => {
            if (response.data.success) {
                servicosPrestados.value = response.data.data;

                await api.get('/servicos')
                    .then((response) => {
                        if (response.data.success) {
                            console.log(response.data.data);
                            servicosDisponiveis.value = response.data.data.filter(servico => !servicosPrestados.value.some(servicoPrestado => servicoPrestado.id_servico === servico.id_servico));
                        }
                    })
                found.value = true;
            }
            loading.value = false;
        })
        .catch(error => {
            console.log(error);
        })

})

const handleExcluirServico = async (id_servico) => {

    if (!confirm("Deseja parar de oferece esse tipo de serviço?")) {
        return;
    }

    console.log(useAuthStore().userData.id_usuario, id_servico);

    await api.delete(`/presta-servico/${useAuthStore().userData.id_usuario}/${id_servico}`)
        .then((response) => {
            if (response.data.success) {
                window.location.reload();
            }
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
}

const servicoEscolhido = ref();
const handleAdicionarServico = async () => {
    await api.post(`/presta-servico`, { id_barbeiro: useAuthStore().userData.id_usuario, id_servico: servicoEscolhido.value })
        .then((response) => {
            if (response.data.success) {
                window.location.reload();
            }
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
}
</script>

<template>
    <div>
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <h1>Serviços Prestados</h1>
            </div>
            <div>
                <div class="input-group">
                    <select class="form-select" v-model="servicoEscolhido">
                        <option v-for="servico in servicosDisponiveis.value" :value="servico.id_servico"
                            :key="servico.id_servico">{{ servico.nome }} ({{ servico.duracao_estimada }} min)</option>
                    </select>
                    <button class="btn btn-outline-success" @click="handleAdicionarServico()">Adicionar</button>
                </div>
            </div>
        </div>

        <div v-if="loading">
            <h1 class="text-center">Carregando...</h1>
        </div>

        <div v-else>
            <div v-if="found && servicosPrestados.value.length > 0">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Duração Estimada (min)</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="servico in servicosPrestados.value" :key="servico.id_servico">
                            <td>{{ servico.nome }}</td>
                            <td>{{ servico.descricao }}</td>
                            <td>{{ servico.duracao_estimada }}</td>
                            <td>R$ {{ servico.valor }}</td>
                            <td>
                                <button class="btn btn-outline-danger mx-1" title="Excluir"
                                    @click="handleExcluirServico(servico.id_servico)"><i
                                        class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else>
                <h1 class="text-center">Nenhum Serviço Prestado</h1>
            </div>
        </div>
    </div>
</template>

<style scoped></style>