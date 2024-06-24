<script setup>
import { watch, ref, reactive } from 'vue'
import api from '../../services/api.js';

const { funcionario } = defineProps(['funcionario'])

const copiafuncionario = reactive(funcionario);
const errors = ref([]);

const funcionarioFoiAlterado = ref(false);
const funcionarioOriginal = reactive({ ...funcionario });
const funcionarioAlterado = reactive({});
watch(copiafuncionario, (newValue) => {
    for (const key in newValue) {
        if (funcionarioOriginal[key] !== newValue[key]) {
            funcionarioAlterado[key] = newValue[key];
        }
    }

    funcionarioFoiAlterado.value = true;
    errors.value = [];
}, { deep: true });

const validarAlteracoes = () => {
    let errors = [];

    copiafuncionario.nome = copiafuncionario.nome.trim();
    copiafuncionario.email = copiafuncionario.email.trim();

    if (copiafuncionario.nome === '') {
        errors.push('O campo Nome deve ser preenchido.');
    }

    if (copiafuncionario.nome.length < 2) {
        errors.push('O campo Nome deve ter pelo menos 2 caracteres.');
    }

    if (copiafuncionario.email === '') {
        errors.push('O campo Email deve ser preenchido.');
    }

    if (copiafuncionario.telefone !== '' && !checkTelefoneMask(copiafuncionario.telefone)) {
        errors.push('Digite um número de telefone válido.');
    }

    if (copiafuncionario.cpf !== '' && !checkCpfMask(copiafuncionario.cpf)) {
        errors.push('Digite um CPF válido.');
    }

    return errors;
}

const handleAlteracoes = () => {
    errors.value = validarAlteracoes();

    if (!funcionarioFoiAlterado.value) {
        errors.value.push('Nenhuma alteração detectada.');
        return;
    }

    if (errors.value.length > 0) {
        return;
    }

    funcionarioAlterado.role = copiafuncionario.role;

    api.put(`/users/${copiafuncionario.id_usuario}`, funcionarioAlterado)
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            errors.value.push("Houve um erro ao editar o funcionário. Tente novamente mais tarde.");
            console.log(error);
        })

}

const handleTelefoneMask = () => {
    copiafuncionario.telefone = telefoneMask(copiafuncionario.telefone);
}

const telefoneMask = (value) => {
    if (!value) return ""

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")

    return value
}

const handleCpfMask = () => {
    copiafuncionario.cpf = cpfMask(copiafuncionario.cpf);
}

function cpfMask(v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return v
}

const checkTelefoneMask = (telefone) => {
    const regex = /^(\(\d{2}\))\s*\d{5}-\d{4}$/;

    return regex.test(telefone);
}

const checkCpfMask = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    return regex.test(cpf);
}
</script>

<template>

    <div class="modal fade" :id="'editarFuncionarioModal' + funcionario.id_usuario" tabindex="0"
        aria-labelledby="editarFuncionarioModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 editarFuncionarioModalLabel">Editar Informações de Funcionário</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleAlteracoes">
                    <div class="modal-body py-4">

                        <div class="modal-body py-4">
                            <div class="row mt-0 mt-md-3">
                                <div class="col-md mt-3 mt-md-0">
                                    <label for="nome">Nome:</label>
                                    <input type="text" class="form-control" v-model="copiafuncionario.nome"
                                        placeholder="Digite seu nome" required>
                                </div>
                                <div class="col col-md">
                                    <label for="tipoFuncionario">Tipo de Funcionário: </label>
                                    <select class="form-select" :value="copiafuncionario.role" disabled>
                                        <option value="MANAGER">Gerente</option>
                                        <option value="BARBER">Barbeiro</option>
                                        <option value="RECEPT">Recepcionista</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-0 mt-md-3">
                                <div class="col-md mt-3 mt-md-0">
                                    <label for="email">Email:</label>
                                    <input type="email" class="form-control" v-model="copiafuncionario.email"
                                        placeholder="@exemplo.com" required>
                                </div>
                                <div class="col-md mt-3 mt-md-0">
                                    <label for="telefone">Telefone:</label>
                                    <input type="tel" maxlength="15" class="form-control"
                                        v-model="copiafuncionario.telefone" placeholder="(xx) xxxxx-xxxx"
                                        @beforeinput="handleTelefoneMask" @blur="handleTelefoneMask" required>
                                </div>
                            </div>

                            <div class="row mt-0 mt-md-3">
                                <div class="col-md mt-3 mt-md-0">
                                    <label for="cpf">CPF:</label>
                                    <input type="text" class="form-control" v-model="copiafuncionario.cpf"
                                        placeholder="000.000.000-00" maxlength="14" @beforeinput="handleCpfMask"
                                        @blur="handleCpfMask" required>
                                </div>
                                <div class="col-md mt-3 mt-md-0">
                                    <label for="data_contratacao">Data de Contratação:</label>
                                    <input type="date" class="form-control"
                                        :value="new Date(copiafuncionario.data_contratacao).toISOString().split('T')[0]"
                                        disabled>
                                </div>
                            </div>

                            <div class="row mt-3" v-if="copiafuncionario.role === 'BARBER'">
                                <div class="col-8">
                                    Comissão sobre serviços: {{ (copiafuncionario.percentual_comissao * 100).toFixed(1)
                                    }}%
                                </div>
                                <div class="col-4">
                                    <input class="form-range" v-model="copiafuncionario.percentual_comissao"
                                        type="range" min="0" max="0.8" step="0.025">
                                </div>
                            </div>
                        </div>

                        <div class="text-danger" v-for="(error, index) in errors" :key="index">{{ error }}</div>
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