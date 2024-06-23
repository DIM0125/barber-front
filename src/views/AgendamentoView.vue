<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import api from '@/services/api.js'

const props = defineProps(['selectedService'])

const telefone = ref('')
const servico = ref(props.selectedService || '')
const barbeiro = ref('')
const data = ref(new Date().toISOString().split('T')[0])

const services = ref([])
const loading = ref(true)
const found = ref(false)

const barbers = ref([])

onBeforeMount(() => {
  api.get('/servicos')
    .then(response => {
      services.value = response.data.data
      loading.value = false
      found.value = true
      if (servico.value !== '') {
        findBarbersByService(servico.value)
      }
    })
    .catch(error => {
      console.log(error)
      loading.value = false
      found.value = false
    })
})

watch(servico, (newService) => {
  if (newService) {
    findBarbersByService(newService)
  } else {
    barbers.value = []
  }
});

watch(barbeiro, () => {
  findTimeSlots();
});

const findBarbersByService = (serviceId) => {
  api.get(`/users/barbers/service/${serviceId}`)
    .then(response => {
      barbers.value = response.data.data
      findTimeSlots();
    })
    .catch(error => {
      console.log(error)
    })
}

const findTimeSlots = () => {
  if (barbeiro.value) {
    api.get(`/barber/${barbeiro.value}/horarios`)
      .then(response => {
        console.log(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

const realizarAgendamento = () => {
  // Lógica para realizar o agendamento
  console.log({
    nome: nome.value,
    telefone: telefone.value,
    servico: servico.value,
    data: data.value,
  })
}
</script>

<template>
  <div>
    <h1 class="text-center">Realize seu agendamento</h1>
    <div class="container mt-4">
      <form @submit.prevent="realizarAgendamento">
        <div class="row g-2">
          <div class="col-md-6">
            <div class="form-group">
              <label for="servico">Serviço:</label>
              <select v-model="servico" class="form-control" id="servico" required>
                <option value="">Selecione...</option>
                <option v-for="service in services" :key="service.id_servico" :value="service.id_servico">
                  {{ service.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="barbeiro">Barbeiro:</label>
              <select class="form-control" id="barbeiro" required v-model="barbeiro">
                <option value="">Selecione...</option>
                <option v-for="barber in barbers" :key="barber.id_usuario" :value="barber.id_usuario">
                  {{ barber.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="data">Data:</label>
              <input v-model="data" type="date" class="form-control" id="data"
                     v-bind:min="new Date().toISOString().split('T')[0]"
                     required>
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-warning w-100 my-3">Agendar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
