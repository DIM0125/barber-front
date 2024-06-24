<script setup>
import { watch, ref, reactive } from 'vue'
import api from '../../services/api.js';

const { servico } = defineProps(['servico'])

const copiaServico = reactive(servico);
const errorMessage = ref('');

const servicoFoiAlterado = ref(false);
const servicoOriginal = reactive({ ...servico });
const servicoAlterado = reactive({});
watch(copiaServico, (newValue) => {
    for (const key in newValue) {
        if (servicoOriginal[key] !== newValue[key]) {
            servicoAlterado[key] = newValue[key];
        }
    }

    servicoFoiAlterado.value = true;
    errorMessage.value = '';
}, { deep: true });

const handleAlteracoes = () => {
    errorMessage.value = '';

    if (!servicoFoiAlterado.value) {
        errorMessage.value = 'Nenhuma alteração detectada.';
        return;
    }

    api.put(`/servicos/${copiaServico.id_servico}`, servicoAlterado)
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            errorMessage.value = "Houve um erro ao editar o item. Tente novamente mais tarde.";
            console.log(error);
        })

}
</script>

<template>

    <div class="modal fade" :id="'editarServicoModal' + servico.id_servico" tabindex="0"
        aria-labelledby="editarservicoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 editarServicoModalLabel">Editar Serviço</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleAlteracoes">
                    <div class="modal-body py-4">
                        <div class="row mb-2">
                            <div class="col-8">
                                <label for="nome" class="form-label">Nome:</label>
                                <input type="text" class="form-control" id="nome" v-model="copiaServico.nome" required>
                            </div>
                            <div class="col-4">
                                <label for="duracao" class="form-label">Duração (min):</label>
                                <input type="number" class="form-control" id="duracao"
                                    v-model="copiaServico.duracao_estimada" min="0"
                                    @keyup="copiaServico.duracao_estimada = Math.abs(copiaServico.duracao_estimada)"
                                    required>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label for="descricao">Descricão:</label>
                            <textarea class="form-control" id="descricao" rows="3" v-model="copiaServico.descricao"
                                required></textarea>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                Valor do Serviço: R$ {{ copiaServico.preco }}
                            </div>
                            <div class="col-4">
                                <input type="number" class="form-control" id="preco" step="0.01"
                                    v-model="copiaServico.preco" min="0"
                                    @keyup="copiaServico.preco = Math.abs(copiaServico.preco); copiaServico.preco = copiaServico.preco.toFixed(2)">
                            </div>
                        </div>

                        <div class="text-danger text-center m-2">{{ errorMessage }}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-dark">Salvar
                            Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped></style>