<script setup>
import api from '../../services/api.js'
import { onBeforeMount, ref } from 'vue'
import dayjs from 'dayjs'

const agendamentos = ref([])
const loading = ref(true)
const found = ref(false)

onBeforeMount(() => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  api.get(`/agendamentos/cliente/${userData.id_usuario}`)
    .then(response => {
      agendamentos.value = response.data.data
      loading.value = false
      found.value = agendamentos.value.length > 0
    })
    .catch(error => {
      console.log(error)
      loading.value = false
      found.value = false
    })
})

const formatDate = (dateString) => {
  return dayjs(dateString).format('DD/MM/YYYY HH:mm')
}
</script>

<template>
  <div>
    <h1 class="text-center">Agendamentos</h1>
  </div>

  <div class="container mt-4">
    <div class="row g-2">
      <div class="col-12 d-flex justify-content-end">
        <router-link :to="{ name: 'servicos' }" class="btn btn-primary mb-4">Novo Agendamento</router-link>
      </div>
      <div class="col-12">
        <div class="card mb-2" v-for="agendamento in agendamentos" :key="agendamento.id">
          <div class="card-body">
            <h5 class="card-title">{{ agendamento.servico }}</h5>
            <p class="card-text">{{ formatDate(agendamento.horario_agendamento)  }}</p>
            <p class="card-text">{{ agendamento.status }}</p>
          </div>
        </div>
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else-if="!found" class="text-center">
          <p>Nenhum agendamento encontrado.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
