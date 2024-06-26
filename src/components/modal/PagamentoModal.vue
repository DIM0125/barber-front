<script setup>
import { reactive, ref } from 'vue'
import api from '../../services/api.js';
import { useAuthStore } from '../../stores/AuthStore';

const { agendamento } = defineProps(['agendamento'])

const pagamentoForm = reactive({
    id_agendamento: agendamento.id_agendamento,
    id_cliente: agendamento.id_cliente,
    id_recepcionista: useAuthStore().userData.id_usuario,
    horario_agendamento: agendamento.horario_agendamento,
    status: 'PAGO',
    valor: agendamento.servicos.reduce((sum, servico) => sum + servico.valor, 0),
    forma_pagamento: ''
})

const errorMessage = ref('')

const handleSubmit = async () => {
    await api.post('/pagamentos', pagamentoForm)
        .then(async (response) => {
            if (response.data.success) {
                await api.put(`/agendamentos/${agendamento.id_agendamento}`, {
                    status: 'FINALIZADO'
                })
                    .then((response) => {
                        if (response.data.success) {
                            window.location.reload()
                        }
                        else {
                            errorMessage.value = 'Erro ao emitir pagamento. Tente novamente.'
                            console.log(response)
                        }
                    })
            } else {
                errorMessage.value = 'Erro ao emitir pagamento. Tente novamente.'
                console.log(response)
            }
        })
        .catch(error => {
            errorMessage.value = "Erro ao emitir pagamento. Tente novamente."
            console.log(error)
        })
}
</script>

<template>

    <div class="modal fade" :id="'pagamentoModal' + agendamento.id_agendamento" tabindex="-1"
        aria-labelledby="pagamentoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 pagamentoModalLabel">Finalizar Atendimento</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body py-4">

                        <div class="row">
                            <div class="col">
                                <label for="forma_pagamento" class="form-label">Forma de Pagamento:</label>
                                <select class="form-select" id="forma_pagamento" v-model="pagamentoForm.forma_pagamento"
                                    required>
                                    <option value="DINHEIRO">Dinheiro</option>
                                    <option value="CARTAO">Cartão</option>
                                    <option value="PIX">PIX</option>
                                    <option value="MISTA">MISTA</option>
                                    <option value="CORTESIA">CORTESIA</option>
                                </select>
                            </div>
                            <div class="col">
                                <label for="valor" class="form-label">Valor:</label>
                                <input type="number" class="form-control" id="valor" :value="pagamentoForm.valor"
                                    disabled>
                            </div>
                        </div>

                        <div class="text-danger text-center m-2">{{ errorMessage }}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-dark">Confirmar Pagamento</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped></style>