<script setup>
import { reactive, ref } from 'vue';
import api from '../services/api.js';

const cadastrado = ref(false);

const cadastroForm = reactive({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
})

const senhaConfirmacao = ref('');
const errors = ref([]);

const validarCadastro = (cadastroForm) => {
    let errors = [];

    cadastroForm.nome = cadastroForm.nome.trim();
    cadastroForm.email = cadastroForm.email.trim();
    cadastroForm.senha = cadastroForm.senha.trim();
    senhaConfirmacao.value = senhaConfirmacao.value.trim();

    if (cadastroForm.nome === '') {
        errors.push('O campo Nome deve ser preenchido.');
    }

    if (cadastroForm.nome.length < 2) {
        errors.push('O campo Nome deve ter pelo menos 2 caracteres.');
    }

    if (cadastroForm.email === '') {
        errors.push('O campo Email deve ser preenchido.');
    }

    if (cadastroForm.telefone !== '' && !checkTelefoneMask(cadastroForm.telefone)) {
        errors.push('Digite um número de telefone válido.');
    }

    if (cadastroForm.senha === '') {
        errors.push('O campo senha deve ser preenchido.');
    }

    if (senhaConfirmacao.value !== cadastroForm.senha) {
        errors.push('As senhas devem ser iguais.');
    }

    return errors;
}

const handleSubmit = async () => {
    errors.value = validarCadastro(cadastroForm);

    if (errors.value.length > 0) {
        return;
    }

    if (cadastroForm.telefone === '') {
        delete cadastroForm.telefone;
    }

    try {
        const response = await api.post('/usuarios/cliente', cadastroForm);
        if (response.status === 201) {
            cadastrado.value = true;
        }
    } catch (error) {
        if (error.response.data.error) {
            errors.value = error.response.data.error;
        }
        else {
            errors.value = ["Ocorreu um erro! Tente novamente mais tarde."];
        }
    }

}

const handleTelefoneMask = () => {
    cadastroForm.telefone = telefoneMask(cadastroForm.telefone);
}

const telefoneMask = (value) => {
    if (!value) return ""

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")

    return value
}

const checkTelefoneMask = (telefone) => {
    const regex = /^(\(\d{2}\))\s*\d{5}-\d{4}$/;

    return regex.test(telefone);
}
</script>

<template>
    <div v-if="!cadastrado">
        <h1 class="text-center">Página de Cadastro</h1>
        <div class="container w-50">
            <form @submit.prevent="handleSubmit()">
                <div class="row mt-0 mt-md-3">
                    <div class="col-md mt-3 mt-md-0">
                        <label for="nome">Nome:</label>
                        <input type="text" class="form-control" id="nome" v-model="cadastroForm.nome"
                            placeholder="Digite seu nome" required>
                    </div>
                </div>
                <div class="row mt-0 mt-md-3">
                    <div class="col-md mt-3 mt-md-0">
                        <label for="email">Email:</label>
                        <input type="email" class="form-control" id="email" v-model="cadastroForm.email"
                            placeholder="@exemplo.com" required>
                    </div>
                    <div class="col-md mt-3 mt-md-0">
                        <label for="telefone">Telefone:</label>
                        <input type="tel" maxlength="15" class="form-control" id="telefone"
                            v-model="cadastroForm.telefone" placeholder="(xx) xxxxx-xxxx"
                            @beforeinput="handleTelefoneMask" @blur="handleTelefoneMask">
                    </div>
                </div>
                <div class="row mt-0 mt-md-3">
                    <div class="col-md mt-3 mt-md-0">
                        <label for="senha">Senha:</label>
                        <input type="password" class="form-control" id="senha" v-model="cadastroForm.senha"
                            placeholder="Digite sua senha" required>
                    </div>
                    <div class="col-md mt-3 mt-md-0">
                        <label for="senhaConfirmacao">Confirmar Senha:</label>
                        <input type="password" class="form-control" id="senhaConfirmacao" v-model="senhaConfirmacao"
                            placeholder="Confirme sua senha" required>
                    </div>
                </div>
                <div class="row my-3 justify-content-center justify-content-md-end">
                    <div class="col col-md-4">
                        <button type="submit" class="btn btn-warning w-100 w-md-auto">Cadastrar</button>
                    </div>
                </div>
            </form>
            <p class="text-center text-danger mt-3" v-for="(error, index) in errors" :key="index">{{ error }}</p>
        </div>
    </div>
    <div v-else>
        <h1 class="text-center">Cadastro Concluído</h1>
        <div class="container w-50">
            <p class="text-center">Estamos ansiosos por sua presença! Para ter acesso ao sistema, clique no botão abaixo
                para ser levado à página de login:</p>

            <router-link to="/login" class="btn btn-warning mx-auto d-block w-50">Ir para Login</router-link>
        </div>
    </div>
</template>

<style></style>