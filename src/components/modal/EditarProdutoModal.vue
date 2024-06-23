<script setup>
import { watch, ref, reactive } from 'vue'
import api from '../../services/api.js';
import { useAuthStore } from '../../stores/AuthStore';

const { produto } = defineProps(['produto'])

const copiaProduto = reactive(produto);
const errorMessage = ref('');

const produtoFoiAlterado = ref(false);
const produtoOriginal = reactive({ ...produto });
const produtoAlterado = reactive({});
watch(copiaProduto, (newValue) => {
    for (const key in newValue) {
        if (produtoOriginal[key] !== newValue[key]) {
            produtoAlterado[key] = newValue[key];
        }
    }

    produtoFoiAlterado.value = true;
    errorMessage.value = '';
}, { deep: true });

const handleAlteracoes = () => {
    errorMessage.value = '';

    if (!produtoFoiAlterado.value) {
        errorMessage.value = 'Nenhuma alteração detectada.';
        return;
    }

    produtoAlterado.modificado_por = useAuthStore().userData.id_usuario

    api.put(`/products/${copiaProduto.id_produto}`, produtoAlterado)
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

    <div class="modal fade" :id="'editarProdutoModal' + produto.id_produto" tabindex="0"
        aria-labelledby="editarProdutoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 editarProdutoModalLabel">Editar Item do Estoque</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleAlteracoes">
                    <div class="modal-body py-4">
                        <div class="row mb-2">
                            <div class="col-9">
                                <label for="nome" class="form-label">Nome:</label>
                                <input type="text" class="form-control" id="nome" v-model="copiaProduto.nome" required>
                            </div>
                            <div class="col-3">
                                <label for="quantidade" class="form-label">Quantidade:</label>
                                <input type="number" class="form-control" id="quantidade"
                                    v-model="copiaProduto.quantidade_estoque" min="0"
                                    @keyup="copiaProduto.quantidade_estoque = Math.abs(copiaProduto.quantidade_estoque)"
                                    required>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label for="descricao">Descricão:</label>
                            <textarea class="form-control" id="descricao" rows="3" v-model="copiaProduto.descricao"
                                required></textarea>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <label for="ultima-modificacao">Última Modificação:</label>
                                <input type="text" class="form-control" id="ultima-modificacao"
                                    :value="new Date(copiaProduto.data_ultima_modificacao).toLocaleString('pt-br')"
                                    disabled>
                            </div>
                            <div class="col-6">
                                <label for="modificado-por">Modificado por:</label>
                                <input type="text" class="form-control" id="modificado-por"
                                    :value="copiaProduto.modificado_por" disabled>
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