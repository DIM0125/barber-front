<script setup>
import { useAuthStore } from "../../stores/AuthStore";
import api from "../../services/api";
import { onMounted, ref } from "vue";

const agendamentos = ref([])
const agendamentosHoje = ref([])

onMounted(() => {
    api.get('/agendamentos/barbeiro/' + useAuthStore().userData.id_usuario)
        .then(response => {
            agendamentos.value = response.data.data
            agendamentosHoje.value = agendamentos.value.filter(agendamento => new Date(agendamento.horario_agendamento).toDateString() === new Date().toDateString())
            agendamentos.value = agendamentos.value.filter(agendamento => !agendamentosHoje.value.includes(agendamento))
        })
        .catch(error => {
            console.log(error)
        })
})
</script>

<template>
    <div>
        <h1>Agendamentos Marcados</h1>


        <h3>Agendamentos de Hoje</h3>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Data, Horário</th>
                    <th>Valor</th>
                    <th>Duração Estimada</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="agendamento in agendamentosHoje" :key="agendamento.id_agendamento">

                    <td>{{ agendamento.cliente.nome }}</td>
                    <td>{{ new Date(agendamento.horario_agendamento).toLocaleString() }}</td>
                    <td>R$ {{ agendamento.servicos.reduce((sum, servico) => sum + servico.valor, 0) }}</td>
                    <td>{{ agendamento.servicos.reduce((sum, servico) => sum + servico.duracao_estimada, 0) }} min</td>
                    <td>{{ agendamento.status }}</td>
                </tr>
            </tbody>
        </table>
        <hr>
        <h3>Agendamentos Futuros</h3>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Data, Horário</th>
                    <th>Valor</th>
                    <th>Duração Estimada</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="agendamento in agendamentos" :key="agendamento.id_agendamento">

                    <td>{{ agendamento.cliente.nome }}</td>
                    <td>{{ new Date(agendamento.horario_agendamento).toLocaleString() }}</td>
                    <td>R$ {{ agendamento.servicos.reduce((sum, servico) => sum + servico.valor, 0) }}</td>
                    <td>{{ agendamento.servicos.reduce((sum, servico) => sum + servico.duracao_estimada, 0) }} min</td>
                    <td>{{ agendamento.status }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<style scoped></style>