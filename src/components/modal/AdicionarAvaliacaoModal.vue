<script setup>
import { reactive, ref } from 'vue'
import api from '../../services/api.js';

const { agendamento } = defineProps(['agendamento'])

const avaliacao = reactive({
    avaliacao_nota: 0,
    avaliacao_comentario: ''
})

const errorMessage = ref('')

const handleSubmit = async () => {
    await api.put('/agendamentos/' + agendamento.id_agendamento, avaliacao)
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            errorMessage.value = "Houve um erro ao adicionar o item. Tente novamente mais tarde."
            console.log(error)
        })
}
</script>

<template>

    <div class="modal fade" :id="'adicionarAvaliacaoModal' + agendamento.id_agendamento" tabindex="-1"
        aria-labelledby="adicionarAvaliacaoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 adicionarAvaliacaoModalLabel">Avaliar Agendamento</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body py-4">
                        <div class="mb-3">
                            <label for="nota" class="form-label">Nota (0 a 5)</label>
                            <input type="number" id="nota" class="form-control" min="0" max="5"
                                v-model="avaliacao.avaliacao_nota" required>
                        </div>
                        <div class="mb-3">
                            <label for="comentario" class="form-label">Comentario</label>
                            <textarea id="comentario" class="form-control" v-model="avaliacao.avaliacao_comentario"
                                rows="3" required></textarea>
                        </div>

                        <div class="text-danger text-center m-2">{{ errorMessage }}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-dark">Avaliar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped></style>