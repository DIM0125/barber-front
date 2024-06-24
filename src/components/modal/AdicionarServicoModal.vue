<script setup>
import { reactive, ref } from 'vue'
import api from '../../services/api.js';

const novoServico = reactive({
    nome: '',
    descricao: '',
    duracao_estimada: 0,
    preco: 0
})

const errorMessage = ref('')

const handleSubmit = () => {
    api.post('/servicos', novoServico)
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            errorMessage.value = "Houve um erro ao adicionar o serviço. Tente novamente mais tarde."
            console.log(error)
        })
}
</script>

<template>

    <div class="modal fade" id="novoServicoModal" tabindex="-1" aria-labelledby="novoServicoModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 novoServicoModalLabel">Cadastrar Serviço</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body py-4">
                        <div class="row mb-2">
                            <div class="col-8">
                                <label for="nome" class="form-label">Nome:</label>
                                <input type="text" class="form-control" id="nome" v-model="novoServico.nome" required>
                            </div>
                            <div class="col-4">
                                <label for="duracao" class="form-label">Duração (min):</label>
                                <input type="number" class="form-control" id="duracao"
                                    v-model="novoServico.duracao_estimada" min="0"
                                    @keyup="novoServico.duracao_estimada = Math.abs(novoServico.duracao_estimada)"
                                    required>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label for="descricao">Descricão:</label>
                            <textarea class="form-control" id="descricao" rows="3" v-model="novoServico.descricao"
                                required></textarea>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                Valor do Serviço: R$ {{ novoServico.preco }}
                            </div>
                            <div class="col-4">
                                <input type="number" class="form-control" id="preco" step="0.01"
                                    v-model="novoServico.preco" min="0"
                                    @keyup="novoServico.preco = Math.abs(novoServico.preco); novoServico.preco = novoServico.preco.toFixed(2)">
                            </div>
                        </div>

                        <div class="text-danger text-center m-2">{{ errorMessage }}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-dark">Cadastrar Serviço</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped></style>