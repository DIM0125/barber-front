<script setup>
import api from '../../services/api.js';
import { ref, reactive, onBeforeMount } from 'vue';
import AdicionarServicoModal from '../../components/modal/AdicionarServicoModal.vue';
import EditarServicoModal from '../../components/modal/EditarServicoModal.vue';

const servicos = reactive({})
const loading = ref(true);
const found = ref(false);

onBeforeMount(async () => {
    await api.get('/servicos')
        .then(response => {
            servicos.value = response.data.data;
            loading.value = false;
            found.value = true;
        })
        .catch(error => {
            console.log(error);
            loading.value = false;
            found.value = false;
        })
})

const handleExcluirServico = async (id) => {

    if (!confirm("Tem certeza que deseja excluir este serviço?")) {
        return;
    }

    await api.delete(`/servicos/${id}`)
        .then(() => {
            servicos.value = servicos.value.filter(servico => servico.id_servico !== id);
        })
        .catch(error => {
            console.log(error);
        })
}
</script>

<template>
    <div>
        <div>
            <div class="d-flex align-items-center justify-content-between">
                <h1>Serviços Oferecidos pela Barbearia</h1>
                <div class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#novoServicoModal">Adicionar Serviço
                </div>
            </div>

            <AdicionarServicoModal />
        </div>

        <div v-if="loading">
            <h1 class="text-center">Carregando...</h1>
        </div>

        <div v-else>

            <div v-if="found && servicos.value.length > 0">
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
                        <tr v-for="servico in servicos.value" :key="servico.id_servico">
                            <td>{{ servico.nome }}</td>
                            <td>{{ servico.descricao }}</td>
                            <td>{{ servico.duracao_estimada }}</td>
                            <td>R$ {{ servico.valor }}</td>
                            <td>
                                <button class="btn btn-outline-warning mx-1" title="Editar" data-bs-toggle="modal"
                                    :data-bs-target="'#editarServicoModal' + servico.id_servico">
                                    <i class="bi bi-pencil-square"></i>
                                </button>

                                <button class="btn btn-outline-danger mx-1" title="Excluir"
                                    @click="handleExcluirServico(servico.id_servico)"><i
                                        class="bi bi-trash"></i></button>
                            </td>

                            <EditarServicoModal :servico="servico" />
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