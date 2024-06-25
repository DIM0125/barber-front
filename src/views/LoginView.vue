<script setup>
import { useAuthStore } from '../stores/AuthStore';
import { ref } from 'vue';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  await authStore.login(username.value, password.value).catch((error) => {
    errorMessage.value = 'Verifique suas credenciais e tente novamente';
    console.log(error);
  });
}
</script>

<template>
  <div class="d-flex align-items-center">
    <div class="container">
      <h1 class="text-center">Login</h1>
      <form class="row justify-content-center" @submit.prevent="handleLogin()">
        <div class="col col-md-5">
          <div class="mt-3">
            <label for="email">Email:</label>
            <input type="email" v-model="username" class="form-control" id="email" placeholder="email@exemplo.com"
              required>
          </div>

          <div class="mt-3">
            <label for="senha">Senha:</label>
            <input type="password" v-model="password" class="form-control" id="senha" placeholder="Digite sua senha"
              required>
          </div>
          <div class="row my-3 justify-content-center justify-content-md-end">
            <div class="col col-md-4">
              <button type="submit" class="btn btn-warning w-100 w-md-auto">Login</button>
            </div>
            <p class="text-danger">
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
