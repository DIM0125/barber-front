<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import AdicionarFuncionarioModal from '../../components/modal/AdicionarFuncionarioModal.vue';
import EditarFuncionarioModal from '../../components/modal/EditarFuncionarioModal.vue';
import api from '../../services/api.js';

const loading = ref(0);
const found = reactive({
    gerentes: false,
    barbeiros: false,
    recepcionistas: false
})
const gerentes = reactive([]);
const barbeiros = reactive([]);
const recepcionistas = reactive([]);

onBeforeMount(async () => {
    await api.get('/users/managers')
        .then(response => {
            gerentes.value = response.data.data;
            loading.value++;
            found.gerentes = true;
        })
        .catch(error => {
            console.log(error);
            loading.value++;
            found.gerentes = false;
        })

    await api.get('/users/barbers')
        .then(response => {
            barbeiros.value = response.data.data;
            loading.value++;
            found.barbeiros = true;
        })
        .catch(error => {
            console.log(error);
            loading.value++;
            found.barbeiros = false;
        })

    await api.get('/users/receptionists')
        .then(response => {
            recepcionistas.value = response.data.data;
            loading.value++;
            found.recepcionistas = true;
        })
        .catch(error => {
            console.log(error);
            loading.value++;
            found.recepcionistas = false;
        })
})

</script>

<template>
    <div>
        <div class="d-flex align-items-center justify-content-between">
            <h1>Quadro de Funcionários</h1>
            <div class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#novoFuncionarioModal">Cadastrar
                Funcionário
            </div>
        </div>

        <AdicionarFuncionarioModal />

        <div v-if="loading < 3">
            <h3 class="text-center">Carregando...</h3>
        </div>

        <div v-else>

            <h2>Gerentes</h2>
            <div v-if="found.gerentes && gerentes.value.length > 0">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Data de Contratação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="gerente in gerentes.value" :key="gerente.id">
                            <td>{{ gerente.nome }}</td>
                            <td>{{ gerente.email }}</td>
                            <td>{{ gerente.telefone }}</td>
                            <td>{{ new Date(gerente.data_contratacao).toLocaleDateString('pt-br') }}</td>
                            <td>
                                <button class="btn btn-outline-warning mx-1" title="Editar" data-bs-toggle="modal"
                                    :data-bs-target="'#editarFuncionarioModal' + gerente.id_gerente">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-outline-danger mx-1" title="Excluir"><i
                                        class="bi bi-trash"></i></button>
                            </td>
                            <EditarFuncionarioModal :funcionario="gerente" />
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                Nenhum gerente encontrado.
            </div>
            <hr>
            <h2>Barbeiros</h2>
            <div v-if="found.barbeiros && barbeiros.value.length > 0">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Data de Contratação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="barbeiro in barbeiros.value" :key="barbeiro.id">
                            <td>{{ barbeiro.nome }}</td>
                            <td>{{ barbeiro.email }}</td>
                            <td>{{ barbeiro.telefone }}</td>
                            <td>{{ new Date(barbeiro.data_contratacao).toLocaleDateString('pt-br') }}</td>
                            <td>
                                <button class="btn btn-outline-warning mx-1" title="Editar" data-bs-toggle="modal"
                                    :data-bs-target="'#editarFuncionarioModal' + barbeiro.id_barbeiro">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-outline-danger mx-1" title="Excluir"><i
                                        class="bi bi-trash"></i></button>
                            </td>
                            <EditarFuncionarioModal :funcionario="barbeiro" />
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                Nenhum barbeiro encontrado.
            </div>
            <hr>
            <h2>Recepcionistas</h2>
            <div v-if="found.recepcionistas && recepcionistas.value.length > 0">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Data de Contratação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="recepcionista in recepcionistas.value" :key="recepcionista.id">
                            <td>{{ recepcionista.nome }}</td>
                            <td>{{ recepcionista.email }}</td>
                            <td>{{ recepcionista.telefone }}</td>
                            <td>{{ new Date(recepcionista.data_contratacao).toLocaleDateString('pt-br') }}</td>
                            <td>
                                <button class="btn btn-outline-warning mx-1" title="Editar" data-bs-toggle="modal"
                                    :data-bs-target="'#editarFuncionarioModal' + recepcionista.id_recepcionista">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-outline-danger mx-1" title="Excluir"><i
                                        class="bi bi-trash"></i></button>
                            </td>
                            <EditarFuncionarioModal :funcionario="recepcionista" />
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                Nenhum recepcionista encontrado.
            </div>
        </div>
    </div>

</template>

<style scoped></style>