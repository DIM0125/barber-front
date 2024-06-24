<script setup>
import { reactive, ref } from 'vue'
import api from '../../services/api.js';
import { useAuthStore } from '../../stores/AuthStore';

const { dia, horarios } = defineProps(['dia', 'horarios'])

const novoHorario = reactive({
    id_barbeiro: useAuthStore().userData.id_usuario,
    dia_da_semana: dia,
    horario_inicio: "00:00:00",
    horario_fim: "00:00:00"
})

const errorMessage = ref('')

const handleNovoHorario = async () => {
    await api.post('/barber/add-work-schedule', novoHorario)
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            errorMessage.value = "Houve um erro ao adicionar o horário. Tente novamente mais tarde."
            console.log(error)
        })
}

const handleExcluirHorario = async (id) => {
    await api.delete(`/barber/${useAuthStore().userData.id_usuario}/work-schedule/${id}`)
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        })
}
</script>

<template>

    <div class="modal fade" :id="'editarHorariosModal' + dia" tabindex="-1" aria-labelledby="editarHorariosModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 editarHorariosModalLabel">Editar Horários de Trabalho</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <label for="dia_da_semana">Dia da Semana:</label>
                    <input type="text" class="form-control" id="dia_da_semana" :value="dia" disabled>

                    <div class="row mt-3">
                        <div class="col-5">
                            <label for="horario_inicio">Horário de Início:</label>
                        </div>
                        <div class="col">
                            <label for="horario_fim">Horário de Fim:</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="input-group">
                                <input type="time" class="form-control" id="horario_inicio"
                                    v-model="novoHorario.horario_inicio">
                                <input type="time" class="form-control" id="horario_fim"
                                    v-model="novoHorario.horario_fim">
                                <button type="button" class="btn btn-success" @click="handleNovoHorario"><i
                                        class="bi bi-plus-lg"></i></button>
                            </div>
                        </div>
                    </div>

                    <div v-for="horario in horarios" :key="horario.id_horario" class="row mt-2">
                        <div class="col">
                            <div class="input-group">
                                <input type="time" class="form-control" id="horario_inicio"
                                    :value="horario.horario_inicio" disabled>
                                <input type="time" class="form-control" id="horario_fim" :value="horario.horario_fim"
                                    disabled>
                                <button type="button" class="btn btn-danger"
                                    @click="handleExcluirHorario(horario.id_horario)"><i
                                        class="bi bi-trash-fill"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="text-danger text-center m-2">{{ errorMessage }}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>