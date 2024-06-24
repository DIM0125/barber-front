<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import api from '@/services/api.js'
import dayjs from 'dayjs'

const props = defineProps(['selectedService'])

const servico = ref(props.selectedService || '')
const barbeiro = ref('')
const data = ref(new Date().toISOString().split('T')[0])

const services = ref([])
const loading = ref(true)
const found = ref(false)
const selectedSlot = ref(null)
const timeSlots = ref([])

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
})

watch(barbeiro, () => {
  findTimeSlots()
})

watch(data, () => {
  findTimeSlots()
})

const findBarbersByService = (serviceId) => {
  api.get(`/users/barbers/service/${serviceId}`)
    .then(response => {
      barbers.value = response.data.data
      findTimeSlots()
    })
    .catch(error => {
      console.log(error)
    })
}

const weekDaysMap = {
  'DOMINGO': 'SUNDAY',
  'SEGUNDA': 'MONDAY',
  'TERCA': 'TUESDAY',
  'QUARTA': 'WEDNESDAY',
  'QUINTA': 'THURSDAY',
  'SEXTA': 'FRIDAY',
  'SABADO': 'SATURDAY'
}

const findTimeSlots = () => {
  selectedSlot.value = null
  if (barbeiro.value !== '' && data.value !== '') {
    const selectedDate = dayjs(data.value, 'YYYY-MM-DD')
    const selectedDay = selectedDate.format('dddd').toUpperCase() // Converte para o dia da semana em inglês
    const selectedDayInPortuguese = Object.keys(weekDaysMap).find(key => weekDaysMap[key] === selectedDay)

    api.get(`/barber/${barbeiro.value}/horarios`)
      .then(response => {
        const slots = []
        response.data.data.forEach(schedule => {
          if (schedule.dia_da_semana === selectedDayInPortuguese) {
            const start = dayjs(`2024-01-01 ${schedule.horario_inicio}`)
            const end = dayjs(`2024-01-01 ${schedule.horario_fim}`)
            let current = start

            while (current.isBefore(end)) {
              slots.push({
                day: schedule.dia_da_semana,
                start: current.format('HH:mm'),
                end: current.add(30, 'minute').format('HH:mm')
              })
              current = current.add(30, 'minute') // Atualizar o current depois de adicionar o slot
            }
          }
        })
        timeSlots.value = slots
      })
      .catch(error => {
        console.log(error)
      })
  }
}

const selectTimeSlot = (slot) => {
  event.preventDefault();
  selectedSlot.value = slot
  // data.value = dayjs().day(slot.day).format('YYYY-MM-DD') // ajuste a lógica da data conforme necessário
  // horario.value = slot.start
}

const isSelected = (slot) => {
  return selectedSlot.value && selectedSlot.value.start === slot.start && selectedSlot.value.end === slot.end
}

const realizarAgendamento = () => {
  // preciso do id do barbeiro, id do cliente, data e horário selecionado,
  const user = JSON.parse(localStorage.getItem('userData'))
  const payload = {
    id_barbeiro: barbeiro.value,
    id_cliente: user.id_usuario,
    horario_agendamento: data.value + ' ' + selectedSlot.value.start,
    id_servico: servico.value
  }

  if (!payload.id_servico || !payload.id_barbeiro || !payload.horario_agendamento) {
    alert('Preencha todos os campos!')
    return
  }

  api.post('/agendamentos', payload)
    .then(response => {
      console.log(response)
      alert('Agendamento realizado com sucesso!')
      servico.value = ''
      barbeiro.value = ''
      data.value = new Date().toISOString().split('T')[0]
      selectedSlot.value = null
    })
    .catch(error => {
      console.log(error)
      alert('Erro ao realizar agendamento!')
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
                  {{ service.nome }} ({{ service.duracao_estimada }} min) - R$ {{ service.valor }}
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
                v-bind:min="new Date().toISOString().split('T')[0]" required>
            </div>
          </div>
          <div class="col-12 mt-2">
            <div class="row g-2">
              <div class="col-12 col-md-2" v-for="slot in timeSlots" :key="slot.start">
                <div
                  :class="['card', { 'bg-warning text-black': isSelected(slot), 'disabled': !isSelected(slot) && selectedSlot }]"
                  @click="selectTimeSlot(slot)">
                  <div class="card-body">
                    <p class="card-text">{{ slot.start }}</p>
                  </div>
                </div>
              </div>
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
