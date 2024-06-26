<script setup>
import { ref, onBeforeMount } from 'vue';
import api from '../../services/api.js';
import PagamentoModal from '../../components/modal/PagamentoModal.vue';

const loading = ref(0);
const found = ref(true);
const agendamentosHoje = ref([]);
const agendamentosRestantes = ref([]);
const agendamentosFinalizados = ref([]);
const agendamentos = ref([]);

const showRestantes = ref(true);
const showFinalizados = ref(true);

const fetchAgendamentos = async () => {
    try {
        const response = await api.get('/agendamentos');
        agendamentos.value = response.data.data;
        console.log(agendamentos.value);

        const today = new Date().toDateString();

        agendamentosHoje.value = agendamentos.value.filter(agendamento =>
            new Date(agendamento.horario_agendamento).toDateString() === today &&
            (agendamento.status === 'AGENDADO' || agendamento.status === 'CONFIRMADO')
        );

        agendamentosRestantes.value = agendamentos.value.filter(agendamento =>
            new Date(agendamento.horario_agendamento).toDateString() !== today &&
            (agendamento.status === 'AGENDADO' || agendamento.status === 'CONFIRMADO') &&
            !agendamentosHoje.value.some(a => a.id_agendamento === agendamento.id_agendamento)
        );

        agendamentosFinalizados.value = agendamentos.value.filter(agendamento =>
            agendamento.status === 'FINALIZADO' || agendamento.status === 'CANCELADO'
        );

        loading.value++;
    } catch (error) {
        loading.value++;
        found.value = false;
        console.error('Erro ao buscar agendamentos:', error);
    }
};

const handleConfirmation = async (agendamentoId) => {

    if (!confirm('Deseja confirmar esse agendamento?')) {
        return;
    }

    try {
        const requestData = {
            status: 'CONFIRMADO',
        };

        await api.put(`/agendamentos/${agendamentoId}`, requestData);

        await fetchAgendamentos();
    } catch (error) {
        console.error(error);
    }
};

const handleCancel = async (agendamentoId) => {
    if (!confirm('Deseja cancelar esse agendamento?')) {
        return;
    }

    try {
        const requestData = {
            status: 'CANCELADO',
        };

        await api.put(`/agendamentos/${agendamentoId}`, requestData);

        await fetchAgendamentos();
    } catch (error) {
        console.error(error);
    }
};

onBeforeMount(fetchAgendamentos);

</script>

<template>
    <div class="container">
        <h1>Agendamentos e Pagamentos</h1>
        <div v-if="loading < 1">
            <h3 class="text-center">Carregando...</h3>
        </div>
        <div v-else>
            <div v-if="found">
                <h2>
                    Agendamentos de Hoje
                </h2>

                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="agendamento in agendamentosHoje" :key="agendamento.id_agendamento">

                            <td>{{ agendamento.id_agendamento }}</td>
                            <td>{{ agendamento.cliente.nome }}</td>
                            <td>{{ new Date(agendamento.horario_agendamento).toLocaleString() }}</td>
                            <td>{{ agendamento.status }}</td>
                            <td>
                                <div class="d-flex flex-row justify-content-center gap-2 align-items-end">
                                    <button data-bs-toggle="modal"
                                        :data-bs-target="'#pagamentoModal' + agendamento.id_agendamento"
                                        class="btn btn-outline-success" title="Finalizar Atendimento"><i
                                            class="bi bi-cash-coin"></i></button>
                                    <button @click="handleConfirmation(agendamento.id_agendamento)"
                                        :disabled="agendamento.status === 'CONFIRMADO'" class="btn btn-outline-primary"
                                        title="Confirmar Agendamento"><i class="bi bi-check-lg"></i></button>
                                    <button @click="handleCancel(agendamento.id_agendamento)"
                                        class="btn btn-outline-danger" title="Cancelar Agendamento"><i
                                            class="bi bi-calendar2-x"></i></button>
                                </div>
                            </td>
                            <PagamentoModal :agendamento="agendamento" />
                        </tr>
                    </tbody>
                </table>

                <div class="d-flex flex-row">
                    <h2>
                        Agendamentos Restantes
                    </h2>
                    <div class="d-flex align-items-center m-2 eye" @click="showRestantes = !showRestantes">
                        <div v-if="showRestantes">
                            <i class="bi bi-eye"></i>
                        </div>
                        <div v-else>
                            <i class="bi bi-eye-slash"></i>
                        </div>
                    </div>
                </div>
                <table v-if="showRestantes" class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="agendamento in agendamentosRestantes" :key="agendamento.id_agendamento">

                            <td>{{ agendamento.id_agendamento }}</td>
                            <td>{{ agendamento.cliente.nome }}</td>
                            <td>{{ new Date(agendamento.horario_agendamento).toLocaleString() }}</td>
                            <td>{{ agendamento.status }}</td>
                            <td>
                                <div class="d-flex flex-row justify-content-center gap-2 align-items-end">
                                    <button data-bs-toggle="modal"
                                        :data-bs-target="'#pagamentoModal' + agendamento.id_agendamento"
                                        class="btn btn-outline-success" title="Finalizar Atendimento"><i
                                            class="bi bi-cash-coin"></i></button>
                                    <button @click="handleConfirmation(agendamento.id_agendamento)"
                                        class="btn btn-outline-primary" title="Confirmar Agendamento"
                                        :disabled="agendamento.status === 'CONFIRMADO'"><i
                                            class="bi bi-check-lg"></i></button>
                                    <button @click="handleCancel(agendamento.id_agendamento)"
                                        class="btn btn-outline-danger" title="Cancelar Agendamento"><i
                                            class="bi bi-calendar2-x"></i></button>
                                </div>
                            </td>
                            <PagamentoModal :agendamento="agendamento" />
                        </tr>
                    </tbody>
                </table>

                <div class="d-flex flex-row">
                    <h2>
                        Agendamentos Finalizados
                    </h2>
                    <div class="d-flex align-items-center m-2 eye" @click="showFinalizados = !showFinalizados">
                        <div v-if="showFinalizados">
                            <i class="bi bi-eye"></i>
                        </div>
                        <div v-else>
                            <i class="bi bi-eye-slash"></i>
                        </div>
                    </div>
                </div>
                <table v-if="showFinalizados" class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="agendamento in agendamentosFinalizados" :key="agendamento.id_agendamento">
                            <td>{{ agendamento.id_agendamento }}</td>
                            <td>{{ agendamento.cliente.nome }}</td>
                            <td>{{ new Date(agendamento.horario_agendamento).toLocaleString() }}</td>
                            <td>{{ agendamento.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <h3 class="text-center">Nenhum agendamento encontrado.</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
.eye {
    cursor: pointer;
}
</style>
