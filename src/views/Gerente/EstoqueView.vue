<script setup>
import api from '../../services/api.js';
import { ref, reactive, onBeforeMount } from 'vue';
import EditarProdutoModal from '../../components/modal/EditarProdutoModal.vue';
import AdicionarProdutoModal from '../../components/modal/AdicionarProdutoModal.vue';

const estoque = reactive({})
const loading = ref(true);
const found = ref(false);

onBeforeMount(() => {
    api.get('/produtos')
        .then(response => {
            estoque.value = response.data.data;
            loading.value = false;
            found.value = true;
        })
        .catch(error => {
            console.log(error);
            loading.value = false;
            found.value = false;
        })
})

const handleExcluirProduto = (id) => {

    if (!confirm("Tem certeza que deseja excluir este item?")) {
        return;
    }

    api.delete(`/produtos/${id}`)
        .then(() => {
            estoque.value = estoque.value.filter(item => item.id_produto !== id);
        })
        .catch(error => {
            console.log(error);
        })
}
</script>

<template>
    <div>
        <div>
            <div class="d-flex align-items-center justify-content-between">
                <h1>Estoque</h1>
                <div class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#novoProdutoModal">Adicionar Produto
                </div>
            </div>

            <AdicionarProdutoModal />
        </div>

        <div v-if="loading">
            <h1 class="text-center">Carregando...</h1>
        </div>

        <div v-else>

            <div v-if="found">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Modificado por</th>
                            <th>Última modificação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in estoque.value" :key="item.id">
                            <td>{{ item.nome }}</td>

                            <td>{{ item.quantidade_estoque }}
                                <span v-if="item.quantidade_estoque <= item.quantidade_minima" title="Estoque baixo"><i
                                        class="bi bi-exclamation-triangle-fill text-warning"></i></span>
                            </td>
                            <td>{{ item.modificado_por }}</td>
                            <td>{{ new Date(item.data_ultima_modificacao).toLocaleDateString('pt-br') }}</td>
                            <td>
                                <button class="btn btn-outline-warning mx-1" title="Editar" data-bs-toggle="modal"
                                    :data-bs-target="'#editarProdutoModal' + item.id_produto">
                                    <i class="bi bi-pencil-square"></i>
                                </button>

                                <button class="btn btn-outline-danger mx-1" title="Excluir"
                                    @click="handleExcluirProduto(item.id_produto)"><i class="bi bi-trash"></i></button>
                            </td>

                            <EditarProdutoModal :produto="item" />
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else>
                <h3 class="text-center">Nenhum item encontrado.</h3>
            </div>
        </div>
    </div>
</template>

<style scoped></style>