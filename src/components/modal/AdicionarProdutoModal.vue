<script setup>
import { reactive, ref } from 'vue'
import api from '../../services/api.js';
import { useAuthStore } from '../../stores/AuthStore';

const novoProduto = reactive({
    nome: '',
    quantidade_estoque: 0,
    quantidade_minima: 0,
    descricao: '',
    modificado_por: useAuthStore().userData.id_usuario
})

const errorMessage = ref('')

const handleSubmit = async () => {
    await api.post('/products', novoProduto)
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

    <div class="modal fade" id="novoProdutoModal" tabindex="-1" aria-labelledby="novoProdutoModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 novoProdutoModalLabel">Adicionar Item ao Estoque</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body py-4">
                        <div class="row mb-2">
                            <div class="col-9">
                                <label for="nome" class="form-label">Nome:</label>
                                <input type="text" class="form-control" id="nome" v-model="novoProduto.nome" required>
                            </div>
                            <div class="col-3">
                                <label for="quantidade" class="form-label">Quantidade:</label>
                                <input type="number" class="form-control" id="quantidade"
                                    v-model="novoProduto.quantidade_estoque" min="0"
                                    @keyup="novoProduto.quantidade_estoque = Math.abs(novoProduto.quantidade_estoque)"
                                    required>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label for="descricao">Descricão:</label>
                            <textarea class="form-control" id="descricao" rows="3" v-model="novoProduto.descricao"
                                required></textarea>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                Qual a quantidade mínima desse item no estoque?
                            </div>
                            <div class="col-4">
                                <input type="number" class="form-control" id="quantidade_minima"
                                    v-model="novoProduto.quantidade_minima" min="0"
                                    @keyup="novoProduto.quantidade_minima = Math.abs(novoProduto.quantidade_minima)">
                            </div>
                        </div>

                        <div class="text-danger text-center m-2">{{ errorMessage }}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-dark">Adicionar Item</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped></style>