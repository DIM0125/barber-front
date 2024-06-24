<script setup>
import { ref, onBeforeMount } from 'vue';
import api from '../../services/api.js';

const loading = ref(0);
const found = ref(true);
const agendamentosHoje = ref([]);
const agendamentosRestantes = ref([]);
const agendamentosFinalizados = ref([]);
const agendamentos = ref([]);

const showHoje = ref(true);
const showRestantes = ref(true);
const showFinalizados = ref(true);

const fetchAgendamentos = async () => {
    try {
        const response = await api.get('/agendamentos');
        agendamentos.value = response.data.data;

        const today = new Date().toISOString().split('T')[0];

        agendamentosHoje.value = agendamentos.value
            .filter(agendamento => {
                const agendamentoDate = new Date(agendamento.horario_agendamento).toISOString().split('T')[0];
                return agendamentoDate === today && agendamento.status !== 'Finalizado';
            })
            .map(agendamento => ({
                ...agendamento,
                cliente: agendamento.cliente ? agendamento.cliente.nome : 'Cliente desconhecido'
            }));

        agendamentosRestantes.value = agendamentos.value
            .filter(agendamento => {
                const agendamentoDate = new Date(agendamento.horario_agendamento).toISOString().split('T')[0];
                return agendamentoDate !== today && (agendamento.status === 'confirmado' || agendamento.status === 'Agendado');
            })
            .map(agendamento => ({
                ...agendamento,
                cliente: agendamento.cliente ? agendamento.cliente.nome : 'Cliente desconhecido'
            }));

        agendamentosFinalizados.value = agendamentos.value
            .filter(agendamento => agendamento.status === 'Finalizado' || agendamento.status === 'Cancelado')
            .map(agendamento => ({
                ...agendamento,
                cliente: agendamento.cliente ? agendamento.cliente.nome : 'Cliente desconhecido'
            }));

        loading.value++;
    } catch (error) {
        loading.value++;
        found.value = false;
        console.error('Erro ao buscar agendamentos:', error);
    }
};

const handlePayment = async (agendamentoId) => {
    try {
        const agendamento = agendamentos.value.find(agendamento => agendamento.id_agendamento === agendamentoId);

        const requestData = {
            id_agendamento: agendamento.id_agendamento,
            id_barbeiro: agendamento.id_barbeiro,
            id_cliente: agendamento.id_cliente,
            id_servico: agendamento.id_servico,
            horario_agendamento: new Date().toISOString().replace('T', ' ').slice(0, -5),
            status: 'Finalizado',
            avaliacao_comentario: agendamento.avaliacao_comentario,
            avaliacao_nota: agendamento.avaliacao_nota,
            servicos: agendamento.servicos,
        };

        await api.put(`/agendamentos/${agendamentoId}`, requestData);
        
        await fetchAgendamentos();
    } catch (error) {
        console.error(error);
    }
};

const handleCancel = async (agendamentoId) => {
    try {
        const agendamento = agendamentos.value.find(agendamento => agendamento.id_agendamento === agendamentoId);

        const requestData = {
            id_agendamento: agendamento.id_agendamento,
            id_barbeiro: agendamento.id_barbeiro,
            id_cliente: agendamento.id_cliente,
            id_servico: agendamento.id_servico,
            horario_agendamento: new Date().toISOString().replace('T', ' ').slice(0, -5),
            status: 'Cancelado',
            avaliacao_comentario: agendamento.avaliacao_comentario,
            avaliacao_nota: agendamento.avaliacao_nota,
            servicos: agendamento.servicos,
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
                    <button @click="showHoje = !showHoje">
                        {{ showHoje ? '▼' : '▶' }}
                    </button>
                    Agendamentos de Hoje
                </h2>
                <table v-if="showHoje" class="table">
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
                            <td>{{ agendamento.cliente }}</td>
                            <td>{{ new Date(agendamento.horario_agendamento).toLocaleString() }}</td>
                            <td>{{ agendamento.status }}</td>
                            <td>
                                <button @click="handlePayment(agendamento.id_agendamento)" class="btn btn-success">Emitir Pagamento</button>
                                <button @click="handleCancel(agendamento.id_agendamento)" class="btn btn-danger">Cancelar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2>
                    <button @click="showRestantes = !showRestantes">
                        {{ showRestantes ? '▼' : '▶' }}
                    </button>
                    Agendamentos Restantes
                </h2>
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
                            <td>{{ agendamento.cliente }}</td>
                            <td>{{ new Date(agendamento.horario_agendamento).toLocaleString() }}</td>
                            <td>{{ agendamento.status }}</td>
                            <td>
                                <button @click="handlePayment(agendamento.id_agendamento)" class="btn btn-success">Emitir Pagamento</button>
                                <button @click="handleCancel(agendamento.id_agendamento)" class="btn btn-danger">Cancelar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2>
                    <button @click="showFinalizados = !showFinalizados">
                        {{ showFinalizados ? '▼' : '▶' }}
                    </button>
                    Agendamentos Finalizados
                </h2>
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
                            <td>{{ agendamento.cliente }}</td>
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
.table {
    width: 100%;
    margin-top: 20px;
}

.btn {
    margin-right: 5px;
    color: white;
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
}

button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    margin-right: 5px;
}

h2 {
    display: flex;
    align-items: center;
}
</style>
