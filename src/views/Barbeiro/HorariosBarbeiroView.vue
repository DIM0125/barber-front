<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useAuthStore } from '../../stores/AuthStore'
import EditarHorariosModal from '../../components/modal/EditarHorariosModal.vue'
import api from '../../services/api.js';

const horarios = reactive({})

const horariosPorDia = ref(new Map([
    ['SEGUNDA', []],
    ['TERCA', []],
    ['QUARTA', []],
    ['QUINTA', []],
    ['SEXTA', []],
    ['SABADO', []],
    ['DOMINGO', []]
]))

const diasDaSemana = ref(new Map([
    ['Segunda-feira', 'SEGUNDA'],
    ['Terça-Feira', 'TERCA'],
    ['Quarta-Feira', 'QUARTA'],
    ['Quinta-Feira', 'QUINTA'],
    ['Sexta-Feita', 'SEXTA'],
    ['Sábado', 'SABADO'],
    ['Domingo', 'DOMINGO']
]))

onBeforeMount(() => {
    api.get(`/barber/${useAuthStore().userData.id_usuario}/work-schedule`)
        .then(response => {
            horarios.value = response.data.data

            for (const horario of horarios.value) {
                horariosPorDia.value.get(horario.dia_da_semana).push(horario)
            }

            for (const [key, value] of horariosPorDia.value.entries()) {
                value.sort((a, b) => {
                    const dateA = new Date(`1970-01-01T${a.horario_inicio}`);
                    const dateB = new Date(`1970-01-01T${b.horario_inicio}`);
                    return dateA - dateB;
                });
                horariosPorDia.value.set(key, value);
            }

        })
        .catch(error => {
            console.log(error)
        })
})
</script>

<template>
    <div>
        <h1>Horários de Trabalho</h1>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Dia da Semana</th>
                    <th>Horários de Trabalho</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="dia in diasDaSemana.keys()" :key="dia">
                    <td>{{ dia }}</td>
                    <td>
                        <div v-for="horario in horariosPorDia.get(diasDaSemana.get(dia))" :key="horario.id_horario">
                            {{ horario.horario_inicio }} - {{ horario.horario_fim }}
                        </div>
                        <EditarHorariosModal :dia="diasDaSemana.get(dia)"
                            :horarios="horariosPorDia.get(diasDaSemana.get(dia))" />

                    </td>
                    <td>
                        <button class="btn btn-outline-primary mx-1" title="Editar" data-bs-toggle="modal"
                            :data-bs-target="'#editarHorariosModal' + diasDaSemana.get(dia)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<style scoped></style>