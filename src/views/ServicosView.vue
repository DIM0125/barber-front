<script setup>
import api from '../services/api.js'
import { onBeforeMount, ref } from 'vue'

const services = ref([])
const loading = ref(true)
const found = ref(false)

onBeforeMount(async () => {
  await api.get('/servicos')
    .then(response => {
      services.value = response.data.data
      loading.value = false
      found.value = true
    })
    .catch(error => {
      console.log(error)
      loading.value = false
      found.value = false
    })
})
</script>

<template>
  <div>
    <h1 class="text-center">Nossos Serviços</h1>
    <div class="container mt-4">
      <div class="row g-2">
        <div class="col-md-4">
          <div class="card" v-for="service in services" :key="service.id">
            <img
              src="https://img.freepik.com/fotos-premium/um-homem-em-uma-barbearia-com-barba-na-frente-de-um-espelho_697880-2646.jpg"
              class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ service.nome }}</h5>
              <p class="card-text">{{ service.descricao }}</p>
              <p class="card-text">R$ {{ service.preco }}</p>
              <router-link :to="{ name: 'cliente-novo-agendamento', query: { service: service.id_servico } }"
                class="btn btn-warning">Agendar</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
