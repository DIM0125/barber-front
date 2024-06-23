<script setup>
import { reactive, ref } from 'vue'
import api from '../../services/api.js';

const novoFuncionario = reactive({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    cpf: '',
    data_contratacao: new Date().toISOString().split('T')[0],
    role: '',
    percentual_comissao: 0
})

const senhaConfirmacao = ref('')
const errors = ref('')
const tipoFuncionario = ref('')

const validarCadastro = (novoFuncionario) => {
    let errors = [];

    novoFuncionario.nome = novoFuncionario.nome.trim();
    novoFuncionario.email = novoFuncionario.email.trim();
    novoFuncionario.senha = novoFuncionario.senha.trim();
    senhaConfirmacao.value = senhaConfirmacao.value.trim();

    if (novoFuncionario.nome === '') {
        errors.push('O campo Nome deve ser preenchido.');
    }

    if (novoFuncionario.nome.length < 2) {
        errors.push('O campo Nome deve ter pelo menos 2 caracteres.');
    }

    if (novoFuncionario.email === '') {
        errors.push('O campo Email deve ser preenchido.');
    }

    if (novoFuncionario.telefone !== '' && !checkTelefoneMask(novoFuncionario.telefone)) {
        errors.push('Digite um número de telefone válido.');
    }

    if (novoFuncionario.cpf !== '' && !checkCpfMask(novoFuncionario.cpf)) {
        errors.push('Digite um CPF válido.');
    }

    if (novoFuncionario.senha === '') {
        errors.push('O campo senha deve ser preenchido.');
    }

    if (senhaConfirmacao.value !== novoFuncionario.senha) {
        errors.push('As senhas devem ser iguais.');
    }

    return errors;
}

const handleSubmit = async () => {
    errors.value = validarCadastro(novoFuncionario);

    if (errors.value.length > 0) {
        return;
    }

    if (tipoFuncionario.value !== 'barber') {
        delete novoFuncionario.percentual_comissao;
    }

    switch (tipoFuncionario.value) {
        case 'manager': novoFuncionario.role = 'MANAGER'; break;
        case 'barber': novoFuncionario.role = 'BARBER'; break;
        case 'receptionist': novoFuncionario.role = 'RECEPT'; break;
        default:
            break;
    }

    await api.post('/users/' + tipoFuncionario.value, novoFuncionario)
        .then(response => {
            if (response.status === 201) {
                location.reload();
            }
        })
        .catch(error => {
            errors.value.push(error?.response?.data?.error || ["Ocorreu um erro! Tente novamente mais tarde."]);
            console.log(error);
        })

}

const handleTelefoneMask = () => {
    novoFuncionario.telefone = telefoneMask(novoFuncionario.telefone);
}

const telefoneMask = (value) => {
    if (!value) return ""

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")

    return value
}

const handleCpfMask = () => {
    novoFuncionario.cpf = cpfMask(novoFuncionario.cpf);
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

    <div class="modal fade" id="novoFuncionarioModal" tabindex="-1" aria-labelledby="novoFuncionarioModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 novoFuncionarioModalLabel">Cadastrar Novo Funcionário</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body py-4">
                        <div class="row mt-0 mt-md-3">
                            <div class="col-md mt-3 mt-md-0">
                                <label for="nome">Nome:</label>
                                <input type="text" class="form-control" id="nome" v-model="novoFuncionario.nome"
                                    placeholder="Digite seu nome" required>
                            </div>
                            <div class="col col-md">
                                <label for="tipoFuncionario">Tipo de Funcionário: </label>
                                <select class="form-select" v-model="tipoFuncionario" id="tipoFuncionario" required>
                                    <option value="manager">Gerente</option>
                                    <option value="barber">Barbeiro</option>
                                    <option value="receptionist">Recepcionista</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-0 mt-md-3">
                            <div class="col-md mt-3 mt-md-0">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" id="email" v-model="novoFuncionario.email"
                                    placeholder="@exemplo.com" required>
                            </div>
                            <div class="col-md mt-3 mt-md-0">
                                <label for="telefone">Telefone:</label>
                                <input type="tel" maxlength="15" class="form-control" id="telefone"
                                    v-model="novoFuncionario.telefone" placeholder="(xx) xxxxx-xxxx"
                                    @beforeinput="handleTelefoneMask" @blur="handleTelefoneMask" required>
                            </div>
                        </div>
                        <div class="row mt-0 mt-md-3">
                            <div class="col-md mt-3 mt-md-0">
                                <label for="senha">Senha:</label>
                                <input type="password" class="form-control" id="senha" v-model="novoFuncionario.senha"
                                    placeholder="Digite sua senha" required>
                            </div>
                            <div class="col-md mt-3 mt-md-0">
                                <label for="senhaConfirmacao">Confirmar Senha:</label>
                                <input type="password" class="form-control" id="senhaConfirmacao"
                                    v-model="senhaConfirmacao" placeholder="Confirme sua senha" required>
                            </div>
                        </div>

                        <div class="row mt-0 mt-md-3">
                            <div class="col-md mt-3 mt-md-0">
                                <label for="cpf">CPF:</label>
                                <input type="text" class="form-control" id="cpf" v-model="novoFuncionario.cpf"
                                    placeholder="000.000.000-00" maxlength="14" @beforeinput="handleCpfMask"
                                    @blur="handleCpfMask" required>
                            </div>
                            <div class="col-md mt-3 mt-md-0">
                                <label for="data_contratacao">Data de Contratação:</label>
                                <input type="date" class="form-control" id="data_contratacao"
                                    v-model="novoFuncionario.data_contratacao" required>
                            </div>
                        </div>

                        <div class="row mt-3" v-if="tipoFuncionario === 'barber'">
                            <div class="col-8">
                                Comissão sobre serviços: {{ (novoFuncionario.percentual_comissao *
                    100).toFixed(1) }}%
                            </div>
                            <div class="col-4">
                                <input class="form-range" v-model="novoFuncionario.percentual_comissao" type="range"
                                    min="0" max="0.8" step="0.025">
                            </div>
                        </div>
                    </div>
                    <p class="text-center text-danger mt-3" v-for="(error, index) in errors" :key="index">{{ error
                        }}</p>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-dark">Cadastrar Funcionário</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped></style>